import express from "express";
import { isLoggedIn } from "../../middleware/isLoggedinCheck.mjs";

const router = express.Router();

router.get("/api/user/auth/status", isLoggedIn, (request, response) => {
  const User = request.user;

  return response
    .status(200)
    .send({ msg: "User is Logged", isAuthenticated: true, User, status: 200 });
});

export default router;
