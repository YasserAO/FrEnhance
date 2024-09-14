import express from "express";
import textGen from "./Gen/exercise.mjs";

const router = express.Router();

router.use(textGen);

export default router;
