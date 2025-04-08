const nodemailer = require("nodemailer");

const mailSender = async(email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })

        let info = await transporter.sendMail({
            from: "StudyNotion || by Sandeep Kumar",
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`
        })
        return info

    } catch (error) {
        console.error(error.message);
    }
}

module.exports = mailSender;



// This code is a reusable function to send emails using Nodemailer. It securely uses .env variables for 
// SMTP configuration and supports dynamic email content. Perfect for sending notifications, OTPs, or welcome emails.