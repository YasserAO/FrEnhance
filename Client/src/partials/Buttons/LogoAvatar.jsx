import { useContext } from "react";
import { AuthContext } from "../../authProvider";
import PropTypes from "prop-types";

const LogoAvatar = ({ setMenuDropDown }) => {
  const { userForm } = useContext(AuthContext);

  return (
    <div
      onClick={() => {
        if (setMenuDropDown) {
          setMenuDropDown((prev) => !prev);
        }
      }}
      className="flex h-10 w-10 items-center overflow-hidden rounded-full shadow-sm"
    >
      <img className="w-full" src={userForm.Avatar} alt="user" />
    </div>
  );
};

LogoAvatar.propTypes = {
  setMenuDropDown: PropTypes.func,
};
export default LogoAvatar;
