import nodemailer from "nodemailer";
import envConfig from "../config/env.config.js";
import __dirname from "../dirname.js";

export const sendEmail = async (email, subject, message, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: envConfig.GMAIL_EMAIL,
      pass: envConfig.GMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: envConfig.GMAIL_EMAIL,
    to: email,
    subject: subject,
    text: message,
    html: 
    `<div>
        <h1>
            Ticket
        </h1>
    </div>`,
    attachments: [
      {
        filename: "refrescos.jpg",
        path: __dirname + "../../public/images/refrescos.jpg",
        cid: "Refrescos",
      },
    ],
  });
};
