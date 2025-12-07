let cachedData = null;

const parseCSV = (text) => {
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',');
  const data = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let char of lines[i]) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());
    
    if (values.length === headers.length) {
      const row = {};
      headers.forEach((header, index) => {
        row[header.trim()] = values[index] || '';
      });
      data.push({
        id: row['Transaction ID'] || '',
        transactionId: row['Transaction ID'] || '',
        date: row['Date'] || '',
        customerId: row['Customer ID'] || '',
        customerName: row['Customer Name'] || '',
        phoneNumber: '+91 ' + (row['Phone Number'] || ''),
        gender: row['Gender'] || '',
        age: parseInt(row['Age']) || 0,
        customerRegion: row['Customer Region'] || '',
        customerType: row['Customer Type'] || '',
        productId: row['Product ID'] || '',
        productName: row['Product Name'] || '',
        brand: row['Brand'] || '',
        productCategory: row['Product Category'] || '',
        tags: row['Tags'] || '',
        quantity: parseInt(row['Quantity']) || 0,
        pricePerUnit: parseFloat(row['Price per Unit']) || 0,
        discountPercentage: parseFloat(row['Discount Percentage']) || 0,
        totalAmount: parseFloat(row['Total Amount']) || 0,
        finalAmount: parseFloat(row['Final Amount']) || 0,
        paymentMethod: row['Payment Method'] || '',
        orderStatus: row['Order Status'] || '',
        deliveryType: row['Delivery Type'] || '',
        storeId: row['Store ID'] || '',
        storeLocation: row['Store Location'] || '',
        salespersonId: row['Salesperson ID'] || '',
        employeeName: row['Employee Name'] || ''
      });
    }
  }
  return data;
};

const loadCSVData = async () => {
  if (cachedData) return cachedData;
  const response = await fetch('/sample_data.csv');
  const text = await response.text();
  cachedData = parseCSV(text);
  return cachedData;
};

const applyFilters = (data, params) => {
  let filtered = [...data];
  
  if (params.search) {
    const search = params.search.toLowerCase();
    filtered = filtered.filter(item => 
      item.customerName.toLowerCase().includes(search) || 
      item.phoneNumber.toLowerCase().includes(search)
    );
  }
  
  if (params.regions) {
    const regions = params.regions.split(',').filter(Boolean);
    if (regions.length > 0) {
      filtered = filtered.filter(item => regions.some(r => item.customerRegion.toLowerCase() === r.toLowerCase()));
    }
  }
  
  if (params.genders) {
    const genders = params.genders.split(',').filter(Boolean);
    if (genders.length > 0) {
      filtered = filtered.filter(item => genders.some(g => item.gender.toLowerCase() === g.toLowerCase()));
    }
  }
  
  if (params.ageMin) filtered = filtered.filter(item => item.age >= parseInt(params.ageMin));
  if (params.ageMax) filtered = filtered.filter(item => item.age <= parseInt(params.ageMax));
  
  if (params.categories) {
    const categories = params.categories.split(',').filter(Boolean);
    if (categories.length > 0) {
      filtered = filtered.filter(item => categories.some(c => item.productCategory.toLowerCase() === c.toLowerCase()));
    }
  }
  
  if (params.tags) {
    const tags = params.tags.split(',').filter(Boolean);
    if (tags.length > 0) {
      filtered = filtered.filter(item => {
        const itemTags = item.tags.split(',').map(t => t.trim().toLowerCase());
        return tags.some(t => itemTags.includes(t.toLowerCase()));
      });
    }
  }
  
  if (params.paymentMethods) {
    const methods = params.paymentMethods.split(',').filter(Boolean);
    if (methods.length > 0) {
      filtered = filtered.filter(item => methods.some(m => item.paymentMethod.toLowerCase() === m.toLowerCase()));
    }
  }
  
  if (params.dateFrom) {
    filtered = filtered.filter(item => new Date(item.date) >= new Date(params.dateFrom));
  }
  if (params.dateTo) {
    filtered = filtered.filter(item => new Date(item.date) <= new Date(params.dateTo));
  }
  
  return filtered;
};

const applySorting = (data, sortBy, sortOrder) => {
  const sorted = [...data];
  sorted.sort((a, b) => {
    let cmp = 0;
    switch (sortBy) {
      case 'date': cmp = new Date(a.date) - new Date(b.date); break;
      case 'quantity': cmp = a.quantity - b.quantity; break;
      case 'customerName': cmp = a.customerName.localeCompare(b.customerName); break;
      case 'totalAmount': cmp = a.totalAmount - b.totalAmount; break;
      case 'finalAmount': cmp = a.finalAmount - b.finalAmount; break;
      default: cmp = 0;
    }
    return sortOrder === 'desc' ? -cmp : cmp;
  });
  return sorted;
};

const calculateStats = (data) => {
  let totalUnits = 0, totalAmount = 0, totalDiscount = 0;
  data.forEach(item => {
    totalUnits += item.quantity;
    totalAmount += item.totalAmount;
    totalDiscount += item.totalAmount - item.finalAmount;
  });
  return { totalUnits, totalAmount: Math.round(totalAmount), totalDiscount: Math.round(totalDiscount), totalSRs: data.length };
};

export const fetchSales = async (params) => {
  const allData = await loadCSVData();
  let filtered = applyFilters(allData, params);
  const stats = calculateStats(filtered);
  filtered = applySorting(filtered, params.sortBy || 'date', params.sortOrder || 'desc');
  
  const page = parseInt(params.page) || 1;
  const limit = parseInt(params.limit) || 10;
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / limit) || 1;
  const start = (page - 1) * limit;
  const paginatedData = filtered.slice(start, start + limit);
  
  return {
    data: paginatedData,
    pagination: { currentPage: page, totalPages, totalItems, itemsPerPage: limit, hasNextPage: page < totalPages, hasPrevPage: page > 1 },
    stats
  };
};

export const fetchFilterOptions = async () => {
  const data = await loadCSVData();
  const regions = [...new Set(data.map(d => d.customerRegion).filter(Boolean))].sort();
  const genders = [...new Set(data.map(d => d.gender).filter(Boolean))].sort();
  const categories = [...new Set(data.map(d => d.productCategory).filter(Boolean))].sort();
  const paymentMethods = [...new Set(data.map(d => d.paymentMethod).filter(Boolean))].sort();
  const allTags = new Set();
  data.forEach(d => { if (d.tags) d.tags.split(',').map(t => t.trim()).filter(Boolean).forEach(t => allTags.add(t)); });
  const ages = data.map(d => d.age).filter(a => !isNaN(a));
  return {
    regions, genders, categories, tags: [...allTags].sort(), paymentMethods,
    ageRange: { min: Math.min(...ages), max: Math.max(...ages) },
    dateRange: { min: null, max: null }
  };
};

export const fetchSaleById = async (id) => {
  const data = await loadCSVData();
  return data.find(item => item.id === id || item.transactionId === id);
};
