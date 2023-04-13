import passport from "passport";
import dotenv from "dotenv";
import User from "../models/userSchema.js";
import Session from "../models/LoginSessionSchema.js";
import passwordHash from "password-hash";

dotenv.config();

const SERVER_URL = process.env.SERVER_URL;
// Setting up Google Authentication
import GoogleStrategy from "passport-google-oauth2";

// used to serialize the user for the session
passport.serializeUser(function (user, done) {
  done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function (user, done) {
  done(null, user);
});

//Google strategy
passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${SERVER_URL}/social/auth/google/callback`,
      passReqToCallback: true,
    },
    (request, accessToken, refreshToken, profile, done) => {
      User.findOne({
        $or: [{ googleId: profile.id }, { email: profile.email }],
      }).then(async (currentUser) => {
        if (currentUser) {
          if (currentUser.googleId) {
            done(null, profile);
          } else {
            User.findOneAndUpdate(
              { email: profile.email },
              { googleId: profile.id },
              { new: true }
            ).then((updatedUser) => {
              done(null, profile);
            });
          }
        } else {
          let password = Math.random().toString(36).slice(-8);
          // Random username generation
          let username = Math.random().toString(36).slice(-8);
          const user = new User({
            firstName: profile.given_name,
            lastName: profile.family_name,
            username: username,
            email: profile.email,
            googleId: profile.id,
            isReader: true,
            isWriter: false,
            isAdmin: false,
            password: passwordHash.generate(password)
          });
          await user.save();
          done(null, profile);
        }
      });
    }
  )
);
