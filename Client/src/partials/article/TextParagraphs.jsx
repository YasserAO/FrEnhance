import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const TextParagraphs = ({
  editParagraphMode,
  index,
  para,
  editedParagraph,
  setEditedParagraph,
}) => {
  const [inputToggle, setInputToggle] = useState(false);
  const [trigger, setTrigger] = useState(false);
  useEffect(() => {
    if (editedParagraph == index) {
      setInputToggle((prev) => !prev);
    } else setInputToggle(false);
  }, [editedParagraph, trigger]);

  return editParagraphMode ? (
    <div key={index} className="mb-4">
      <p
        onClick={() => {
          setEditedParagraph(index);
          setTrigger((prev) => !prev);
        }}
        className={`cursor-pointer select-none transition selection:bg-amber-200 hover:bg-gray-200 ${inputToggle && `bg-gray-200`}`}
      >
        <span className="inline-block w-4"></span> {para}
      </p>
      {inputToggle && (
        <motion.div
          className="overflow-hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "50px" }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <input
            type="text"
            className="w-full border-none bg-gray-400 p-0 outline-none"
          />
        </motion.div>
      )}
    </div>
  ) : (
    <p className="mb-4 selection:bg-amber-200" key={index}>
      <span className="inline-block w-4"></span> {para}
    </p>
  );
};
