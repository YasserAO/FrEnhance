import PropTypes from "prop-types";
import { textSaveForm } from "../../forms/textSave.mjs";

export const SaveText = ({ text }) => {
  const handleclick = async (e) => {
    e.target.disabled = true;
    let savedText;
    try {
      savedText = await textSaveForm(text.title, text.text);
    } catch (err) {
      console.log(err);
    }
    if (savedText.status == 200) return;
    console.log(savedText.msg);
    e.target.disabled = false;
  };
  return (
    <button
      onClick={(e) => {
        handleclick(e);
      }}
      className="rounded-sm bg-green-600 px-5 py-1 font-semibold text-white shadow-sm transition-all duration-200 active:scale-95 active:bg-green-700 disabled:bg-green-300 disabled:active:scale-100"
    >
      Save
    </button>
  );
};

SaveText.propTypes = {
  text: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
};
