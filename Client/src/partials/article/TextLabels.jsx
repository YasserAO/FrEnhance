import { useEffect, useState } from "react";
import { textForm } from "../../forms/textGetForm.mjs";
import { extract } from "../../utils/textExtract.mjs";
import { FaAnglesUp } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
export const TextLabels = () => {
  const [myTexts, setMyTexts] = useState([]);
  const [showMore, setShowMore] = useState(4);
  const getTexts = async () => {
    let texts;
    try {
      texts = await textForm();
    } catch (err) {
      console.log(err);
    }
    if (texts.status == 200) {
      setMyTexts(texts.content);
    } else console.log(texts);
  };
  useEffect(() => {
    getTexts();
  }, []);

  return (
    <div>
      <div className="mb-2 flex">
        <button
          onClick={() => setShowMore((prev) => prev - 1)}
          className={`mx-auto block rounded-sm bg-gray-900 px-2 py-1 text-white ${showMore < 3 && `pointer-events-none opacity-0`}`}
        >
          <FaAnglesUp></FaAnglesUp>
        </button>
        <button
          onClick={() => setShowMore((prev) => prev + 1)}
          className={`mx-auto block rotate-180 rounded-sm bg-gray-900 px-2 py-1 text-white ${showMore == myTexts.length && `pointer-events-none opacity-0`}`}
        >
          <FaAnglesUp></FaAnglesUp>
        </button>
      </div>
      <div className="max-h-[500px] overflow-hidden overflow-y-auto">
        <AnimatePresence>
          {myTexts
            .map((element, index) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={index}
                className="mb-3 cursor-pointer select-none overflow-hidden rounded-sm bg-slate-400 px-1 py-1"
              >
                <h2 className="font-semibold">
                  {extract(element.title, 2)}...
                </h2>
                <p className="text-sm">{extract(element.text, 5)}...</p>
              </motion.div>
            ))
            .filter((element, index) => index < showMore)}
        </AnimatePresence>
      </div>
    </div>
  );
};
