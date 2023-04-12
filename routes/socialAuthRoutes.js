import express from "express";
import passport from "passport";
import "../controllers/passport-setup.js";
import dotenv from "dotenv";
import url from "url";

const router = express.Router();

dotenv.config();

const CLIENT_URL = process.env.CLIENT_URL;

// Google Login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google Login Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    console.log(req);
    const url1 = url.format({
      pathname: `${CLIENT_URL}/social/login`,
      query: {
        email: encodeURIComponent(req.user.email),
        // "sessionid":null
      },
    });
    res.redirect("http://" + url1);
  }
);

export default router;
