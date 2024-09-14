import express from "express";
import questionOnlyTemplate from "../../templates/questionOnly.mjs";
import chatCompletion from "../../core/chatCompletion.mjs";

const router = express.Router();

router.post("/api/generate/question", async (req, res) => {
  const { title, text, level, num } = req.body;
  const myMessage = questionOnlyTemplate(level, title, text, num);
  const jsonResponse = await chatCompletion(myMessage, 0);
  if (!jsonResponse) return res.status(200).send({ msg: "No response" });
  return res.status(200).send(jsonResponse);
});

export default router;
