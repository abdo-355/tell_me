import { Resend } from "resend";
import { config } from "../config";

const resend = new Resend(config.resendApiKey);

const sendMail = async (email: string, subject: string, content: string) => {
  try {
    await resend.emails.send({
      from: config.resendFromEmail,
      to: email,
      subject: subject,
      html: content,
    });
  } catch (err) {
    console.log(err);
  }
};

export default sendMail;
