import propTypes from "prop-types";
const LogoAvatar = ({ user }) => {
  const FChars = user
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");

  const imgSRC = `https://avatar.oxro.io/avatar.svg?name=${FChars[0]} + ${FChars[1]}&background=078559&color=000&caps=1`;
  return (
    <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-300">
      <img src={imgSRC} alt="user" />
    </div>
  );
};

LogoAvatar.propTypes = {
  user: propTypes.string,
};

export default LogoAvatar;
