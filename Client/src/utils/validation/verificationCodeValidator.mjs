export const verifyCode = (code) => {
  if (code === NaN) {
    return false;
  }
  if (code.length !== 6) {
    return false;
  }

  if (!/^\d{6}$/.test(code)) {
    return false;
  }

  return true;
};
