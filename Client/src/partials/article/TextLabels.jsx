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
      <div className="flex h-full flex-col justify-between">
        {displayShowMore && myTexts.length > 0 && (
          <div className="mb-3 flex items-center justify-between px-1 text-xs text-slate-400">
            <button
              onClick={() => setShowMore((prev) => Math.max(1, prev - 1))}
              disabled={showMore <= 1}
              className="rounded bg-slate-900/80 p-1.5 text-slate-300 transition-colors hover:bg-slate-900 hover:text-white disabled:opacity-30"
              aria-label="Show fewer"
            >
              <FaAnglesUp size="0.75rem" />
            </button>
            <span className="font-medium tracking-wide">
              Showing {Math.min(showMore, myTexts.length)} of {myTexts.length}
            </span>
            <button
              onClick={() => setShowMore((prev) => Math.min(myTexts.length, prev + 1))}
              disabled={showMore >= myTexts.length}
              className="rotate-180 rounded bg-slate-900/80 p-1.5 text-slate-300 transition-colors hover:bg-slate-900 hover:text-white disabled:opacity-30"
              aria-label="Show more"
            >
              <FaAnglesUp size="0.75rem" />
            </button>
          </div>
        )}

        <div className="flex-1 min-h-0 space-y-2.5 overflow-y-auto pr-1">
          <AnimatePresence>
            {emptyText || myTexts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-xl border border-dashed border-slate-700 p-6 text-center text-xs text-slate-400"
              >
                No saved texts yet. Create or generate a new text to get started!
              </motion.div>
            ) : (
              myTexts
                .slice(0, showMore)
                .map((element, index) => (
                  <motion.div
                    onClick={() => {
                      navigate("readmode/" + element.id);
                    }}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    key={element.id || index}
                    className="group cursor-pointer select-none rounded-xl border border-slate-700/60 bg-slate-900/60 p-3 transition-all duration-150 hover:border-sky-500/80 hover:bg-slate-900 hover:shadow-md"
                  >
                    <h3 className="text-xs font-semibold text-white transition-colors group-hover:text-amber-300">
                      {extract(element.title, readMode ? 35 : 20)}
                    </h3>
                    <p className="mt-1 text-[11px] leading-relaxed text-slate-400 line-clamp-2">
                      {extract(element.text?.[0] || "", readMode ? 60 : 40)}
                    </p>
                  </motion.div>
                ))
            )}
          </AnimatePresence>
        </div>

        <div className="mt-3 pt-2">
          {readMode ? (
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="w-full rounded-xl bg-red-600/90 py-2.5 text-xs font-semibold text-white shadow transition-all hover:bg-red-500"
            >
              ← Exit Reading Mode
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("readmode");
              }}
              className="w-full rounded-xl bg-sky-600 py-2.5 text-xs font-semibold text-white shadow transition-all hover:bg-sky-500"
            >
              📖 Open Reader Mode
            </button>
          )}
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
