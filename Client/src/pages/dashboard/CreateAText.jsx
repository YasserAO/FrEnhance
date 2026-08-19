// React Tools // Animation libraries
import PropTypes, { element } from "prop-types";
import { useEffect, useState, useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";

// icons
import SpinLoad from "../../partials/icons/spindLoader";
import { IoSend } from "react-icons/io5";
import { IoIosReturnLeft } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

// Fetchers and updaters
import fetchText from "../../forms/textGenerate.mjs";
import { loadEditedText } from "../../forms/loadEditedText.mjs";
import { AuthContext } from "../../authProvider.jsx";

// Components
import { DifficultyMenu } from "../../partials/menus/DifficultyMenu";
import { SaveText } from "../../partials/Buttons/SaveText";
import { DeleteGen } from "../../partials/Buttons/DeleteGen.jsx";
import { Translate } from "../../partials/Buttons/Translate.jsx";
import { ExplainWindow } from "../../partials/article/ExplainWindow.jsx";
import { SuggestionsMenu } from "../../partials/menus/SuggestionsMenu.jsx";

// Functions and utils
import { outputFinder } from "../../utils/outputFinder.mjs";
import { TextParagraphs } from "../../partials/article/TextParagraphs.jsx";
import textRegen from "../../forms/textRegen.mjs";
import textRfine from "../../forms/textRefine.mjs";

export const EditedTextLoader = async () => {
  async function textHandler() {
    try {
      const response = await loadEditedText();
      // console.log(response);
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
  const location = useLocation();
  const content = useLoaderData();
  const { fetchCoins, config } = useContext(AuthContext);
  const { setDbupdateToggle, dbupdateToggle } = useOutletContext();
  const [disabledButton, setDisabledButton] = useState(
    content?.savebutton ?? false,
  );
  const [myText, setMyText] = useState({
    title: "",
    text: [],
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

  // Edit Paragraphs
  const [editParagraphMode, setEditParagraphMode] = useState(
    location.pathname == "/dashboard/edit" ? true : false,
  );
  const [editedParagraph, setEditedParagraph] = useState(0);
  const [selectedTexts, setSelectedTexts] = useState([]);
  const [deletedTexts, setDeletedTexts] = useState([]);

  // Edit paragraph send
  const [suggestions, setSuggestions] = useState([]);
  const [listMenu, setListMenu] = useState(false);
  const [deletionState, setDeletionState] = useState(false);
  const [selectionState, setSelectionState] = useState(false);
  const [addLabelState, setAddLabelState] = useState(true);

  // Button Ref
  const buttonRef = useRef(null);

  useEffect(() => {
    if (content) {
      setEmptyField(false);
      setMyText(content);
      if (content.savebutton !== undefined) {
        setDisabledButton(content.savebutton);
      }
    }
  }, [content]);

  // Handle Submit GENERATE TEXT
  const handleSubmit = async () => {
    // e.preventDefault();
    setTextLoading(true);
    setEmptyField(true);
    const data = await fetchText(theme, level);
    if (!(data.status == 200)) {
      // console.log(data);
      setTextLoading(false);

      return;
    }
    fetchCoins();
    setEmptyField(false);
    const content = { title: data.title, text: data.text };
    setMyText(content);
    setSelectedTexts([]);
    setDisabledButton(false);
    setTextLoading(false);
    setEmptyField(false);
    fetchCoins();
  };

  // Handle instruction
  const handleInstruction = async () => {
    setTextLoading(true);
    if (suggestions.length == 0) return;
    const refinedResponse = await textRfine(
      myText.title,
      myText.text,
      suggestions[0].text,
    );
    if (refinedResponse.status !== 200) return;
    const mynewText = {
      title: refinedResponse.title,
      text: refinedResponse.text,
    };
    setTimeout(() => {
      setSuggestions((prev) => {
        const newArr = prev.filter((element, index) => !index == 0);
        return newArr;
      });
      setMyText(mynewText);
      setTextLoading(false);
    }, 300);
  };
  // Handle Submit REGEN TEXT
  const handleRegenSubmit = async () => {
    // e.preventDefault();

    if (!selectionState) return;
    setTextLoading(true);
    const regen = myText.text.filter((element, index) =>
      selectedTexts.some((seletedINX) => index === seletedINX),
    );

    const regenResponse = await textRegen(
      myText.title,
      myText.text.join("\n"),
      regen,
    );

    if (!regenResponse || regenResponse.status !== 200) {
      setTextLoading(false);
      return;
    }

    setMyText((prev) => {
      let newText = [...prev.text];
      for (let i = 0; i < selectedTexts.length; i++) {
        console.log(selectedTexts[i]);
        newText[selectedTexts[i]] = regenResponse.text[i];
      }
      // console.log(newText);
      return { ...prev, text: newText };
    });

    setTimeout(() => {
      setSelectedTexts([]);
      setTextLoading(false);
    }, 300);
  };

  // Handle Submit Delete TEXTS
  const handleDeleteSubmit = async () => {
    // e.preventDefault();

    if (!deletionState) return;
    setTextLoading(true);
    setMyText((prev) => {
      let tempText = [...prev.text];
      for (let i = 0; i < deletedTexts.length; i++) {
        tempText = tempText.filter((element, index) => {
          return index !== deletedTexts[i];
        });
      }
      return { ...prev, text: tempText };
    });
    setDeletedTexts([]);
    setTimeout(() => {
      setTextLoading(false);
    }, 300);
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

  // Edit Paragraph EFFECTS
  useEffect(() => {
    if (selectedTexts.length > 0) setSelectionState(true);
    else setSelectionState(false);
  }, [selectedTexts]);

  useEffect(() => {
    if (deletedTexts.length > 0) setDeletionState(true);
    else setDeletionState(false);
  }, [deletedTexts]);

  useEffect(() => {
    if (suggestions.length > 1) setAddLabelState(false);
    else setAddLabelState(true);
  }, [suggestions]);
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
          {!editParagraphMode && (
            <button
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              <IoIosReturnLeft size={"2.5rem"}></IoIosReturnLeft>
            </button>
          )}
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
          <div className="flex w-1/3 items-center justify-end gap-4">
            {!editParagraphMode && (
              <>
                <SaveText
                  disabledButton={disabledButton}
                  setDisabledButton={setDisabledButton}
                  dbupdateToggle={dbupdateToggle}
                  setDbupdateToggle={setDbupdateToggle}
                  text={myText}
                ></SaveText>
                <DeleteGen setEmptyField={setEmptyField}></DeleteGen>
              </>
            )}
            <button
              onClick={(e) => {
                console.log(myText);
                setEditParagraphMode((prev) => !prev);
              }}
            >
              {editParagraphMode ? <MdCancel /> : <CiEdit size={"2.5rem"} />}
            </button>
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
          className={`mb-22 overflow-y-auto bg-white ${emptyField ? `h-0` : editParagraphMode ? `h-[calc(100svh-(40px+128px+56px))] py-4 sm:h-[590px] lg:py-5` : `h-[calc(100svh-(40px+80px+56px))] py-2 sm:h-[590px] lg:py-5`} transition-all duration-150 sm:shadow-md md:rounded-md lg:px-5`}
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
                  className={`flex sm:hidden ${emptyField ? `h-0` : `my-2 h-20 md:my-1`} items-center justify-center overflow-hidden border-b bg-white text-center font-semibold transition-all duration-150 md:rounded-md md:border-none`}
                >
                  {myText.title}
                </h2>
                {myText.text.map((para, index) => (
                  <TextParagraphs
                    load
                    setMyText={setMyText}
                    deletedTexts={deletedTexts}
                    setDeletedTexts={setDeletedTexts}
                    selectedTexts={selectedTexts}
                    setSelectedTexts={setSelectedTexts}
                    key={(index + 1) * 10000}
                    editParagraphMode={editParagraphMode}
                    para={myText.text[index]}
                    index={index}
                    editedParagraph={editedParagraph}
                    setEditedParagraph={setEditedParagraph}
                  />
                ))}
              </motion.div>
            </>
          )}
        </div>
      </div>
      <form
        className={`absolute bottom-0 right-0 flex ${editParagraphMode ? `h-32 md:h-28` : `h-20`} w-full flex-col justify-center border-t border-gray-400 bg-gray-100 px-3 shadow-md transition-all duration-100 sm:rounded-md sm:border-none sm:bg-gray-50`}
        onSubmit={(e) => {
          e.preventDefault();
          setEditedParagraph();
          if (editParagraphMode && selectionState) return handleRegenSubmit();
          if (editParagraphMode && deletionState) return handleDeleteSubmit();
          if (editParagraphMode && deletionState) return handleDeleteSubmit();
          if (suggestions.length > 0) return handleInstruction();
          if (!editParagraphMode) return handleSubmit();
        }}
      >
        {/* Sending Pannel */}
        {editParagraphMode ? (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div
                className={`flex h-10 w-fit items-center justify-between rounded-sm px-2`}
              >
                <AnimatePresence>
                  {selectedTexts.map((myindex, index) => (
                    <motion.p
                      initial={{
                        opacity: 0,
                        height: 0,
                        width: 0,
                        marginRight: 0,
                      }}
                      animate={{
                        opacity: 1,
                        height: 32,
                        width: 32,
                        marginRight: 10,
                      }}
                      exit={{ opacity: 0, height: 0, width: 0, marginRight: 0 }}
                      key={999 + myindex}
                      onClick={() => {
                        setSelectedTexts((prev) => {
                          const newValues = prev.filter(
                            (element) => element !== myindex,
                          );
                          return newValues;
                        });
                      }}
                      className="flex cursor-pointer select-none items-center justify-center rounded-md bg-green-200"
                    >
                      P{myindex + 1}
                    </motion.p>
                  ))}
                  {deletedTexts.map((myindex, index) => (
                    <motion.p
                      initial={{
                        opacity: 0,
                        height: 0,
                        width: 0,
                        marginRight: 0,
                      }}
                      animate={{
                        opacity: 1,
                        height: 32,
                        width: 32,
                        marginRight: 10,
                      }}
                      exit={{ opacity: 0, height: 0, width: 0, marginRight: 0 }}
                      key={9999 + myindex}
                      onClick={() => {
                        setDeletedTexts((prev) => {
                          const newValues = prev.filter(
                            (element) => element !== myindex,
                          );
                          return newValues;
                        });
                      }}
                      className="flex cursor-pointer select-none items-center justify-center rounded-md bg-red-200"
                    >
                      P{myindex + 1}
                    </motion.p>
                  ))}
                </AnimatePresence>
              </div>
              <p className="h-8 select-none rounded-md bg-green-500 px-1 py-1 text-sm font-semibold text-white">
                Customize
              </p>
            </div>
            <div className="relative flex justify-between">
              <div className="flex h-fit max-w-sm items-center overflow-auto py-1">
                <SuggestionsMenu
                  buttonRef={buttonRef}
                  key={23}
                  listMenu={listMenu}
                  setListMenu={setListMenu}
                  suggestions={suggestions}
                  setSuggestions={setSuggestions}
                ></SuggestionsMenu>
                <AnimatePresence>
                  {suggestions.map((suguest, index) => (
                    <motion.div
                      initial={{
                        opacity: 0,
                        maxWidth: 0,
                        paddingLeft: 0,
                        paddingRight: 0,
                        marginRight: 0,
                      }}
                      animate={{
                        opacity: 1,
                        maxWidth: 200,
                        paddingLeft: 7,
                        paddingRight: 7,
                        marginRight: 10,
                      }}
                      exit={{
                        opacity: 0,
                        width: 0,
                        paddingLeft: 0,
                        paddingRight: 0,
                        marginRight: 0,
                      }}
                      key={suguest.id * 919191919}
                      className="flex h-10 select-none items-center justify-center gap-2 overflow-hidden rounded-full bg-blue-100 text-sm font-semibold text-blue-900 shadow-md"
                    >
                      <p className="max-w-[200px] overflow-hidden text-nowrap">
                        {suguest.text}{" "}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          console.log(suggestions);
                          setSuggestions((prev) => {
                            const newArr = prev.filter(
                              (element) => element.id !== suguest.id,
                            );
                            return newArr;
                          });
                        }}
                        className="px-2"
                      >
                        x
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <AnimatePresence>
                  {deletionState && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        width: 0,
                        paddingLeft: 0,
                        paddingRight: 0,
                        marginRight: 0,
                      }}
                      animate={{
                        opacity: 1,
                        width: 100,
                        paddingLeft: 8,
                        paddingRight: 8,
                        marginRight: 10,
                      }}
                      exit={{
                        opacity: 0,
                        width: 0,
                        paddingLeft: 0,
                        paddingRight: 0,
                        marginRight: 0,
                      }}
                      key={1234}
                      className="flex min-h-10 w-fit select-none items-center justify-center overflow-hidden rounded-full bg-red-100 text-sm font-semibold text-red-900 shadow-md"
                    >
                      Delete
                    </motion.div>
                  )}
                  {selectionState && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        width: 0,
                        paddingLeft: 0,
                        paddingRight: 0,
                        marginRight: 0,
                      }}
                      animate={{
                        opacity: 1,
                        width: 100,
                        paddingLeft: 8,
                        paddingRight: 8,
                        marginRight: 10,
                      }}
                      exit={{
                        opacity: 0,
                        width: 0,
                        paddingLeft: 0,
                        paddingRight: 0,
                        marginRight: 0,
                      }}
                      key={1232}
                      className="flex min-h-10 w-fit select-none items-center justify-center overflow-hidden rounded-full bg-green-100 text-sm font-semibold text-green-900 shadow-md"
                    >
                      Regenerate
                    </motion.div>
                  )}
                  {addLabelState && (
                    <motion.div
                      ref={buttonRef}
                      initial={{
                        opacity: 0,
                        width: 0,
                        paddingLeft: 0,
                        paddingRight: 0,
                        marginRight: 0,
                      }}
                      animate={{
                        opacity: 1,
                        width: 100,
                        paddingLeft: 8,
                        paddingRight: 8,
                        marginRight: 10,
                      }}
                      exit={{
                        opacity: 0,
                        width: 0,
                        paddingLeft: 0,
                        paddingRight: 0,
                        marginRight: 0,
                      }}
                      key={1231}
                      onClick={() => {
                        setListMenu((prev) => !prev);
                      }}
                      className="flex min-h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-300 transition duration-150 hover:scale-105 active:scale-95"
                    >
                      {listMenu ? <FaMinus /> : <FaPlus />}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {(selectionState || deletionState || suggestions.length > 0) && (
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden">
                  {textLoading ? (
                    <SpinLoad />
                  ) : (
                    <button disabled={listMenu} key={9999999} type="submit">
                      <IoSend />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2">
              <DifficultyMenu
                selectedIndex={level}
                setSelectedIndex={setLevel}
                config={config.textGeneration}
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
        )}
      </form>
    </motion.div>
  );
};

CreateAText.propTypes = {
  setDashMode: PropTypes.func,
};
