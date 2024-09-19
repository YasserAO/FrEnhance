import express from "express";
import GenText from "./Gen/GenText.mjs";
import GenQuestion from "./Gen/GenQuestion.mjs";
import GenCorrection from "./Gen/GenCorrection.mjs";
import register from "./Authentication/register.mjs";
import authenticate from "./Authentication/authenticate.mjs";
import userStatus from "./Authentication/userStatus.mjs";

const router = express.Router();

router.use(register);
router.use(authenticate);
router.use(userStatus);
router.use(GenText);
router.use(GenQuestion);
router.use(GenCorrection);

export default router;
