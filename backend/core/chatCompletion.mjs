import baiscModel from "./groq-models/basicModel.mjs";
import jsonModel from "./groq-models/JsonModel.mjs";

const ChatModels = [baiscModel, jsonModel];

export default async function chatCompletion(msg, index, temp = 0.5) {
  try {
    const chatCompletion = await ChatModels[index](msg, temp);
    return chatCompletion.choices[0]?.message?.content || "";
  } catch (err) {
    console.error(err.message);
    return null;
  }
}
