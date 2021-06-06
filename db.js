const mongoose = require('mongoose');

mongoose.connect(
    'mongodb://localhost:27017/customerData',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err) => {
        if (err) {
            console.log(`Error in connecting to database ${JSON.stringify(err, undefined, 2)}`);
        } else {
            console.log(`Connected Successfully to DB`);
        }
    }
);
 
module.exports = mongoose;