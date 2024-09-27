import { MdOutlineCreateNewFolder } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdInsertDriveFile } from "react-icons/md";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
export const TextToolButton = ({
  type,
  toggleForm,
  setToggleForm,
  setDashMode,
}) => {
  const icons = [
    {
      text: "Create a Text",
      icon: (
        <MdOutlineCreateNewFolder
          size={"3rem"}
          className="text-gray-400 transition-all duration-100 group-hover:scale-105 group-active:scale-110"
        ></MdOutlineCreateNewFolder>
      ),
    },
    {
      text: "Edit a Text",
      icon: (
        <CiEdit
          size={"3rem"}
          className="text-gray-400 transition-all duration-100 group-hover:scale-105 group-active:scale-110"
        ></CiEdit>
      ),
    },
    {
      text: "Edit a Text",
      icon: (
        <MdInsertDriveFile
          size={"3rem"}
          className="text-gray-400 transition-all duration-100 group-hover:scale-105 group-active:scale-110"
        ></MdInsertDriveFile>
      ),
    },
  ];
  return (
    !toggleForm && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        onClick={() => {
          setDashMode(type);
          setToggleForm((prev) => !prev);
        }}
        className="group flex h-40 cursor-pointer select-none flex-col items-center justify-center overflow-hidden rounded-lg border-4 border-gray-300 sm:mt-5"
      >
        <h1 className="groupe-hov text-md select-none font-semibold text-gray-400">
          {icons[type - 1].text}
        </h1>
        {icons[type - 1].icon}
      </motion.div>
    )
  );
};

TextToolButton.propTypes = {
  toggleForm: PropTypes.any,
  setToggleForm: PropTypes.func,
  setDashMode: PropTypes.func,
  type: PropTypes.number,
};
