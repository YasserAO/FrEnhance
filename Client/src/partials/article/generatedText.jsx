import React, { useContext, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

import fetchText from "../../forms/textGenerate.mjs";
import { AuthContext } from "../../authProvider";

const GeneratedTextContainer = () => {
  const [textTheme, setTextTheme] = useState("");
  const [questions, setQuestions] = useState("");
  const [answers, setAnswers] = useState("");
  const [level, setLevel] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const { isLogged } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await fetchText(level, textTheme);
      setQuestions(data.questions);
      setText(data.text);
      setTitle(data.title);
      setAnswers(data.answers);
      console.log(data.questions);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div
        className={`pt-5 ${isLogged ? `opacity-100` : `opacity-0`} transition-all duration-1000`}
      >
        <div className="mx-auto flex h-12 w-fit items-center rounded-3xl bg-gray-900 px-4">
          <h1 className="text-center text-4xl text-white">Generate the text</h1>
        </div>
        <p></p>
      </div>
    </>
  );
};

export default GeneratedTextContainer;
