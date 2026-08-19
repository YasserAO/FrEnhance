import { useEffect, useState } from "react";

import { extract } from "../../utils/textExtract.mjs";
import { FaAnglesUp } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
export const TextLabels = ({
  emptyText,
  displayShowMore,
  showMore,
  setShowMore,
  readMode,
  myTexts,
}) => {
  const navigate = useNavigate();

  return (
    <>
      {/* DesktopVersion */}
      <div className="">
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
              <motion.p
                initial={{ opacity: 0, height: "0px" }}
                animate={{ opacity: 1, height: "50px" }}
                exit={{ opacity: 0, height: "0px" }}
                className="overflow-hidden text-center text-base font-semibold text-gray-500"
              >
                Your list is Empty please Generate a text
              </motion.p>
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
                    className={`g-slate-400 mb-3 cursor-pointer select-none overflow-hidden rounded-sm bg-slate-400 px-1 py-1 transition-all duration-150`}
                  >
                    <h2 className="font-semibold">
                      {extract(element.title, readMode ? 30 : 5)}
                    </h2>
                    <p className="text-sm">
                      {extract(element.text[0], readMode ? 50 : 5)}
                    </p>
                  </motion.div>
                ))
                .filter((element, index) => index < showMore)
            )}
          </AnimatePresence>
        </div>
        {readMode ? (
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="btn absolute bottom-4 right-1/2 mx-auto block translate-x-1/2 bg-red-500 py-1"
          >
            Exit
          </button>
        ) : (
          <button
            onClick={() => {
              navigate("readmode");
            }}
            className="btn absolute bottom-4 right-1/2 mx-auto block translate-x-1/2 bg-slate-900 py-1"
          >
            ReadAll
          </button>
        )}
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
