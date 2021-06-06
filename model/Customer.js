const mongoose = require('mongoose');
 
let Customer = mongoose.model(
    'customerDetails',
    {
        createdAt: String,
        customerId: String,
        invoiceId: String
    }
);

module.exports = Customer;