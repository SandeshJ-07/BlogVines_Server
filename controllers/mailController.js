import nodemailer from "nodemailer";
import dotenv from "dotenv";
import ForgotPassToken from "../models/forgotPasswordToken.js";

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
      from: "dev.sandeshjain@gmail.com",
      to: req.body.email,
      subject: "BlogVines OTP",
      html: html,
    });
    return res.status(200).json({ otp: otp });
  } catch (error) {
    console.log(`Error in sending OTP : ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// This function sends the password reset link to the user email
export const sendPasswordResetLink = async (req, res) => {
  try {
    let token = await ForgotPassToken.findOne({
      token: req.body.token,
      email: req.body.email,
    });
    if (token) {
      let link =
        process.env.CLIENT_URL +
        "/account/password/forgot-password/" +
        token.token;
      // Create html for password reset link
      let html = `<body style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">

      <h1 style="margin-bottom: 20px;">BlogVines</h1>
    
      <p>Hello,</p>
    
      <p>You recently requested to reset your password on BlogVines. If you did not make this request, please ignore this email.</p>
      
      <p>The link expires in 1 hour.</p>
    
      <p>To reset your password, click the button below:</p>
    
      <a href="${link}" style="color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block; margin-bottom: 20px;">Reset Password</a>
    
      <p>If the button above doesn't work, you can also reset your password by copying and pasting the following URL into your browser:</p>

    
      <p style="margin-bottom: 20px;">${link}</p>

    
      <p>Thanks,</p>
    
      <p>The BlogVines Team</p>
    
    </body>`;

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
        from: "dev.sandeshjain@gmail.com",
        to: req.body.email,
        subject: "BlogVines Reset Password",
        html: html,
      });
      token.lastMail = Date.now();
      await token.save();
      return res.status(200).json({ message: "Password reset link sent" });
    }
  } catch (error) {
    console.log(`Error in sending password reset link : ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// This function send the password reset success email to the user
export const sendPasswordResetSuccessEmail = async (req, res) => {
  try {
    // Create html for password reset success email
    let html = `<body style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">

    <h1 style="margin-bottom: 20px;">BlogVines</h1>

    <p>Hello,</p>

    <p>Your password has been successfully reset.</p>

    <p>If you did not make this request, please contact us immediately.</p>

    <p>Thanks,</p>

    <p>The BlogVines Team</p>`;

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
      from: "dev.sandeshjain@gmail.com",
      to: req.body.email,
      subject: "BlogVines Reset Password",
      html: html,
    });
    return res
      .status(200)
      .json({ message: "Password reset success email sent" });
  } catch (error) {
    console.log(`Error in sending password reset success email : ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
