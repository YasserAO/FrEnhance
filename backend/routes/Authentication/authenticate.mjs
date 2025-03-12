import express from "express";
import passport from "passport";
import "../../utils/Passport Strategies/local-strategy.mjs";

const router = express.Router();

router.get(
  "/api/user/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/api/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.LOCALHOST}/auth/login`,
    successRedirect: process.env.LOCALHOST,
  })
);

router.post("/api/user/auth", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).send({ msg: "An error occurred" });
    if (!user)
      return res
        .status(200)
        .send({ msg: info ? info.msg : "Authentication failed", status: 401 });

    // Use req.login() to establish a session
    req.login(user, (err) => {
      if (err)
        return res
          .status(200)
          .send({ msg: "An error occurred while logging in", status: 500 });
      return res
        .status(200)
        .send({ msg: "Login Successful", user, status: 200 });
    });
  })(req, res, next); // Ensure to pass next for middleware handling
});

router.post("/api/user/auth/logout", (request, response) => {
  request.logout((err) => {
    if (err) return response.sendStatus(401).send({ msg: "Error Occured" });
    request.session.destroy((err) => {
      if (err) console.log(err);
    });
    response.clearCookie("connect.sid");
    return response.status(200).send({ msg: "LoggedOut Successfully" });
  });
});

export default router;
