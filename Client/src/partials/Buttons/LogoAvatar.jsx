import propTypes from "prop-types";
const LogoAvatar = ({ user, setMenuDropDown, color }) => {
  const FChars = user
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");

  const imgSRC = `https://avatar.oxro.io/avatar.svg?name=${FChars[0]} + ${FChars[1]}&background=${color}&color=000&caps=1`;
  return (
    <div
      onClick={() => {
        if (setMenuDropDown) {
          setMenuDropDown((prev) => !prev);
        }
      }}
      className="h-8 w-8 overflow-hidden rounded-full shadow-sm"
    >
      <img src={imgSRC} alt="user" />
    </div>
  );
};

LogoAvatar.propTypes = {
  user: propTypes.string,
  setMenuDropDown: propTypes.func,
  color: propTypes.string,
};

export default LogoAvatar;
