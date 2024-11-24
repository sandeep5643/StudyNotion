const mongoose = require('mongoose');

const contactFormSchema = new mongoose.Schema({
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

const ContactForm = mongoose.model('ContactForm', contactFormSchema);

module.exports = ContactForm;
