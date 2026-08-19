import PropTypes from "prop-types";
import LogoutButton from "../Buttons/logout";
import { motion } from "framer-motion";

const UserDropDownMenu = ({ userForm }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.95 }}
      transition={{ duration: 0.12 }}
      className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-slate-700/80 bg-slate-800 p-4 shadow-2xl"
    >
      <div className="border-b border-slate-700/80 pb-3">
        <p className="font-semibold text-white">
          {userForm.firstName} {userForm.lastName}
        </p>
        <p className="truncate text-xs text-slate-300">
          {userForm.email}
        </p>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400">Log out</span>
        <LogoutButton />
      </div>
    </motion.div>
  );
};

UserDropDownMenu.propTypes = {
  userForm: PropTypes.shape({
    user: PropTypes.string,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
};

export default UserDropDownMenu;

