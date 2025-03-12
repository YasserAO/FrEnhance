import { UserModel } from "../../Schema/mongoose/userModele.mjs";

export const generateUniqueUsername = async (baseUsername) => {
  let username = baseUsername.replace(/\s+/g, "_"); // Replace spaces with underscores
  let exists = await UserModel.findOne({ username }); // Check if it exists
  let counter = 1;

  while (exists) {
    username = `${baseUsername.replace(/\s+/g, "_")}_${counter}`;
    exists = await UserModel.findOne({ username });
    counter++;
  }

  return username;
};
