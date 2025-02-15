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
    temperature: temp,
    model: "llama-3.3-70b-versatile",
  });
}
export default getGroqChatCompletionJSON;
// llama-3.1-8b-instant
// model: "	llama-3.3-70b-versatile",
// model: "llama-3.3-70b-specdec",
