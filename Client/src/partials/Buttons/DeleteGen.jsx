import PropTypes from "prop-types";
import { FaDeleteLeft } from "react-icons/fa6";
export const DeleteGen = ({ setEmptyField }) => {
  const DeleteText = () => {
    setEmptyField(true);
  };
  return (
    <button
      onClick={() => {
        DeleteText();
      }}
      className="p1 h-8 w-8 rounded-lg bg-red-600 font-semibold text-white shadow-sm transition-all duration-200 active:scale-95 active:bg-red-700"
    >
      <FaDeleteLeft size={"100%"} />
    </button>
  );
};

DeleteGen.propTypes = {
  setEmptyField: PropTypes.func,
};
