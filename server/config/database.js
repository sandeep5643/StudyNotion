const mongoose = require('mongoose');
require('dotenv').config();

exports.DBConnect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser : true,
        useUnifiedTopology : true
    })
    .then( () => {console.log("DB Connection Successfully")} )
    .catch( (error) => {
        console.log(error);
        console.log('DB Connection failed')
        process.exit(1);
    });
}