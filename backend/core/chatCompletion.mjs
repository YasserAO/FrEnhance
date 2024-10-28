import baiscModel from "../connection/basicModel.mjs";

const ChatModels = [baiscModel];

export default async function chatCompletion(msg, index) {
  try {
    const chatCompletion = await ChatModels[index](msg);
    return chatCompletion.choices[0]?.message?.content || "";
  } catch (err) {
    console.error(err.message);
    return null;
  }
}
