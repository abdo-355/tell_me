import { createTransport, SendMailOptions } from "nodemailer";
import { config } from "dotenv";

config();

const sendMail = async (email: string, subject: string, content: string) => {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAILING_EMAIL,
      pass: process.env.MAILING_PASSWORD,
    },
  });
  try {
    await transporter.sendMail({
      from: process.env.MAILING_EMAIL,
      to: email,
      subject: subject,
      html: content,
    });
  } catch (err) {
    console.log(err);
  }
};

export default sendMail;
