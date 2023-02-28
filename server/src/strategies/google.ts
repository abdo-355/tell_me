import passport from "passport";
import { Strategy as googleStrategy } from "passport-google-oauth20";
import { config } from "dotenv";

config();

passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URL,
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      passport.serializeUser((user, done) => {
        done(null, profile);
      });

      done(null, profile);
    }
  )
);
