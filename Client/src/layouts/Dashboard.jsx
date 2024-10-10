import { Outlet, useLocation, useNavigate } from "react-router-dom";
import DNavBar from "../partials/DNavBar";
import { AuthContext } from "../authProvider";
import { useState, useContext, useEffect } from "react";
import { TextLabelsMobile } from "../partials/article/TextLabelsMobile";
import { textForm } from "../forms/textGetForm.mjs";
import { TextLabels } from "../partials/article/TextLabels";
import { LoadingScreen } from "../partials/LoadingScreen";

export const DashBoard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLogged } = useContext(AuthContext);
  const [myTexts, setMyTexts] = useState([]);
  const [emptyText, setEmptyText] = useState(false);
  const [showMore, setShowMore] = useState(4);
  const [displayShowMore, setDisplayShowMore] = useState(false);
  const [dbupdateToggle, setDbupdateToggle] = useState(false);
  const [readMode, setReadMode] = useState(false);

  useEffect(() => {
    if (location.pathname == "/dashboard/readmode") {
      setReadMode(true);
      return;
    }
    setReadMode(false);
  }, [location]);

  useEffect(() => {
    if (isLogged == false) navigate("/auth/login");
  }, [isLogged, navigate]);

  useEffect(() => {
    const getTexts = async () => {
      let texts;
      try {
        texts = await textForm();
      } catch (err) {
        console.log(err);
      }
      if (texts.status == 200) {
        setEmptyText(false);
        setMyTexts(texts.content);
        if (texts.content.length < 4) setShowMore(texts.content.length);

        setDisplayShowMore(true);
      } else if (texts.status == 204) {
        setEmptyText(true);
      }
    };
    getTexts();
  }, [dbupdateToggle]);

  return (
    <>
      <LoadingScreen isLogged></LoadingScreen>

      <DNavBar>
        <TextLabelsMobile emptyText myTexts={myTexts}></TextLabelsMobile>
      </DNavBar>

      <main
        className={`relative flex flex-grow flex-col bg-amber-100 sm:px-3 sm:py-4 sm:pb-5 md:flex-row md:gap-[2.5%] md:px-[2.5%] md:py-10 lg:px-[5%] xl:px-[10%]`}
      >
        <div
          className={`${!readMode && `hidden`} relative min-h-full flex-[1] overflow-hidden rounded-lg bg-gray-700 px-3 py-6 transition-all duration-200 md:block`}
        >
          <h2 className="mb-6 select-none rounded-lg bg-slate-900 py-3 text-center font-semibold text-white">
            My Recent texts
          </h2>
          <TextLabels
            readMode={readMode}
            setShowMore={setShowMore}
            displayShowMore={displayShowMore}
            showMore={showMore}
            emptyText={emptyText}
            myTexts={myTexts}
          ></TextLabels>
        </div>
        <div
          className={`relative ${readMode ? `sm:flex-[0] lg:flex-[0]` : `sm:flex-[2] lg:flex-[2.5]`} flex flex-grow flex-col overflow-hidden transition-all duration-100`}
        >
          <Outlet
            context={{ myTexts, emptyText, setDbupdateToggle, dbupdateToggle }}
          ></Outlet>
        </div>
      </main>
    </>
  );
};
