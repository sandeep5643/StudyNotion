// This is a Razorpay Library. and ye library Razorpay API ke sath interact karta hai. 
const Razorpay = require("razorpay");
require('dotenv').config();


exports.instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET
});