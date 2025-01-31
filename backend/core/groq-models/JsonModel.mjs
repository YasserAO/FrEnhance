import { groqConnect } from "../../connection/Groq.connect.mjs";

async function getGroqChatCompletionJSON(msg) {
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
    temperature: 0.5,
    model: "llama-3.3-70b-specdec",
  });
}
export default getGroqChatCompletionJSON;
// llama-3.1-8b-instant
// llama-3.1-70b-versatile
