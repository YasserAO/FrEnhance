import express from "express";
import GenText from "./Gen/GenText.mjs";
import GenQuestion from "./Gen/GenQuestion.mjs";
import GenCorrection from "./Gen/GenCorrection.mjs";
const router = express.Router();

router.use(GenText);
router.use(GenQuestion);
router.use(GenCorrection);

export default router;
