import { useContext, useState } from "react";
import fetchExplain from "../../forms/explainWord.mjs";
import { motion, AnimatePresence } from "framer-motion";
import SpinLoad from "../icons/spindLoader";
import { AuthContext } from "../../authProvider";

export const ExplainWindow = ({
  selectedText,
  anchor,
  setSelectedText,
  setExplainMenuToggle,
}) => {
  const { fetchCoins, config } = useContext(AuthContext);
  const explainCost = config?.explain ?? 10;
  const [explained, setExplained] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [explanation, setExplanation] = useState("");
  const [examples, setExamples] = useState([]);

  const handleExplanation = async () => {
    setExplained(false);
    setErrorMsg("");
    setLoading(true);
    try {
      const data = await fetchExplain(selectedText, anchor);
      if (data && data.status === 200 && data.content) {
        fetchCoins();
        setExplanation(data.content.explanation || "");
        setExamples(data.content.examples || []);
        setExplained(true);
      } else {
        setErrorMsg(data?.msg || "Could not generate explanation");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to connect to explanation service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-700/80 bg-slate-800 p-6 shadow-2xl">
        <button
          onClick={() => {
            setExplainMenuToggle(false);
            setSelectedText("");
          }}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
          aria-label="Close"
        >
          ✕
        </button>

        <h3 className="mb-3 text-lg font-bold text-white">
          Explain French Word / Phrase
        </h3>

        <div className="mb-4 rounded-xl border border-slate-700 bg-slate-900/80 p-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Selected:
          </p>
          <p className="mt-1 text-base font-medium text-amber-300">
            "{selectedText}"
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
            {errorMsg}
          </div>
        )}

        {explained && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Explanation:
              </h4>
              <p className="mt-1 rounded-xl border border-slate-700/60 bg-slate-900/50 p-3 text-sm leading-relaxed text-slate-200">
                {explanation}
              </p>
            </div>

            {examples && examples.length > 0 && (
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Examples:
                </h4>
                <ul className="max-h-48 space-y-2 overflow-y-auto pr-1">
                  {examples.map((element, index) => (
                    <li
                      className="rounded-lg border border-slate-700/40 bg-slate-900/40 p-2.5 text-xs italic text-slate-300"
                      key={index}
                    >
                      • {element}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={() => {
              setExplainMenuToggle(false);
              setSelectedText("");
            }}
            className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
          >
            {explained ? "Done" : "Cancel"}
          </button>

          {!explained && (
            <button
              onClick={handleExplanation}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-sky-500 disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <SpinLoad />
                  <span>Explaining...</span>
                </div>
              ) : (
                <>
                  <span>Explain</span>
                  <div className="flex items-center gap-1 rounded bg-slate-900/60 px-1.5 py-0.5 text-xs text-amber-300">
                    <img
                      className="h-3 w-3"
                      src="/diamondIcon.png"
                      alt="coins"
                    />
                    <span>{explainCost}</span>
                  </div>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

