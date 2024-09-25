import { CiEdit } from "react-icons/ci";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
export const EditAtextButton = ({ toggleForm, setToggleForm, setDashMode }) => {
  return (
    !toggleForm && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => {
          setDashMode(2);
          setToggleForm((prev) => !prev);
        }}
        className="group mx-auto mt-5 flex h-60 w-60 cursor-pointer select-none flex-col items-center justify-center overflow-hidden rounded-lg border-4 border-gray-300"
      >
        <h1 className="groupe-hov text-md select-none font-semibold text-gray-400">
          Edit a text
        </h1>
        <CiEdit
          size={"3rem"}
          className="text-gray-400 transition-all duration-100 group-hover:scale-105 group-active:scale-110"
        />
      </motion.div>
    )
  );
};
EditAtextButton.propTypes = {
  toggleForm: PropTypes.any,
  setToggleForm: PropTypes.func,
  setDashMode: PropTypes.func,
};
