import { useContext, useState } from "react";
import { AuthContext } from "../../authProvider";
import PropTypes from "prop-types";

const LogoAvatar = ({ setMenuDropDown, user }) => {
  const { userForm } = useContext(AuthContext);
  const [imgError, setImgError] = useState(false);

  const avatarUrl = userForm?.Avatar || userForm?.pfp;

  const getInitials = () => {
    if (typeof user === "string" && user.trim()) {
      const parts = user.trim().split(/\s+/);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return parts[0].slice(0, 2).toUpperCase();
    }
    const first = userForm?.firstName?.trim() || "";
    const last = userForm?.lastName?.trim() || "";
    if (first && last) {
      return (first[0] + last[0]).toUpperCase();
    }
    if (first) {
      return first.slice(0, 2).toUpperCase();
    }
    const username =
      userForm?.username || userForm?.user || userForm?.email || "U";
    return username.slice(0, 2).toUpperCase();
  };

  return (
    <div
      onClick={() => {
        if (setMenuDropDown) {
          setMenuDropDown((prev) => !prev);
        }
      }}
      className="flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-slate-700/60 bg-gradient-to-br from-sky-600 to-indigo-700 shadow-sm transition-transform hover:scale-105 active:scale-95"
      role="button"
      tabIndex={0}
      aria-label="User menu"
    >
      {avatarUrl && !imgError ? (
        <img
          className="h-full w-full object-cover"
          src={avatarUrl}
          alt="user"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="select-none text-xs font-bold tracking-wider text-white">
          {getInitials()}
        </span>
      )}
    </div>
  );
};

LogoAvatar.propTypes = {
  setMenuDropDown: PropTypes.func,
  user: PropTypes.string,
};

export default LogoAvatar;
