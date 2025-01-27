import { UserModel } from "../../Schema/mongoose/userModele.mjs";

export const getUserByEmail = async (email) => {
  try {
    const User = await UserModel.findOne({ email: email });
    if (!User) {
      console.log("User Not found");
      return null;
    } else return User;
  } catch (err) {
    console.error("Error fetching to the DataBase");
    return null;
  }
};
