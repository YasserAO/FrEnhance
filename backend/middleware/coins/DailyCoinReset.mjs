import CoinConfig from "../../Config/CoinsConfig.json" with { type: "json" };
import { getUserByID } from "../../utils/func/getUserByID.mjs";

export const DailyCoinReset = async (req, res, next) => {
  const DailyInterval = CoinConfig.ResetInterval * 1000 * 3600;
  const DefaultValue = CoinConfig.defaultValue;

  const USER = await getUserByID(req.user.id);
  if (USER == null) next();

  //   console.log(USER.coins);
  //   console.log(USER.coins.quantity);

  if (!USER.verified) {
    USER.coins = {
      quantity: 0,
      lastReset: undefined,
    };
    try {
      await USER.save();
      return next();
    } catch (err) {
      //   console.error("ERROR SAVING WHEN RESETING COINS");
      return next();
    }
  }

  if (
    USER.coins == undefined ||
    USER.coins.quantity == undefined ||
    USER.coins.lastReset == undefined
  ) {
    // console.log("coins is undefined");
    USER.coins = {
      quantity: DefaultValue,
      lastReset: new Date(),
    };

    try {
      await USER.save();
      return next();
    } catch (err) {
      //   console.error("ERROR SAVING WHEN RESETING COINS");
      return next();
    }
  }
  const TheQuantity = USER.coins.quantity;
  const TheReset = USER.coins.lastReset;
  const now = new Date();

  if (TheQuantity == undefined || now - TheReset >= DailyInterval) {
    // console.log("Quantity is undifined or reset has been reached");
    USER.coins = {
      quantity: DefaultValue,
      lastReset: new Date(),
    };
    try {
      await USER.save();
      console.log("Saved Successfull");
      return next();
    } catch (err) {
      //   console.error("Error Saving After Reset", err.message);
      return next();
    }
  }

  if (TheQuantity == DefaultValue && TheReset == undefined) {
    USER.coins.lastReset = new Date();
    try {
      await USER.save();
      return next();
    } catch (err) {
      console.error(err.message);
      return next();
    }
  }
  if (TheReset == undefined) {
  }
  console.log("No changes in the Daily Reset");
  return next();
};
