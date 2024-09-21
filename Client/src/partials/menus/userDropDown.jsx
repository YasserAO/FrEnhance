import PropTypes from "prop-types";
import LogoutButton from "../Buttons/logout";
import { motion } from "framer-motion";

const UserDropDownMenu = ({ userForm }) => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "200px", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.15, opacity: { duration: 0.1 } }}
      className="absolute right-[10%] top-full w-full max-w-56 translate-x-16 translate-y-2 overflow-hidden rounded-lg bg-slate-600 px-5 py-10"
    >
      <p className="font-semibold text-white">
        {userForm.firstName + " " + userForm.lastName}
      </p>
      <p className="font-semibold text-white">
        Email: <span className="text-sm text-gray-100">{userForm.email}</span>
      </p>
      <div className="absolute bottom-0 right-1/2 mb-2 flex translate-x-1/2 items-center gap-2">
        <p className="text-white">Disconnect</p>
        <LogoutButton></LogoutButton>
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
