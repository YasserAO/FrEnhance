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
    <div className="select-none px-4 md:hidden">
      <div className="mb-3 mt-4 flex flex-col gap-2">
        <button
          onClick={() => {
            setMobileShowMore((prev) =>
              prev === myTexts.length ? 0 : myTexts.length,
            );
            setTextMenuToggle((prev) => !prev);
          }}
          className="flex w-full items-center justify-between rounded-xl bg-slate-900 px-4 py-2.5 text-white transition-all hover:bg-slate-950"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-200">
            Recent Texts ({myTexts.length})
          </span>
          <div className="flex items-center gap-1.5 text-xs text-sky-400">
            <span>{textMenuToggle ? "Hide" : "Show"}</span>
            <div
              className={`${mobileShowMore !== myTexts.length && "-scale-y-100"} transition-transform duration-200`}
            >
              <FaAnglesUp size="0.75rem" />
            </div>
          </div>
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-200 ${
          textMenuToggle ? "max-h-[350px] overflow-y-auto pb-4" : "max-h-0"
        }`}
      >
        <AnimatePresence>
          {emptyText || myTexts.length === 0 ? (
            <p className="rounded-lg border border-dashed border-slate-700 p-4 text-center text-xs text-slate-400">
              Your list is empty. Generate a text to get started!
            </p>
          ) : (
            myTexts.map((element, index) => (
              <motion.div
                onClick={() => {
                  navigate("readmode/" + element.id);
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={element.id || index}
                className="mb-2 cursor-pointer select-none rounded-xl border border-slate-700/60 bg-slate-900/60 p-3 transition-colors hover:border-sky-500 hover:bg-slate-900"
              >
                <h2 className="text-xs font-semibold text-white">
                  {extract(element.title, 6)}
                </h2>
                <p className="mt-0.5 text-[11px] text-slate-400 line-clamp-1">
                  {extract(element.text?.[0] || "", 10)}
                </p>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
TextLabelsMobile.propTypes = {
  myTexts: PropTypes.array,
};
