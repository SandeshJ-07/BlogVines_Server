import express from "express";
import passport from "passport";
import "../controllers/passport-setup.js";
import dotenv from "dotenv";
import url from "url";
import axios from "axios";
import {
  generateUserLoginSession,
  getUserIdFromSessionId,
} from "../controllers/loginSessionController.js";

dotenv.config();

const SERVER_URL = process.env.SERVER_URL;
const CLIENT_URL = process.env.CLIENT_URL;
const router = express.Router();

// Google Login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google Login Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  async (req, res) => {
    let response = await axios.post(`${SERVER_URL}/social/auth/createSession`, {
      email: req.user.email,
    });
    let link = String(CLIENT_URL).includes("localhost")?`${CLIENT_URL}/social/login`:`https://${CLIENT_URL}/social/login`;
    const url1 = url.format({
      pathname: link,
      query: {
        sessionId: response.data.sessionId,
      },
    });
    res.redirect(url1);
  }
);

// Session Routes
router.post("/createSession", generateUserLoginSession);
router.post("/getUserFromSessionId", getUserIdFromSessionId);

export default router;
