import { useState } from "react";

import { extract } from "../../utils/textExtract.mjs";
import { FaAnglesUp } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { AuthContext } from "../../authProvider";
export const TextLabels = ({
  emptyText,
  setDisplayShowMore,
  displayShowMore,
  showMore,
  setShowMore,
  readMode,
  labelInHand,
  setReadMode,
  setLabelInHand,

  myTexts,
}) => {
  const [mobileShowMore, setMobileShowMore] = useState(0);
  const [textMenuToggle, setTextMenuToggle] = useState(false);

  const handleTextInHand = (index) => {
    setLabelInHand(index);
  };

  return (
    <>
      {/* DesktopVersion */}
      <div className="hidden md:block">
        {displayShowMore && (
          <div className="mb-2 flex justify-center">
            <button
              onClick={() => setShowMore((prev) => prev - 1)}
              className={`mx-auto block rounded-sm bg-gray-900 px-2 py-1 text-white ${showMore <= 2 && `pointer-events-none opacity-0`}`}
            >
              <FaAnglesUp></FaAnglesUp>
            </button>
            <p className="w-20 select-none text-center font-semibold text-white transition">
              {showMore} / {myTexts.length}
            </p>
            <button
              onClick={() => setShowMore((prev) => prev + 1)}
              className={`mx-auto block rotate-180 rounded-sm bg-gray-900 px-2 py-1 text-white ${showMore == myTexts.length && `pointer-events-none opacity-0`}`}
            >
              <FaAnglesUp></FaAnglesUp>
            </button>
          </div>
        )}
        <div className="max-h-[600px] overflow-hidden overflow-y-auto">
          <AnimatePresence>
            {emptyText ? (
              <p>Your list is Empty please Generate a text</p>
            ) : (
              myTexts
                .map((element, index) => (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={index}
                    onClick={() => {
                      handleTextInHand(index);
                      setReadMode(true);
                    }}
                    className={`mb-3 cursor-pointer select-none overflow-hidden rounded-sm px-1 py-1 ${readMode ? (labelInHand == index ? `bg-white` : `bg-slate-500`) : `bg-slate-400`} transition-all duration-150`}
                  >
                    <h2 className="font-semibold">
                      {extract(element.title, 2)}...
                    </h2>
                    <p className="text-sm">{extract(element.text, 5)}...</p>
                  </motion.div>
                ))
                .filter((element, index) => index < showMore)
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile */}
      <div className="select-none md:hidden">
        <div className="mb-2 mt-5 flex flex-col justify-center gap-1">
          <div className="mx-auto w-[90%] rounded-sm bg-slate-900 px-9 py-2">
            <h1 className="text-center text-white">My recent Text</h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={textMenuToggle ? 0 : 1}
              className="text-center text-sm font-semibold text-gray-500"
            >
              {textMenuToggle ? `Show  Less` : `Show More`}
            </motion.p>
          </div>
          <button
            onClick={() => {
              setMobileShowMore((prev) =>
                prev == myTexts.length ? 0 : myTexts.length,
              );
              setTextMenuToggle((prev) => !prev);
            }}
            className={`mx-auto block rounded-sm bg-gray-900 px-10 py-1 text-white`}
          >
            <div
              className={` ${mobileShowMore !== myTexts.length && `-scale-y-100`} transition-all duration-200`}
            >
              <FaAnglesUp></FaAnglesUp>
            </div>
          </button>
        </div>

        <div
          className={`min-h-0 overflow-hidden overflow-y-auto px-3 transition-all ${textMenuToggle ? `max-h-[300px]` : `max-h-0`} `}
        >
          <AnimatePresence>
            {myTexts
              .map((element, index) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={index}
                  onClick={() => {
                    handleTextInHand(index);
                    setReadMode(true);
                  }}
                  className={`mb-3 cursor-pointer select-none overflow-hidden rounded-sm px-1 py-1 ${readMode ? (labelInHand == index ? `bg-white` : `bg-slate-500`) : `bg-slate-400`} transition-all duration-150`}
                >
                  <h2 className="font-semibold">
                    {extract(element.title, 2)}...
                  </h2>
                  <p className="text-sm">{extract(element.text, 5)}...</p>
                </motion.div>
              ))
              .filter((element, index) => index < mobileShowMore)}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};
TextLabels.propTypes = {
  setReadMode: PropTypes.func,
  setLabelInHand: PropTypes.func,
};

TextLabels.propTypes = {
  showMore: PropTypes.any,
  setShowMore: PropTypes.func,
  readMode: PropTypes.any,
  labelInHand: PropTypes.any,
  setReadMode: PropTypes.func,
  setLabelInHand: PropTypes.func,
  setMyTexts: PropTypes.func,
  myTexts: PropTypes.array,
};
