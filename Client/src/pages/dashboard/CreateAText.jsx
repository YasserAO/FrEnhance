import { useState } from "react";
import { TextToolButton } from "../../partials/Buttons/TextToolButton";
import fetchText from "../../forms/textGenerate.mjs";
import SpinLoad from "../../partials/icons/spindLoader";
import { motion } from "framer-motion";
import { DifficultyMenu } from "../../partials/menus/DifficultyMenu";
import { SaveText } from "../../partials/Buttons/SaveText";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const CreateAText = ({ setDbupdateToggle }) => {
  const [myText, setText] = useState({
    title: "",
    text: "",
  });
  const navigate = useNavigate();
  const [textLoading, setTextLoading] = useState(false);
  const [theme, setTheme] = useState("");
  const [level, setLevel] = useState(1);
  const [emptyField, setEmptyField] = useState(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTextLoading(true);
    setEmptyField(true);
    const data = await fetchText(theme, level);
    if (!(data.status == 200)) {
      console.log(data.content);
      setTextLoading(false);

      return;
    }
    setEmptyField(false);
    const text = JSON.parse(data.content);
    setText(text);

    setTextLoading(false);
    setEmptyField(false);
  };
  const DeleteText = () => {
    setEmptyField(true);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <form
        className={`mx-4 mb-5 rounded-md border-2 border-gray-400 bg-gray-50 px-2 py-5 shadow-sm transition-all duration-100`}
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center justify-center gap-5 sm:flex-row md:justify-center">
          <div className="w-full rounded-lg bg-slate-200 px-4 py-4">
            <p>Theme:</p>
            <div className="flex h-8 w-full items-center overflow-hidden rounded-sm bg-slate-700 pl-2">
              <input
                className="h-full w-full bg-transparent text-white outline-none"
                placeholder="Ex: Le changement climatique"
                required
                value={theme}
                type="text"
                onChange={(e) => setTheme(e.target.value)}
              />
            </div>
          </div>

          {/* Difficulty Select for Desktop */}
          <div className="hidden w-full rounded-lg bg-slate-200 px-4 py-4 sm:block">
            <p>Difficulty Level :</p>
            <DifficultyMenu
              selectedIndex={level}
              setSelectedIndex={setLevel}
            ></DifficultyMenu>
          </div>

          {/* Difficulty select for Mobile */}
          <div className="w-full rounded-lg bg-slate-200 px-4 py-4 sm:hidden">
            <p>Difficulty Level</p>

            <select
              className="outline-non w-full bg-slate-700 py-2 text-white"
              value={level}
              required
              name="difficulty"
              id=""
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value={0}>Basic</option>
              <option value={1}>Medium</option>
              <option value={2}>Advanced</option>
            </select>
          </div>
        </div>
        {textLoading ? (
          <div className="mx-auto mt-5 w-fit">
            <SpinLoad></SpinLoad>
          </div>
        ) : (
          <div className="mt-3 flex justify-center gap-3">
            <button
              type="submit"
              className="block w-20 rounded-sm bg-slate-500 font-semibold text-white active:bg-slate-700"
            >
              Generate
            </button>
            <button
              className="block w-20 rounded-sm bg-red-500 font-semibold text-white active:bg-slate-700"
              onClick={() => {
                navigate("/dashboard");
              }}
              type="button"
            >
              Cancel
            </button>
          </div>
        )}
      </form>

      {/* Output Text Field */}
      <div
        className={`mx-5 flex justify-center bg-white px-5 transition-all duration-100 ${emptyField ? `max-h-0 min-h-0` : `max-h-[500px] min-h-[200px] py-3`} overflow-y-auto`}
      >
        {!emptyField && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="mb-2 font-semibold">{myText.title}</h2>
              {myText.text.split("\n").map((para, index) => (
                <p className="mb-4" key={index}>
                  <span className="inline-block w-4"></span> {para}
                </p>
              ))}
            </motion.div>
          </>
        )}
      </div>
      {!emptyField && (
        <div className="mt-2 flex justify-center gap-3">
          <SaveText
            setDbupdateToggle={setDbupdateToggle}
            text={myText}
          ></SaveText>
          <button
            onClick={() => {
              DeleteText();
            }}
            className="rounded-sm bg-red-600 px-5 py-1 font-semibold text-white shadow-sm transition-all duration-200 active:scale-95 active:bg-red-700"
          >
            Clear
          </button>
        </div>
      )}
    </motion.div>
  );
};

CreateAText.propTypes = {
  setDashMode: PropTypes.func,
};
