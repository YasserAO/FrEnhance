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
    temperature: 0.5,
    model: "llama3-8b-8192",
  });
}

export default getGroqChatCompletion;
