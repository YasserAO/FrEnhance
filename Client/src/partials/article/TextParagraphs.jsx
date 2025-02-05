import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRedo } from "react-icons/fa";

export const TextParagraphs = ({
  editParagraphMode,
  index,
  para,
  editedParagraph,
  setEditedParagraph,
  selectedTexts,
  setSelectedTexts,
  deletedTexts,
  setDeletedTexts,
}) => {
  // Exterior EditMODE STATES
  const [inputToggle, setInputToggle] = useState(false);
  const [trigger, setTrigger] = useState(false);

  // Interior EDIT MODE
  const paraRef = useRef();
  const [editMODE, setEditMODE] = useState(false);

  // Selected Texts Handler
  const [selected, setSelected] = useState(false);
  const [deleted, setDeleted] = useState(false);

  // Handl Selected Texts
  const handleText = (index, prev) => {
    console.log(prev);
    if (deletedTexts) {
      if (deletedTexts.includes(index)) return;
    }
    if (prev.length == 0) {
      console.log("Condition prev.length == 0 ");
      return [index];
    }
    if (prev.length == 1 && prev[0] == index) {
      console.log(" condition prev.length == 1 && prev[0] == index");
      return [];
    }

    if (prev.includes(index)) {
      console.log("Condition element == index ");
      return prev.filter((element) => element !== index);
    }

    return [...prev, index].sort((a, b) => a - b);
  };

  // Handle Deleted Texts
  const handleDeletedTexts = (index, prev) => {
    if (selectedTexts) {
      if (selectedTexts.includes(index))
        setSelectedTexts((prev2) => {
          const arr = handleText(index, prev2);
          return arr;
        });
    }
    if (prev.length == 0) {
      console.log("Condition prev.length == 0 ");
      return [index];
    }
    if (prev.length == 1 && prev[0] == index) {
      console.log(" condition prev.length == 1 && prev[0] == index");
      return [];
    }

    if (prev.includes(index)) {
      console.log("Condition element == index ");
      return prev.filter((element) => element !== index);
    }

    return [...prev, index].sort((a, b) => a - b);
  };

  useEffect(() => {
    if (!deletedTexts) return;
    const Trigger = deletedTexts.includes(index);
    if (Trigger) setDeleted(true);
    else setDeleted(false);
  }, [deletedTexts]);

  useEffect(() => {
    if (!selectedTexts) return;
    const Trigger = selectedTexts.includes(index);
    if (Trigger) setSelected(true);
    else setSelected(false);
  }, [selectedTexts]);

  useEffect(() => {
    if (editedParagraph == index) {
      setInputToggle((prev) => !prev);
    } else setInputToggle(false);
  }, [editedParagraph, trigger]);
  return editParagraphMode ? (
    editMODE ? (
      <div key={index} className={`mb-4 first:mt-4`}>
        <AnimatePresence>
          <motion.textarea
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              height: `${paraRef.current && paraRef.current.offsetHeight + 32}px`,
              boxShadow: `inset 0 0 10px 3px rgb(0,0,0,.15)`,
            }}
            className={`w-full resize-none bg-inherit px-6 py-2 outline-none`}
            defaultValue={para}
          ></motion.textarea>
        </AnimatePresence>
        <AnimatePresence>
          <motion.div
            className="mx-auto overflow-hidden rounded-md bg-slate-200 sm:w-1/2"
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 50, marginTop: 10 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex h-full items-center justify-center gap-3">
              <button
                onClick={() => {
                  setEditMODE(false);
                }}
                className="rounded-sm bg-green-500 px-2 py-1 font-semibold text-white"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditMODE(false);
                }}
                className="rounded-sm bg-red-500 px-2 py-1 font-semibold text-white"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    ) : (
      <div key={index} className="mb-4">
        <p
          ref={paraRef}
          onClick={() => {
            setEditedParagraph(index);
            setTrigger((prev) => !prev);
          }}
          className={`cursor-pointer select-none rounded-md transition selection:bg-amber-200 ${inputToggle ? (selected ? `bg-green-200` : `bg-gray-200`) : selected ? `bg-green-200` : `hover:bg-gray-100`} ${deleted && `text-d bg-red-200 opacity-70 hover:bg-red-300`}`}
        >
          <span className="inline-block w-4"></span> {para}
        </p>
        <AnimatePresence>
          {inputToggle && (
            <motion.div
              className="mx-auto overflow-hidden rounded-md bg-slate-200 sm:w-1/2"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 50, marginTop: 10 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="flex h-full items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setEditMODE(true);
                  }}
                  className="rounded-sm bg-blue-500 px-2 py-1 font-semibold text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setDeletedTexts((prev) => {
                      const arr = handleDeletedTexts(index, prev);
                      return arr;
                    });
                  }}
                  className="rounded-sm bg-red-500 px-2 py-1 font-semibold text-white"
                >
                  {deleted ? `Cancel` : `Delete`}
                </button>
                <button
                  disabled={deleted}
                  onClick={() => {
                    setSelectedTexts((prev) => {
                      const arr = handleText(index, prev);
                      console.log(arr);
                      return arr;
                    });
                  }}
                  className="rounded-sm bg-green-500 px-2 py-1 font-semibold text-white disabled:bg-green-300"
                >
                  {selected ? `Unselect` : `Select`}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  ) : (
    <p className="mb-4 selection:bg-amber-200" key={index}>
      <span className="inline-block w-4"></span> {para}
    </p>
  );
};
