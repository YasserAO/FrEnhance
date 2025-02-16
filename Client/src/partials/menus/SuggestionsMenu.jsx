import { FaPlus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useClickOutside from "../../utils/closeMenu";

export const SuggestionsMenu = ({
  buttonRef,
  listMenu,
  setSuggestions,
  setListMenu,
  suggestions,
}) => {
  const [suggestion, setSuggestion] = useState("");
  const popupRef = useRef(null);
  const inputRef = useRef();

  useClickOutside(popupRef, () => setListMenu(false), buttonRef);
  return (
    <AnimatePresence>
      {listMenu && (
        <motion.div
          ref={popupRef}
          initial={{ opacity: 1, y: -30 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute bottom-full flex h-fit w-56 select-none flex-col gap-5 overflow-hidden rounded-md bg-green-200 px-2 py-3 shadow-lg"
        >
          <button
            type="button"
            disabled={!listMenu}
            onClick={() => {
              const idRandom = Math.floor(Math.random() * 10e5);
              setListMenu(false);
              setSuggestions((prev) => [
                ...prev,
                { id: idRandom, text: "Refine the text" },
              ]);
            }}
            className="flex h-10 cursor-pointer items-center justify-center rounded-full bg-green-100 px-1 font-semibold text-green-800"
          >
            Refine the text
          </button>

          <button
            type="button"
            onClick={() => {
              const idRandom = Math.floor(Math.random() * 10e5);
              setListMenu(false);
              setSuggestions((prev) => [
                ...prev,
                { id: idRandom, text: "Change title" },
              ]);
            }}
            className="flex h-10 cursor-pointer items-center justify-center rounded-full bg-green-100 px-1 font-semibold text-green-800"
          >
            Change Title
          </button>
          <input
            key={9092}
            onKeyUp={(e) => {
              if (e.key !== "Enter") return;
              const temp = e.target.value;
              const idRandom = Math.floor(Math.random() * 10e5);

              setSuggestions((prev) => {
                const newArr = [...prev, { id: idRandom, text: temp }];
                return newArr;
              });
              setSuggestion("");

              setListMenu(false);
            }}
            onChange={(e) => {
              setSuggestion(e.target.value);
            }}
            value={suggestion}
            placeholder="Type here . . ."
            type="text"
            className="h-10 w-full resize-none bg-green-200 px-1 font-semibold text-green-600 outline-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
