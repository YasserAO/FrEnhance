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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
      onClick={() => {
        navigate(icons[type - 1].to);
      }}
      className="group flex h-24 w-full cursor-pointer select-none flex-col items-center justify-center overflow-hidden rounded-lg border-4 border-gray-300"
    >
      <h1 className="text-md select-none font-semibold text-gray-400">
        {icons[type - 1].text}
      </h1>
      {icons[type - 1].icon}
    </motion.div>
  );
};

TextToolButton.propTypes = {
  toggleForm: PropTypes.any,
  setToggleForm: PropTypes.func,
  setDashMode: PropTypes.func,
  type: PropTypes.number,
};
