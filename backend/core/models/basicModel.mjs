import { groqConnect } from "../../connection/Groq.connect.mjs";

async function getGroqChatCompletion(msg) {
  return groqConnect.chat.completions.create({
    messages: [
      {
        role: "user",
        content: msg,
      },
    ],

    temperature: 0.1,
    model: "llama3-8b-8192",
  });
}

export default getGroqChatCompletion;
