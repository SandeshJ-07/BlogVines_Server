import express from "express";
import { sendOTP } from "../controllers/mailController.js";

// User Controller
import { getUserDetails, userLogin, userRegister, verifyUserDetails } from "../controllers/userController.js";

const router = express.Router();

// User Routes
router.post("/user/login", userLogin);
router.post("/user/register", userRegister);
router.post("/user/verifyUserDetails", verifyUserDetails);
router.post("/user/getUserDetails",getUserDetails);

// Mail Routes
router.post("/mail/sendOTP", sendOTP);

// Test Route
router.get("/try", (req, res) => {
    res.json("Hello World");
});

export default router;