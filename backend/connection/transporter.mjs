import { createTransport } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

console.log({
  user: process.env.USER,
  pass: process.env.EPASSWORD,
});
const transporter = createTransport({
  host: "smtp-relay.brevo.com",
  port: "587",
  auth: {
    user: process.env.USER,
    pass: process.env.EPASSWORD,
  },
  logger: false,
  debug: false,
});

export const sendVerification = async (email, subject, html) => {
  try {
    await transporter.sendMail({
      from: process.env.MAINEMAIL,
      to: email,
      subject: subject,
      html: html,
    });

    console.log("Email sent");
  } catch (err) {
    console.log("email not sent");
    console.log(err);
  }
};
