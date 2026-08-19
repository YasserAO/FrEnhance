import { MdOutlineCreateNewFolder } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdInsertDriveFile } from "react-icons/md";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
export const TextToolButton = ({ type }) => {
  const navigate = useNavigate();
  const icons = [
    {
      to: "create",
      text: "Create a Text",
      icon: (
        <MdOutlineCreateNewFolder
          size={"3rem"}
          className="text-gray-400 transition-all duration-100 group-hover:scale-105 group-active:scale-110"
        ></MdOutlineCreateNewFolder>
      ),
    },
    {
      to: "edit",
      text: "Edit a Text",
      icon: (
        <CiEdit
          size={"3rem"}
          className="text-gray-400 transition-all duration-100 group-hover:scale-105 group-active:scale-110"
        ></CiEdit>
      ),
    },
    {
      to: "insert",
      text: "insert  A text",
      icon: (
        <MdInsertDriveFile
          size={"3rem"}
          className="text-gray-400 transition-all duration-100 group-hover:scale-105 group-active:scale-110"
        ></MdInsertDriveFile>
      ),
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          navigate(icons[type - 1].to);
        }
      }}
      onClick={() => {
        navigate(icons[type - 1].to);
      }}
      className="group flex h-32 w-full max-w-sm cursor-pointer select-none flex-col items-center justify-center rounded-2xl border-2 border-slate-700/80 bg-slate-800 p-6 shadow-md transition-all hover:border-sky-500 hover:shadow-sky-500/10 focus:outline-none focus:ring-2 focus:ring-sky-500"
    >
      <div className="mb-2 text-sky-400 transition-transform duration-200 group-hover:scale-110">
        {icons[type - 1].icon}
      </div>
      <h1 className="text-base font-semibold tracking-wide text-white transition-colors group-hover:text-sky-300">
        {icons[type - 1].text}
      </h1>
    </motion.div>
  );
};


TextToolButton.propTypes = {
  toggleForm: PropTypes.any,
  setToggleForm: PropTypes.func,
  setDashMode: PropTypes.func,
  type: PropTypes.number,
};
