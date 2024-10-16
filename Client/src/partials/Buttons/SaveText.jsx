import PropTypes from "prop-types";
import { textSaveForm } from "../../forms/textSave.mjs";
import { IoIosSave } from "react-icons/io";

export const SaveText = ({ text, setDbupdateToggle, dbupdateToggle }) => {
  const handleclick = async (e) => {
    e.target.disabled = true;
    let savedText;
    try {
      savedText = await textSaveForm(text.title, text.text);
    } catch (err) {
      console.log(err);
    }
    if (savedText.status == 200) {
      setDbupdateToggle((prev) => !prev);
      console.log(dbupdateToggle);
      return;
    }
    console.log(savedText.msg);
    e.target.disabled = false;
  };
  return (
    <button
      onClick={(e) => {
        handleclick(e);
      }}
      className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 p-1 font-semibold text-white shadow-sm transition-all duration-200 active:scale-95 active:bg-green-700 disabled:bg-green-300 disabled:active:scale-100"
    >
      <IoIosSave size={"1.5rem"} />
    </button>
  );
};

SaveText.propTypes = {
  text: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
  setDbupdateToggle: PropTypes.func,
  dbupdateToggle: PropTypes.bool,
};
