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
      className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 font-semibold text-white shadow-sm transition-all duration-200 active:scale-95 active:bg-red-700"
    >
      <FaDeleteLeft size={"1.5rem"} />
    </button>
  );
};

DeleteGen.propTypes = {
  setEmptyField: PropTypes.func,
};
