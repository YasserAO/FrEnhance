import express from "express";
import textOnlyTemplate from "../../templates/textOnly.mjs";
import chatCompletion from "../../core/chatCompletion.mjs";

const router = express.Router();

router.post("/api/generate/text", async (req, res) => {
  const { level, theme } = req.body;
  const myMessage = textOnlyTemplate(level, theme);
  const jsonResponse = await chatCompletion(myMessage, 0);
  if (!jsonResponse) return res.status(200).send({ msg: "No response" });
  return res.status(200).send(jsonResponse);
});

export default router;
