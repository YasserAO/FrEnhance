import passport from "passport";
import { Strategy } from "passport-local";
import { UserModel } from "../../Schema/mongoose/userModele.mjs";
import { comparePassword } from "../func/helper.mjs";

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
      coins: findUser.coins.quantity,
    };

    done(null, LoggedUser);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const findUser = await UserModel.findOne({ username: username });
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
