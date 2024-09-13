import baiscModel from "./models/basicModel.mjs";

const ChatModels = [baiscModel];

export default async function main(msg, index) {
  const chatCompletion = await ChatModels[index](msg);
  return chatCompletion.choices[0]?.message?.content || "";
}
