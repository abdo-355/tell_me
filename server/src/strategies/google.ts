import passport from "passport";
import { Strategy as googleStrategy } from "passport-google-oauth20";
import { config } from "dotenv";
import jwt from "jsonwebtoken";

import User from "../models/User";

config();

let token: string;

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

// Serialize and deserialize functions
passport.serializeUser((user, done) => {
  done(null, { token });
});

passport.serializeUser((user, done) => {
  done(null, { token });
});
