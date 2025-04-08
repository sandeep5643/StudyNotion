const { contactUsEmail } = require("../mail/templates/contactFormRes")
const mailSender = require("../utils/mailSender")
const ContactForm = require("../models/ContactUs")

exports.contactUsController = async (req, res) => {
    const { email, firstname, lastname, message, phoneNo, countrycode } = req.body
    try {

        // Save the form data to the database
        const contactFormData = await ContactForm.create({
            email,
            firstname,
            lastname,
            message,
            phoneNo,
            countrycode,
        });

        // Send email
        const emailRes = await mailSender(
            email,
            "Your Data sent successfully",
        contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
      );

      return res.json({
        success: true,
        message: "Email sent and data saved successfully",
      });

    } catch (error) {
    console.error("Error", error);
    console.error("Error message: ", error.message);
    return res.json({
      success: false,
      message: "Something went wrong...",
    });
  }
}