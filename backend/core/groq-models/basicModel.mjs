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
    model: "llama-3.3-70b-specdec",
  });
}
// llama-3.1-8b-instant
// llama-3.1-70b-versatile
export default getGroqChatCompletion;
