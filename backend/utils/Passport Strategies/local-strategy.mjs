import passport from "passport";
import { Strategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UserModel } from "../../Schema/mongoose/userModele.mjs";
import { comparePassword } from "../func/helper.mjs";
import { generateUniqueUsername } from "../func/usernameCreator.mjs";

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await UserModel.findById(id);
    if (!findUser) throw new Error("Invalid Credentials");
    const LoggedUser = {
      firstName: findUser.firstName,
      lastName: findUser.lastName,
      username: findUser.username,
      email: findUser.email,
      id: findUser._id,
      Avatar: findUser.pfp,
      verified: findUser.verified,
    };

    done(null, LoggedUser);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const findUser = await UserModel.findOne({
        $or: [{ username: username }, { email: username }],
      });
      if (!findUser) return done(null, false, { msg: "Invalid Credentials" });
      if (!comparePassword(password, findUser.password))
        return done(null, false, { msg: "Invalid Credentials" });
      const LoggedUser = {
        username: findUser.username,
        email: findUser.email,
        id: findUser._id,
      };
      done(null, LoggedUser);
    } catch (err) {
      done(err, null);
    }
  })
);

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        try {
          const user = await UserModel.findOne({ googleId: profile.id });
          if (user) return done(null, user);
        } catch (err) {
          return done(err, null);
        }

        try {
          const user = await UserModel.findOne({
            email: profile.emails[0].value,
          });
          if (user) {
            user.provider = "local-google";
            user.googleId = profile.id;
            await user.save();
            done(null, user);
          }
        } catch (err) {
          done(err, null);
        }
        try {
          const tempUsername = await generateUniqueUsername(profile.displayName);
          const user = await UserModel.insertOne({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            provider: "google",
            googleId: profile.id,
            email: profile.emails[0].value,
            pfp: profile.photos[0].value,
            username: tempUsername,
          });

          done(null, user);
        } catch (err) {
          done(err, null);
        }
      }
    )
  );
}

export default passport;
