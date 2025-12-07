const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

let salesData = [];

const loadData = () => {
    return new Promise((resolve, reject) => {
        const csvPath = path.join(__dirname, '../../../truestate_assignment_dataset (1).csv');

        if (!fs.existsSync(csvPath)) {
            console.log('CSV file not found at:', csvPath);
            salesData = [];
            resolve(salesData);
            return;
        }

        console.log('Loading CSV from:', csvPath);
        const results = [];

        fs.createReadStream(csvPath)
            .pipe(csv())
            .on('data', (row) => {
                results.push({
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
            })
            .on('end', () => {
                salesData = results;
                console.log('Loaded', salesData.length, 'records');
                resolve(salesData);
            })
            .on('error', (error) => {
                console.error('Error loading CSV:', error);
                salesData = [];
                resolve(salesData);
            });
    });
};

const getData = () => salesData;

module.exports = {
    loadData,
    getData
};