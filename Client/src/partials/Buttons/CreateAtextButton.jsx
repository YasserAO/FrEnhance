import { MdOutlineCreateNewFolder } from "react-icons/md";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
export const CreateAtextButton = ({
  toggleForm,
  setToggleForm,
  setDashMode,
}) => {
  return (
    !toggleForm && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => {
          setDashMode(1);
          setToggleForm((prev) => !prev);
        }}
        className="group mx-auto mt-5 flex h-60 w-60 cursor-pointer select-none flex-col items-center justify-center overflow-hidden rounded-lg border-4 border-gray-300"
      >
        <h1 className="groupe-hov text-md select-none font-semibold text-gray-400">
          Create a Text
        </h1>
        <MdOutlineCreateNewFolder
          size={"3rem"}
          className="text-gray-400 transition-all duration-100 group-hover:scale-105 group-active:scale-110"
        />
      </motion.div>
    )
  );
};

CreateAtextButton.propTypes = {
  toggleForm: PropTypes.any,
  setToggleForm: PropTypes.func,
  setDashMode: PropTypes.func,
};
