import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app_password = process.env.GMAIL_PASSWORD;

// This function sends the otp to the user email while signing up
export const sendOTP = async (req, res) => {
  try {

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    
    // Create html for OTP
    let html = `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">BlogVines</a>
      </div>
      <p style="font-size:1.1em">Hi,</p>
      <p>Thank you for choosing us. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
      <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
      <p style="font-size:0.9em;">Regards,<br />BlogVines</p>
      <hr style="border:none;border-top:1px solid #eee" />
    </div>
  </div>`;

    // Create transporter object
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "dev.sandeshjain@gmail.com",
        pass: String(app_password),
      },
    });
    await transporter.sendMail({
      from: "sandeshjain2502@gmail.com",
      to: req.body.email,
      subject: "BlogVines OTP",
      html: html,
    });
    return res.status(200).json({ otp: otp });
  } catch (error) {
    console.log(`Error in sending OTP : ${error}`);
  }
};