import express from "express";
import passport from "passport";
import { sendOTP, sendPasswordResetLink, sendPasswordResetSuccessEmail } from "../controllers/mailController.js";
// User Controller
import {
  UserForgotPassword,
  UserUpdatePassword,
  getUserDetails,
  getUserFromForgotToken,
  userLogin,
  userRegister,
  verifyUserDetails,
} from "../controllers/userController.js";

const router = express.Router();

// User Routes
router.post("/user/login", userLogin);
router.post("/user/register", userRegister);
router.post("/user/verifyUserDetails", verifyUserDetails);
router.post("/user/getUserDetails", getUserDetails);
router.get("/user/password/getUserFromForgotToken/:token", getUserFromForgotToken);
router.post("/user/password/forgot-password",UserForgotPassword);
router.post("/user/password/update-user-password", UserUpdatePassword);

// Mail Routes
router.post("/mail/sendOTP", sendOTP);
router.post("/mail/forgotPassword", sendPasswordResetLink);
router.post('/mail/sendPasswordResetSuccessEmail',sendPasswordResetSuccessEmail);

// Test Route
router.get("/try", (req, res) => {
  res.json("Hello World");
});

export default router;
