import PropTypes from "prop-types";
import { extract } from "../../utils/textExtract.mjs";
import { FaAnglesUp } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const TextLabelsMobile = ({ emptyText, readMode, myTexts }) => {
  const [mobileShowMore, setMobileShowMore] = useState(0);
  const [textMenuToggle, setTextMenuToggle] = useState(false);
  const navigate = useNavigate();
  return (
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
          {emptyText ? (
            <p className="text-center text-base font-semibold text-gray-500">
              Your list is Empty please Generate a text
            </p>
          ) : (
            myTexts
              .map((element, index) => (
                <motion.div
                  onClick={() => {
                    navigate("readmode/" + element.id);
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={index}
                  className={`mb-3 cursor-pointer select-none overflow-hidden rounded-sm bg-slate-400 px-1 py-1 transition-all duration-150`}
                >
                  <h2 className="font-semibold">
                    {extract(element.title, 2)}...
                  </h2>
                  <p className="text-sm">{extract(element.text[0], 5)}...</p>
                </motion.div>
              ))
              .filter((element, index) => index < mobileShowMore)
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
TextLabelsMobile.propTypes = {
  myTexts: PropTypes.array,
};
