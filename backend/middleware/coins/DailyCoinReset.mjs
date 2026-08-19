import CoinConfig from "../../Config/CoinsConfig.json" with { type: "json" };
import { getUserByID } from "../../utils/func/getUserByID.mjs";

export const DailyCoinReset = async (req, res, next) => {
  const DailyInterval = CoinConfig.ResetInterval * 1000 * 3600;
  const DefaultValue = CoinConfig.defaultValue || 1000;

  const USER = await getUserByID(req?.user?.id);
  if (!USER) return next();

  const userDailyLimit = USER.coins?.dailyLimit || DefaultValue;


  if (!USER.verified) {
    USER.coins = {
      quantity: 0,
      dailyLimit: USER.coins?.dailyLimit,
      lastReset: undefined,
    };
    try {
      await USER.save();
      return next();
    } catch (err) {
      return next();
    }
  }

  if (
    USER.coins == undefined ||
    USER.coins.quantity == undefined ||
    USER.coins.lastReset == undefined
  ) {
    USER.coins = {
      quantity: userDailyLimit,
      dailyLimit: USER.coins?.dailyLimit,
      lastReset: new Date(),
    };

    try {
      await USER.save();
      return next();
    } catch (err) {
      return next();
    }
  }

  const TheQuantity = USER.coins.quantity;
  const TheReset = USER.coins.lastReset;
  const now = new Date();

  if (TheQuantity == undefined || now - TheReset >= DailyInterval) {
    USER.coins = {
      quantity: userDailyLimit,
      dailyLimit: USER.coins?.dailyLimit,
      lastReset: new Date(),
    };
    try {
      await USER.save();
      return next();
    } catch (err) {
      return next();
    }
  }

  if (TheQuantity == userDailyLimit && TheReset == undefined) {
    USER.coins.lastReset = new Date();
    try {
      await USER.save();
      return next();
    } catch (err) {
      return next();
    }
  }
  if (TheReset == undefined) {
  }
  // console.log("No changes in the Daily Reset");
  return next();
};
