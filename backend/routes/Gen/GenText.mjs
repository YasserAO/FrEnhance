import express from "express";
import textOnlyTemplate from "../../templates/textOnly.mjs";
import chatCompletion from "../../core/chatCompletion.mjs";
import { convertPromptToJSON } from "../../utils/func/textToJson.mjs";

const router = express.Router();

router.post("/api/generate/text", async (req, res) => {
  const { level, theme } = req.body;
  const myMessage = textOnlyTemplate(level, theme);
  const MyPrompt = await chatCompletion(myMessage, 0);
  if (!MyPrompt) return res.status(200).send({ msg: "No response" });

  console.log(MyPrompt);
  const myJson = convertPromptToJSON(MyPrompt);
  console.log(myJson);

  return res.status(200).send(myJson);
});

export default router;
