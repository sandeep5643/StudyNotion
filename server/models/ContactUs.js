const mongoose = require('mongoose');

const contactForm = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  countrycode: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Contact", contactForm);