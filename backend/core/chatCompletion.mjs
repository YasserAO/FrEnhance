import baiscModel from "../connection/basicModel.mjs";

const ChatModels = [baiscModel];

export default async function chatCompletion(msg, index) {
  const chatCompletion = await ChatModels[index](msg);
  return chatCompletion.choices[0]?.message?.content || "";
}
