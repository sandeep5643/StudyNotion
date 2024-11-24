const {contactUsEmail} = require("../mail/templates/contactFormRes");
const mailSender = require('../utlis/mailSender');
const ContactForm = require('../models/contactFormSchema');

exports.ContactUsController = async (req, res) => {
    const { email, firstname, lastname, message, phoneNo, countrycode } = req.body
    console.log(req.body)
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
        console.log("Data saved to DB: ", contactFormData);

        // Send email
        const emailRes = await mailSender(
            email,
            "Your Data sent successfully",
        contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
      );
      console.log("Email Res ", emailRes);

      return res.json({
        success: true,
        message: "Email sent and data saved successfully",
      });

    } catch (error) {
    console.log("Error", error);
    console.log("Error message: ", error.message);
    return res.json({
      success: false,
      message: "Something went wrong...",
    });
  }
}