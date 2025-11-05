import { Resend } from "resend";
import { config } from "dotenv";

config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async (email: string, subject: string, content: string) => {
  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "noreply@yourdomain.com",
      to: email,
      subject: subject,
      html: content,
    });
  } catch (err) {
    console.log(err);
  }
};

export default sendMail;
