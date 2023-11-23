const { createTransport } = require('nodemailer');
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();


let transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com", // smtp-relay.brevo.com
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "faithfulolaleru09@gmail.com",
    pass: process.env.BREVO_PASS, 
  },
});


const sendMail = async (mailOptions) => {
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "faithfulolaleru09@gmail.com",
    to: mailOptions.to,
    subject: mailOptions.subject,
    // text: "Hello, Use {{ mailOptions.otp }} to Validate your account",
    html: `<p>Hello, Use ${mailOptions.otp} to Validate your account</p>`,
  });

  const toTest = {
    from: "faithfulolaleru09@gmail.com",
    to: mailOptions.to,
    subject: mailOptions.subject,
    // text: "Hello, Use {{ mailOptions.otp }} to Validate your account",
    html: `<p>Hello, Use ${mailOptions.otp} to Validate your account</p>`,
  };

  console.log("Check what's entering sendMail in emailService --> " + JSON.stringify(toTest));

  console.log("Message sent --> %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

module.exports = { sendMail };