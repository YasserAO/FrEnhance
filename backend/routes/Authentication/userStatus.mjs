import express from "express";
import { isLoggedIn } from "../../middleware/isLoggedinCheck.mjs";
import { DailyCoinReset } from "../../middleware/coins/DailyCoinReset.mjs";
import configFile from "../../Config/CoinsConfig.json" with {type:'json'}

const textGeneration = Object.values(configFile.GenerateText)
const explain = configFile.Explain
const router = express.Router();

router.get(
  "/api/user/auth/status",
  isLoggedIn,
  
  (request, response) => {
    const User = request.user;
    // console.log(User.id);

    return response.status(200).send({
      msg: "User is Logged",
      isAuthenticated: true,
      User,
      config:{
        textGeneration,
        explain
      },
      status: 200,
    });
  }
);

export default router;
