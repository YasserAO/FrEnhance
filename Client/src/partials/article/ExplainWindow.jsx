import { useState } from "react";
import fetchExplain from "../../forms/explainWord.mjs";
import { motion, AnimatePresence } from "framer-motion";
import SpinLoad from "../icons/spindLoader";

export const ExplainWindow = ({
  selectedText,
  anchor,
  setSelectedText,
  setExplainMenuToggle,
}) => {
  const [explained, setExplained] = useState(false);
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [examples, setExamples] = useState([]);

  const handleExplanation = async () => {
    setExplained(false);
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await fetchExplain(selectedText, anchor);
        return data.content;
      } catch (err) {
        console.error(err.message);
        return null;
      }
    };

    const myData = await fetchData();
    if (myData == null) {
      console.log("No Data");
    } else {
      setExplanation(myData.explanation);
      setExamples(myData.examples);
      setExplained(true);
    }
    setLoading(false);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="transpare fixed right-0 top-0 z-50 flex h-full w-full items-center justify-center rounded-md bg-slate-900 bg-opacity-30 backdrop-blur-sm sm:absolute"
    >
      <div className="relative w-full max-w-80 rounded-md bg-white px-4 pb-16 sm:max-w-[500px]">
        <button
          onClick={() => {
            setExplainMenuToggle(false);
            setSelectedText("");
          }}
          className="absolute right-0 top-0 hidden h-10 w-10 scale-50 opacity-50 sm:block"
        >
          <span className="absolute block h-1 w-full rotate-45 bg-black"></span>
          <span className="absolute block h-1 w-full -rotate-45 bg-black"></span>
        </button>

        {explained && (
          <motion.div
            initial={{ opacity: 0, maxHeight: 0 }}
            animate={{ opacity: 1, maxHeight: 500 }}
            exit={{ opacity: 0, maxHeight: 0 }}
            className=""
          >
            <div className="mt-10">
              <h2 className="mb-2 text-center font-semibold">
                Explanation of :{" "}
                <span className="rounded-md bg-gray-200 px-1 py-1">
                  {selectedText}
                </span>
              </h2>
              <p className="text-md mx-auto w-fit rounded-md bg-slate-100 px-2 py-1">
                {explanation}
              </p>
            </div>
            <div>
              <h2 className="my-2 font-semibold ">Examples :</h2>
              <ul className="max-h-52 list-inside list-disc overflow-y-auto py-2  ">
                {examples.map((element, index) => (
                  <li
                    className="text-md mx-auto mb-2 flex-grow rounded-md bg-slate-100 px-2 py-1 last:mb-0"
                    key={index + 1}
                  >
                    {element}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {!explained && (
          <p className="text-md mx-auto mt-10 w-fit rounded-md bg-slate-100 px-2 py-1 font-semibold">
            {selectedText}
          </p>
        )}
        <div className="absolute bottom-2 right-1/2 flex translate-x-1/2 gap-2">
          {loading ? (
            <div className="h-10">
              <SpinLoad />
            </div>
          ) : (
            !explained && <button
            onClick={() => {
              handleExplanation();
            }}
            className="h-10 w-20 rounded-sm bg-sky-500 font-semibold text-white"
          >
            Explain
          </button>
          )}
          {!loading && <button
            onClick={() => {
              setExplainMenuToggle(false);
              setSelectedText("");
            }}
            className="h-10 w-20 rounded-sm bg-red-500 font-semibold text-white active:scale-105 sm:hidden"
          >
            Exit
          </button>}
          
        </div>
      </div>
    </motion.div>
  );
};
