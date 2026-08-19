import { groqConnect } from "../../connection/Groq.connect.mjs";

async function getGroqChatCompletion(msg) {
  return groqConnect.chat.completions.create({
    messages: [
      {
        role: "system",
        content: msg.system,
      },
      {
        role: "user",
        content: msg.user,
      },
    ],
    temperature: 0.2,
    model: process.env.GROQ_MODEL || "openai/gpt-oss-120b",
  });
}

export default getGroqChatCompletion;

