import { Outlet } from "react-router-dom";
import DNavBar from "../partials/DNavBar";
import { AuthContext } from "../authProvider";
import { useState, useContext, useEffect } from "react";
import { TextLabelsMobile } from "../partials/article/TextLabelsMobile";
import { textForm } from "../forms/textGetForm.mjs";
import { TextLabels } from "../partials/article/TextLabels";

export const DashBoard = () => {
  const { isLogged } = useContext(AuthContext);
  const [dashMode, setDashMode] = useState(0);
  const [showWaitCursor, setShowWaitCursor] = useState(true);
  const [labelInHand, setLabelInHand] = useState();
  const [readMode, setReadMode] = useState(false);
  const [myTexts, setMyTexts] = useState([]);
  const [emptyText, setEmptyText] = useState(false);
  const [showMore, setShowMore] = useState(4);
  const [displayShowMore, setDisplayShowMore] = useState(false);
  const [dbupdateToggle, setDbupdateToggle] = useState(false);

  useEffect(() => {
    const getTexts = async () => {
      let texts;
      try {
        texts = await textForm();
      } catch (err) {
        console.log(err);
      }
      if (texts.status == 200) {
        console.log(texts);
        setEmptyText(false);
        setMyTexts(texts.content);
        if (texts.content.length < 4) setShowMore(texts.content.length);

        setDisplayShowMore(true);
      } else if (texts.status == 204) {
        setEmptyText(true);
      }
    };
    getTexts();
  }, []);

  return (
    <>
      <DNavBar>
        <TextLabelsMobile emptyText myTexts={myTexts}></TextLabelsMobile>
      </DNavBar>
      <main
        className={`relative flex-grow bg-amber-100 px-3 py-4 pb-5 sm:px-3 md:flex md:px-[10%] md:py-10`}
      >
        <div className="hidden min-h-full flex-[1] overflow-hidden rounded-lg bg-gray-700 px-3 py-6 md:block">
          <h2 className="mb-6 select-none rounded-lg bg-slate-900 py-3 text-center font-semibold text-white">
            My Recent texts
          </h2>
          <TextLabels
            showMore
            emptyText={emptyText}
            myTexts={myTexts}
            setMobileShowMore
            setTextMenuToggle
            mobileShowMore
          ></TextLabels>
        </div>
        <div className="flex-[2] lg:flex-[2.5]">
          <Outlet context={{ myTexts, emptyText }}></Outlet>
        </div>
      </main>
    </>
  );
};
