export const isLoggedIn = (req, res, next) => {
  const user = req.user;
  if (!user)
    return res.status(200).send({ msg: "access unauthorized", status: 401 });
  next();
};
