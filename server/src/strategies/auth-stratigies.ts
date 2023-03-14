import passport from "passport";
import { Strategy as googleStrategy } from "passport-google-oauth20";
import { Strategy as facebookStrategy } from "passport-facebook";
import { config } from "dotenv";
import jwt from "jsonwebtoken";

import User from "../models/User";

config();

let token: string;

// Google strategy
passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URL,
      scope: ["profile", "email"],
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ email: profile._json.email });

        // create a new user if the user doesn't exist
        if (!user) {
          const newUser = new User({
            email: profile._json.email,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            verified: true,
            googleId: profile.id,
          });

          await newUser.save();

          token = jwt.sign(
            { userId: newUser._id.toString() },
            process.env.SECRET_KEY,
            { expiresIn: "7d" }
          );
        } else {
          // if the user exists
          token = jwt.sign(
            { userId: user._id.toString() },
            process.env.SECRET_KEY,
            { expiresIn: "7d" }
          );
        }
      } catch (err) {
        done(err, profile);
      } finally {
        done(null, { token });
      }
    }
  )
);

// Facebook strategy
passport.use(
  new facebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_REDIRECT_URL,
      profileFields: ["id", "name", "emails"],
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ email: profile._json.email });

        // create a new user if the user doesn't exist
        if (!user) {
          const newUser = new User({
            email: profile._json.email,
            firstName: profile._json.first_name,
            lastName: profile._json.last_name,
            verified: true,
            facebookId: profile.id,
          });

          await newUser.save();

          token = jwt.sign(
            { userId: newUser._id.toString() },
            process.env.SECRET_KEY,
            { expiresIn: "7d" }
          );
        } else {
          // if the user exists
          token = jwt.sign(
            { userId: user._id.toString() },
            process.env.SECRET_KEY,
            { expiresIn: "7d" }
          );
        }
      } catch (err) {
        done(err, profile);
      } finally {
        done(null, { token });
      }
    }
  )
);

// Serialize and deserialize functions
passport.serializeUser((user, done) => {
  done(null, { token });
});

passport.deserializeUser((user, done) => {
  done(null, { token });
});
