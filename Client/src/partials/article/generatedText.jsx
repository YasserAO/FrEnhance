import React, { useState } from "react";

import fetchText from "../../forms/textGenerate.mjs";

const GeneratedTextContainer = () => {
  const [textTheme, setTextTheme] = useState("");
  const [questions, setQuestions] = useState("");
  const [answers, setAnswers] = useState("");
  const [level, setLevel] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
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
      <div>
        <form className="h-[200px] w-full bg-slate-500" onSubmit={handleSubmit}>
          <input
            className="mb-2 h-10 rounded-lg bg-gray-900 pl-2 text-white placeholder:text-gray-700"
            type="text"
            placeholder="Theme"
            value={textTheme}
            onChange={(e) => {
              setTextTheme(e.target.value);
            }}
          />
          <input
            className="mb-2 h-10 rounded-lg bg-gray-900 pl-2 text-white placeholder:text-gray-700"
            type="number"
            placeholder="Difficulty"
            value={level}
            onChange={(e) => {
              setLevel(e.target.value);
            }}
          />
          <button>Submit</button>
        </form>
      </div>
      <div>
        <h1>{title}</h1>
        <p>{text}</p>
        <h2>Answers</h2>
        <ul></ul>
      </div>
    </>
  );
};

export default GeneratedTextContainer;
