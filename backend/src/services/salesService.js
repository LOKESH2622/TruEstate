const { getData } = require('../utils/dataLoader');

const salesService = {
  getSales: (filters, sortOptions, pagination) => {
    let data = getData();

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      data = data.filter(item => {
        const customerName = (item.customerName || '').toLowerCase();
        const phoneNumber = (item.phoneNumber || '').toLowerCase();
        return customerName.includes(searchTerm) || phoneNumber.includes(searchTerm);
      });
    }

    data = applyFilters(data, filters);
    const stats = calculateStats(data);
    data = applySorting(data, sortOptions);

    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / pagination.limit) || 1;
    const currentPage = Math.min(pagination.page, Math.max(1, totalPages));
    const startIndex = (currentPage - 1) * pagination.limit;
    const endIndex = startIndex + pagination.limit;
    const paginatedData = data.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      pagination: {
        currentPage,
        totalPages,
        totalItems,
        itemsPerPage: pagination.limit,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1
      },
      stats
    };
  },

  getFilterOptions: () => {
    const data = getData();
    
    const regions = [...new Set(data.map(item => item.customerRegion).filter(Boolean))].sort();
    const genders = [...new Set(data.map(item => item.gender).filter(Boolean))].sort();
    const categories = [...new Set(data.map(item => item.productCategory).filter(Boolean))].sort();
    const paymentMethods = [...new Set(data.map(item => item.paymentMethod).filter(Boolean))].sort();
    
    const allTags = new Set();
    data.forEach(item => {
      if (item.tags) {
        item.tags.split(',').map(t => t.trim()).filter(Boolean).forEach(tag => allTags.add(tag));
      }
    });
    const tags = [...allTags].sort();

    const ages = data.map(item => item.age).filter(a => !isNaN(a));
    const ageMin = ages.length > 0 ? Math.min(...ages) : 0;
    const ageMax = ages.length > 0 ? Math.max(...ages) : 100;

    const dates = data.map(item => item.date).filter(Boolean).sort();
    const dateMin = dates[0] || null;
    const dateMax = dates[dates.length - 1] || null;

    return {
      regions,
      genders,
      categories,
      tags,
      paymentMethods,
      ageRange: { min: ageMin, max: ageMax },
      dateRange: { min: dateMin, max: dateMax }
    };
  },

  getSaleById: (id) => {
    const data = getData();
    return data.find(item => item.id === id || item.customerId === id || item.transactionId === id);
  }
};

function calculateStats(data) {
  let totalUnits = 0;
  let totalAmount = 0;
  let totalDiscount = 0;

  data.forEach(item => {
    totalUnits += item.quantity || 0;
    totalAmount += item.totalAmount || 0;
    totalDiscount += (item.totalAmount || 0) - (item.finalAmount || 0);
  });

  return {
    totalUnits,
    totalAmount: Math.round(totalAmount),
    totalDiscount: Math.round(totalDiscount),
    totalSRs: data.length
  };
}

function applyFilters(data, filters) {
  let filtered = [...data];

  if (filters.regions.length > 0) {
    filtered = filtered.filter(item => 
      filters.regions.some(region => 
        (item.customerRegion || '').toLowerCase() === region.toLowerCase()
      )
    );
  }

  if (filters.genders.length > 0) {
    filtered = filtered.filter(item => 
      filters.genders.some(gender => 
        (item.gender || '').toLowerCase() === gender.toLowerCase()
      )
    );
  }

  if (filters.ageMin !== null && !isNaN(filters.ageMin)) {
    filtered = filtered.filter(item => item.age >= filters.ageMin);
  }
  if (filters.ageMax !== null && !isNaN(filters.ageMax)) {
    filtered = filtered.filter(item => item.age <= filters.ageMax);
  }

  if (filters.categories.length > 0) {
    filtered = filtered.filter(item => 
      filters.categories.some(category => 
        (item.productCategory || '').toLowerCase() === category.toLowerCase()
      )
    );
  }

  if (filters.tags.length > 0) {
    filtered = filtered.filter(item => {
      if (!item.tags) return false;
      const itemTags = item.tags.split(',').map(t => t.trim().toLowerCase());
      return filters.tags.some(tag => itemTags.includes(tag.toLowerCase()));
    });
  }

  if (filters.paymentMethods.length > 0) {
    filtered = filtered.filter(item => 
      filters.paymentMethods.some(method => 
        (item.paymentMethod || '').toLowerCase() === method.toLowerCase()
      )
    );
  }

  if (filters.dateFrom) {
    const fromDate = new Date(filters.dateFrom);
    filtered = filtered.filter(item => new Date(item.date) >= fromDate);
  }
  if (filters.dateTo) {
    const toDate = new Date(filters.dateTo);
    toDate.setHours(23, 59, 59, 999);
    filtered = filtered.filter(item => new Date(item.date) <= toDate);
  }

  return filtered;
}

function applySorting(data, sortOptions) {
  const { sortBy, sortOrder } = sortOptions;
  const sorted = [...data];

  sorted.sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'date':
        comparison = new Date(a.date) - new Date(b.date);
        break;
      case 'quantity':
        comparison = (a.quantity || 0) - (b.quantity || 0);
        break;
      case 'customerName':
        comparison = (a.customerName || '').toLowerCase().localeCompare((b.customerName || '').toLowerCase());
        break;
      case 'totalAmount':
        comparison = (a.totalAmount || 0) - (b.totalAmount || 0);
        break;
      case 'finalAmount':
        comparison = (a.finalAmount || 0) - (b.finalAmount || 0);
        break;
      default:
        comparison = 0;
    }

    return sortOrder === 'desc' ? -comparison : comparison;
  });

  return sorted;
}

module.exports = salesService;
