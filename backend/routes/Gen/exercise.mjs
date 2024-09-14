import express from "express";
import textTemplate from "../../templates/textTemplate.mjs";
import chatCompletion from "../../core/chatCompletion.mjs";

const router = express.Router();

router.post("/api/generate/text", async (req, res) => {
  const { level, subject, answers } = req.body;
  const myMessage = textTemplate(level, subject, answers);
  const jsonResponse = await chatCompletion(myMessage, 0);
  if (!jsonResponse) return res.status(200).send({ msg: "No response" });
  return res.status(200).send(jsonResponse);
});

export default router;
