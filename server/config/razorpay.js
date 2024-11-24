// const Razorpay = require('razorpay');
// require('dotenv').config();

// exports.instance = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY,
//     key_secret: process.env.RAZORPAY_SECRET
// });

const Razorpay = require('razorpay');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,    // Make sure the key is correctly set from environment variables
    key_secret: process.env.RAZORPAY_SECRET,  // Same for the secret key
});

module.exports = razorpay;
