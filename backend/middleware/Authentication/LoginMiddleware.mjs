import passport from "passport";

export const loginMiddleWare = (req, res, next) => {
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
      if (req.NoLoginResponse) return next();
      return res
        .status(200)
        .send({ msg: "Login Successful", user, status: 200 });
    });
  })(req, res, next); // Ensure to pass next for middleware handling
};
