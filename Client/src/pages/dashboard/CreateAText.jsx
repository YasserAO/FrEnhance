import { useState } from "react";
import fetchText from "../../forms/textGenerate.mjs";
import SpinLoad from "../../partials/icons/spindLoader";
import { motion } from "framer-motion";
import { DifficultyMenu } from "../../partials/menus/DifficultyMenu";
import { SaveText } from "../../partials/Buttons/SaveText";
import { DeleteGen } from "../../partials/Buttons/DeleteGen.jsx";
import PropTypes from "prop-types";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import { IoIosReturnLeft } from "react-icons/io";
import { loadEditedText } from "../../forms/loadEditedText.mjs";

export const EditedTextLoader = async () => {
  async function textHandler() {
    try {
      const response = await loadEditedText();
      if (!response) return null;
      if (response.status == 200) return response.content;
      else if (response.status == 404) throw Error("Text was not Found");
      else if (response.status == 500) throw Error("Error Happened");
    } catch (err) {
      console.error(err.message);
      return null;
    }
  }
  const Content = await textHandler();
  if (Content) {
    console.log(Content);
    return Content;
  }
  return null;
};

export const CreateAText = () => {
  const content = useLoaderData();
  const { setDbupdateToggle, dbupdateToggle } = useOutletContext();
  const [myText, setMyText] = useState({
    title: "",
    text: "",
  });
  const navigate = useNavigate();
  const [textLoading, setTextLoading] = useState(false);
  const [theme, setTheme] = useState("");
  const [level, setLevel] = useState(1);
  const [emptyField, setEmptyField] = useState(true);

  useState(() => {
    if (content) {
      setEmptyField(false);
      setMyText(content);
    }
  }, [content]);

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
    setMyText(text);

    setTextLoading(false);
    setEmptyField(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative flex h-full flex-grow flex-col"
    >
      <div className="flex h-10 w-full gap-3 overflow-hidden bg-gray-100 px-2">
        <div className="w-1/2">
          <button
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            <IoIosReturnLeft size={"2.5rem"}></IoIosReturnLeft>
          </button>
        </div>

        {!emptyField && (
          <div className="flex w-1/2 items-center justify-end gap-3">
            <SaveText
              dbupdateToggle={dbupdateToggle}
              setDbupdateToggle={setDbupdateToggle}
              text={myText}
            ></SaveText>
            <DeleteGen setEmptyField={setEmptyField}></DeleteGen>
          </div>
        )}
      </div>
      <h2
        className={`hidden sm:flex ${emptyField ? `h-0` : `h-14 md:my-1`} items-center justify-center overflow-hidden border-b bg-white text-center font-semibold transition-all duration-150 md:rounded-md md:border-none`}
      >
        {myText.title}
      </h2>
      <div
        className={`mb-20 overflow-y-auto bg-white ${emptyField ? `h-0` : `h-[calc(100svh-(40px+80px+56px))] sm:h-[600px] lg:py-5`} transition-all duration-150 sm:shadow-md md:rounded-md lg:px-5`}
        //
      >
        {!emptyField && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="px-3"
            >
              <h2
                className={`flex sm:hidden sm:shadow-md ${emptyField ? `h-0` : `h-14 md:my-1`} items-center justify-center overflow-hidden border-b bg-white text-center font-semibold transition-all duration-150 md:rounded-md md:border-none`}
              >
                {myText.title}
              </h2>
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
        className={`absolute bottom-0 right-0 flex h-20 w-full flex-col justify-center border-t border-gray-400 bg-gray-100 px-3 shadow-md transition-all duration-100 sm:rounded-md sm:border-none sm:bg-gray-50`}
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
