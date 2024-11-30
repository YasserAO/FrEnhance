import { UserModel } from "../../Schema/mongoose/userModele.mjs";

export const getUserByID = async (userID) => {
  try {
    const User = await UserModel.findById(userID);
    if (!User) {
      console.log("User Not found");
      return null;
    } else return User;
  } catch (err) {
    console.error("Error fetching to the DataBase");
    return null;
  }
};
