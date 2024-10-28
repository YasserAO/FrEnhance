import PropTypes from "prop-types";
import { RiTranslate2 } from "react-icons/ri";
export const Translate = ({ selectedText, setExplainMenuToggle }) => {
  return (
    <button
      onClick={() => {
        const selection = document.getSelection();
        setExplainMenuToggle(true);
        selection.empty();
      }}
    >
      <RiTranslate2 size={"1.5rem"} />
    </button>
  );
};

Translate.propTypes = {
  selectedText: PropTypes.string,
  setExplainMenuToggle: PropTypes.func,
};
