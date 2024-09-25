import { groqConnect } from "../core/models/Groq.connect.mjs";

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
    model: "llama-3.1-70b-versatile",
  });
}

export default getGroqChatCompletion;
