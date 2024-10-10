import { useState } from "react";
import fetchText from "../../forms/textGenerate.mjs";
import SpinLoad from "../../partials/icons/spindLoader";
import { motion } from "framer-motion";
import { DifficultyMenu } from "../../partials/menus/DifficultyMenu";
import { SaveText } from "../../partials/Buttons/SaveText";
import { DeleteGen } from "../../partials/Buttons/DeleteGen.jsx";
import PropTypes from "prop-types";
import { useNavigate, useOutletContext } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import { IoIosReturnLeft } from "react-icons/io";

export const CreateAText = () => {
  const { setDbupdateToggle, dbupdateToggle } = useOutletContext();
  const [myText, setText] = useState({
    title: "",
    text: "",
  });
  const navigate = useNavigate();
  const [textLoading, setTextLoading] = useState(false);
  const [theme, setTheme] = useState("");
  const [level, setLevel] = useState(1);
  const [emptyField, setEmptyField] = useState(true);
  const levels = ["A", "B", "C"];

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex h-full flex-grow flex-col"
    >
      <div className="flex h-9 w-full justify-center gap-3 bg-gray-100">
        <button
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <IoIosReturnLeft size={"100%"}></IoIosReturnLeft>
        </button>

        {!emptyField && (
          <>
            <SaveText
              dbupdateToggle={dbupdateToggle}
              setDbupdateToggle={setDbupdateToggle}
              text={myText}
            ></SaveText>
            <DeleteGen setEmptyField={setEmptyField}></DeleteGen>
          </>
        )}
      </div>
      <h2
        className={`flex ${emptyField ? `h-0` : `h-14`} items-center justify-center overflow-hidden border-b bg-white text-center font-semibold`}
      >
        {myText.title}
      </h2>
      <div
        className={`mb-20 overflow-y-auto bg-white ${emptyField ? `h-0` : `h-[calc(100svh-(36px+80px+56px+56px))] sm:max-h-[600px]`} transition-all duration-1000`}
      >
        {!emptyField && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="px-3"
            >
              {myText.text.split("\n").map((para, index) => (
                <p className="mb-4" key={index}>
                  <span className="inline-block w-4"></span> {para}
                </p>
              ))}
            </motion.div>
          </>
        )}
      </div>

      <form
        className={`absolute bottom-0 right-0 flex h-20 w-full flex-col justify-center border-t border-gray-400 bg-gray-100 px-3 drop-shadow-sm transition-all duration-100 sm:rounded-md sm:border-none sm:bg-gray-50`}
        onSubmit={handleSubmit}
      >
        <div>
          <div className="flex items-center gap-2">
            <DifficultyMenu
              selectedIndex={level}
              setSelectedIndex={setLevel}
            ></DifficultyMenu>

            <textarea
              className="w-full resize-none rounded-lg bg-gray-200 px-2 py-1 outline-none"
              placeholder="Ex: Le changement climatique"
              required
              value={theme}
              type="text"
              onChange={(e) => setTheme(e.target.value)}
            />
            <div className="flex w-10 items-center justify-center overflow-hidden">
              {textLoading ? (
                <SpinLoad />
              ) : (
                <button>
                  <IoSend />
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

CreateAText.propTypes = {
  setDashMode: PropTypes.func,
};
