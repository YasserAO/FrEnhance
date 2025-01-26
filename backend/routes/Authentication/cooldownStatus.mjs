import express from "express";
import { isLoggedIn } from "../../middleware/isLoggedinCheck.mjs";
import { getUserByID } from "../../utils/func/getUserByID.mjs";

const router = express.Router();

router.get(
  "/api/user/auth/cool-down",
  isLoggedIn,

  async (request, response) => {
    const UserID = request.user.id;
    const user = await getUserByID(UserID);
    const cooldown = user.verification.verificationCooldown || null;

    return response.status(200).send({
      cooldown,
      status: 200,
    });
  }
);

export default router;
