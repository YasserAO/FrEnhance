import { useEffect, useState } from "react";
import fetchText from "../../forms/textGenerate.mjs";
import SpinLoad from "../../partials/icons/spindLoader";
import { motion, AnimatePresence } from "framer-motion";
import { DifficultyMenu } from "../../partials/menus/DifficultyMenu";
import { SaveText } from "../../partials/Buttons/SaveText";
import { DeleteGen } from "../../partials/Buttons/DeleteGen.jsx";
import PropTypes from "prop-types";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import { IoIosReturnLeft } from "react-icons/io";
import { loadEditedText } from "../../forms/loadEditedText.mjs";
import { Translate } from "../../partials/Buttons/Translate.jsx";
import { outputFinder } from "../../utils/outputFinder.mjs";

import { ExplainWindow } from "../../partials/article/ExplainWindow.jsx";

export const EditedTextLoader = async () => {
  async function textHandler() {
    try {
      const response = await loadEditedText();
      console.log(response);
      if (!response) return null;
      // console.log(response.status);
      if (response.status == 200) return response.content;
      else if (response.status == 204) throw Error("Text Edit is Empty");
      else if (response.status == 404) throw Error("Text was not Found");
      else if (response.status == 500) throw Error("Error Happened");
    } catch (err) {
      console.error(err.message);
      return null;
    }
  }
  const Content = await textHandler();
  return Content;
};

export const CreateAText = () => {
  const content = useLoaderData();
  const { setDbupdateToggle, dbupdateToggle } = useOutletContext();
  const [disabledButton, setDisabledButton] = useState(
    content?.savebutton ?? false,
  );
  const [myText, setMyText] = useState({
    title: "",
    text: "",
  });
  const navigate = useNavigate();

  // Loading conditions
  const [textLoading, setTextLoading] = useState(false);
  const [emptyField, setEmptyField] = useState(true);

  // Inputs
  const [theme, setTheme] = useState("");
  const [level, setLevel] = useState(1);

  // Translate and explain Menu
  const [selectedText, setSelectedText] = useState("");
  const [explainMenuToggle, setExplainMenuToggle] = useState(false);
  const [anchor, setAnchor] = useState("");

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
  useEffect(() => {
    const selectionFunction = () => {
      if (explainMenuToggle) return;
      const output = document.getElementById("content");
      const myAnchor = window.getSelection().anchorNode;
      const selection = window.getSelection().toString().trim();
      if (output.contains(myAnchor)) {
        const myWords = outputFinder(
          window.getSelection().anchorNode.textContent,
          selection,
        );

        if (myWords == null || myWords.length > 3) {
          setSelectedText("");
        } else {
          const myString = myWords.join(" ");
          setSelectedText(myString.replace(/^,|,$/g, ""));
          setAnchor(myAnchor.textContent);
        }
      } else setSelectedText("");
    };

    document.addEventListener("selectionchange", selectionFunction);
    return () => {
      document.removeEventListener("selectionchange", selectionFunction);
    };
  }, [explainMenuToggle]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative flex h-full flex-grow flex-col"
    >
      <AnimatePresence>
        {explainMenuToggle && (
          <ExplainWindow
            selectedText={selectedText}
            setSelectedText={setSelectedText}
            anchor={anchor}
            setExplainMenuToggle={setExplainMenuToggle}
          />
        )}
      </AnimatePresence>
      <div className="flex h-10 w-full gap-3 overflow-hidden bg-gray-100 px-2">
        <div className="w-1/3">
          <button
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            <IoIosReturnLeft size={"2.5rem"}></IoIosReturnLeft>
          </button>
        </div>
        <div className="flex w-1/3 justify-center">
          {selectedText.length >= 3 && (
            <Translate
              selectedText={selectedText}
              setExplainMenuToggle={setExplainMenuToggle}
            />
          )}
        </div>
        {!emptyField && (
          <div className="flex w-1/3 items-center justify-end gap-3">
            <SaveText
              disabledButton={disabledButton}
              setDisabledButton={setDisabledButton}
              dbupdateToggle={dbupdateToggle}
              setDbupdateToggle={setDbupdateToggle}
              text={myText}
            ></SaveText>
            <DeleteGen setEmptyField={setEmptyField}></DeleteGen>
          </div>
        )}
      </div>
      <div id="content">
        <h2
          className={`hidden sm:flex ${emptyField ? `h-0` : `h-14 md:my-1`} items-center justify-center overflow-hidden border-b bg-white text-center font-semibold transition-all duration-150 md:rounded-md md:border-none`}
        >
          {myText.title}
        </h2>
        <div
          className={`mb-22 overflow-y-auto bg-white ${emptyField ? `h-0` : `h-[calc(100svh-(40px+80px+56px))] sm:h-[590px] lg:py-5`} transition-all duration-150 sm:shadow-md md:rounded-md lg:px-5`}
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
                  className={`flex sm:hidden ${emptyField ? `h-0` : `h-14 md:my-1`} items-center justify-center overflow-hidden border-b bg-white text-center font-semibold transition-all duration-150 md:rounded-md md:border-none`}
                >
                  {myText.title}
                </h2>
                {myText.text.split("\n").map((para, index) => (
                  <p className="mb-4 selection:bg-amber-200" key={index}>
                    <span className="inline-block w-4"></span> {para}
                  </p>
                ))}
              </motion.div>
            </>
          )}
        </div>
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
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden">
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
