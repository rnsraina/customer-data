const express = require('express');
const router = express.Router();
const csvFileName = 'customerData.csv';
const Customer = require('../model/Customer');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter(
    {
        path: csvFileName,
        header: [
            {id: 'createdAt', title: "CREATED_AT"},
            {id: 'customerId', title: "CUSTOMER_ID"},
            {id: 'invoiceId', title: "INVOICE_ID"},
        ]
    }
);
 
router.get('/', (req, res) => {
    Customer.find((err, data) => {
        if (err) {
            console.log(`Error in fetching customer list from db ${JSON.stringify(err, undefined, 2)}`);
        } else {
            res.send(data);
        }
    });
});

//  Add records in DB
router.post('/add', (req, res) => {
    let customerObj = new Customer({
        createdAt: req.body.createdAt,
        customerId: req.body.customerId,
        invoiceId: req.body.invoiceId
    });

    customerObj.save((err, data) => {
        if (err) {
            console.log(`Error in saving customer data in db ${JSON.stringify(err, undefined, 2)}`);
        } else {
            res.send(data);
        }
    })
});

//  Search records in DB
router.post('/fetchCustomerDataByStartDateAndEndDate', (req, res) => {
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    var searchObj = {
        createdAt: {
            $gte: startDate,
            $lt: endDate
        }
    }
    Customer.find(searchObj, (err, records) => {
        if (err) {
            console.log(`Error in searching customer data from db ${JSON.stringify(err, undefined, 2)}`);
        } else {
           csvWriter.writeRecords(records)
           .then(() => {
                console.log('Done...');
           })
            res.send(`<a href='${csvFileName}' download='${csvFileName}' id='download-link'>`);
        }
    });
});

module.exports = router;