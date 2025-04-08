const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.info("DB Connection Successfully ✅"))
    .catch((error) => {
        console.error("DB Connection Failed ❌");
        console.error(error);
        process.exit(1);
    });
}