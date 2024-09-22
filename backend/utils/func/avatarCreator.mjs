export const LogoAvatar = (user) => {
  const imgSRC = `https://avatar.oxro.io/avatar.svg?name=${user.firstName} + ${user.lastName}&color=000&caps=1`;
  return imgSRC;
};
