const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 3000;
const mongoose = require('./db');
const customerController = require('./controller/customerController');
 
app.use(bodyParser.json());
app.use('/customer', customerController);
app.listen(PORT, () => console.log(`Connected to server at port ${PORT}`));