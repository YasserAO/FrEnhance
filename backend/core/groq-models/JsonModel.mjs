import { groqConnect } from "../../connection/Groq.connect.mjs";

async function getGroqChatCompletionJSON(msg, temp) {
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
    response_format: { type: "json_object" },
    temperature: temp || 0.2,
    model: process.env.GROQ_MODEL || "openai/gpt-oss-120b",
  });
}

export default getGroqChatCompletionJSON;

