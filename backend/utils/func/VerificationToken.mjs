import crypto from "crypto";

// Generate a secure URL token
export function generateUrlToken() {
  return crypto.randomBytes(32).toString("hex");
}

// Generate a numeric token
export function generateNumericToken() {
  return Math.floor(100000 + Math.random() * 900000);
}

export const verificationToken = () => {
  return {
    verificationToken: generateNumericToken(),
    expiresAT: new Date(Date.now() + 1000 * 60 * 15),
    verificationCooldown: new Date(Date.now() + 1000 * 60 * 3),
  };
};

export const verificationURL = (pssedid) => {
  return {
    userID: pssedid,
    Token: generateUrlToken(),
    expiresAT: new Date(Date.now() + 1000 * 3600 * 24),
  };
};

export const resetPassURL = (pssedid) => {
  return {
    userID: pssedid,
    Token: generateUrlToken(),
    expiresAT: new Date(Date.now() + 1000 * 3600 * 24),
  };
};
