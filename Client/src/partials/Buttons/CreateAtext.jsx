import { useState } from "react";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import fetchText from "../../forms/textGenerate.mjs";
import SpinLoad from "../icons/spindLoader";
import { motion } from "framer-motion";

export const CreateAText = () => {
  const [myText, setText] = useState({
    title: "",
    text: "",
  });
  const [textLoading, setTextLoading] = useState(false);
  const [theme, setTheme] = useState("");
  const [level, setLevel] = useState("2");
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
    <div className="pt-5">
      <div className="group mx-auto flex h-60 w-full max-w-60 origin-top cursor-pointer select-none flex-col items-center justify-center overflow-hidden rounded-lg border-4 border-gray-300">
        <h1 className="groupe-hov text-md select-none font-semibold text-gray-400">
          Create a Text
        </h1>
        <MdOutlineCreateNewFolder
          size={"3rem"}
          className="text-gray-400 transition-all duration-100 group-hover:scale-105 group-active:scale-110"
        />
      </div>

      <form
        className="mx-4 mb-5 h-fit rounded-md border-2 border-gray-400 bg-gray-50 px-2 py-5 shadow-sm md:mx-[10%]"
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

          <div className="w-full rounded-lg bg-slate-200 px-4 py-4">
            <p>Difficulty Level</p>
            <select
              value={level}
              required
              name="difficulty"
              id=""
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="1">Basic</option>
              <option value="2">Medium</option>
              <option value="3">Advanced</option>
            </select>
          </div>
        </div>
        {textLoading ? (
          <div className="mx-auto mt-5 w-fit">
            <SpinLoad></SpinLoad>
          </div>
        ) : (
          <button className="mx-auto mt-5 block rounded-sm bg-slate-500 px-1 py-1 font-semibold text-white active:bg-slate-700">
            Generate
          </button>
        )}
      </form>

      <div
        className={`flex items-center justify-center bg-white px-5 transition-all duration-100 md:mx-[10%] ${emptyField ? `max-h-0 min-h-0` : `max-h-[2000px] min-h-[200px] py-3`} overflow-hidden`}
      >
        {!emptyField && (
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
            <div className="mt-5 flex justify-center gap-3">
              <button className="rounded-sm bg-green-600 px-5 py-1 font-semibold text-white shadow-sm transition-all duration-200 active:scale-95 active:bg-green-700">
                Save
              </button>
              <button
                onClick={DeleteText}
                className="rounded-sm bg-red-600 px-5 py-1 font-semibold text-white shadow-sm transition-all duration-200 active:scale-95 active:bg-red-700"
              >
                Clear
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
