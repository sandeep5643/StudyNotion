const nodemailer = require('nodemailer');
require('dotenv').config();

const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        // Send the email and return the response
        let info = await transporter.sendMail({
            from: "StudyNotion : by- Sandeep Kumar",
            to: email,
            subject: title,
            html: body,
        });

        // Log and return the response from sendMail
        console.log(info);
        return info; // Return the info object to access in the controller

    } catch (error) {
        console.log("Mail sending error:", error.message);
        throw error; // Re-throw the error to handle it in the controller
    }
};

module.exports = mailSender;
