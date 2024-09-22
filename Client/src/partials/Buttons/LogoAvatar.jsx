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
      className="h-8 w-8 overflow-hidden rounded-full shadow-sm"
    >
      <img src={userForm.Avatar} alt="user" />
    </div>
  );
};

LogoAvatar.propTypes = {
  setMenuDropDown: PropTypes.func,
};
export default LogoAvatar;
