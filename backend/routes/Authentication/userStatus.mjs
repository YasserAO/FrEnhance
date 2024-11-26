import express from "express";
import { isLoggedIn } from "../../middleware/isLoggedinCheck.mjs";
import { DailyCoinReset } from "../../middleware/coins/DailyCoinReset.mjs";

const router = express.Router();

router.get(
  "/api/user/auth/status",
  isLoggedIn,
  DailyCoinReset,
  (request, response) => {
    const User = request.user;
    // console.log(User.id);

    return response.status(200).send({
      msg: "User is Logged",
      isAuthenticated: true,
      User,
      status: 200,
    });
  }
);

export default router;
