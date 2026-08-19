import { Outlet, useLocation, useNavigate } from "react-router-dom";
import DNavBar from "../partials/DNavBar";
import { AuthContext } from "../authProvider";
import { useState, useContext, useEffect } from "react";
import { TextLabelsMobile } from "../partials/article/TextLabelsMobile";
import { textForm } from "../forms/textGetForm.mjs";
import { TextLabels } from "../partials/article/TextLabels";
import { LoadingScreen } from "../partials/LoadingScreen";
import { VerifictionBar } from "../partials/VerificationBar";

export const DashBoard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLogged, userForm } = useContext(AuthContext);
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
    if (isLogged == false) navigate("/auth/login?source=dashboard");
  }, [isLogged, navigate]);

  useEffect(() => {
    const getTexts = async () => {
      try {
        const texts = await textForm();
        if (texts && texts.status === 200) {
          setEmptyText(false);
          setMyTexts(texts.content || []);
          if (texts.content && texts.content.length < 4) {
            setShowMore(texts.content.length);
          }
          setDisplayShowMore(true);
        } else if (texts && texts.status === 204) {
          setEmptyText(true);
          setMyTexts([]);
        }
      } catch (err) {
        console.debug("Dashboard fetch texts error:", err);
      }
    };
    getTexts();
  }, [dbupdateToggle]);

  return (
    <>
      <LoadingScreen isLogged={isLogged} />

      <DNavBar>
        <TextLabelsMobile
          readMode={readMode}
          emptyText={emptyText}
          myTexts={myTexts}
        />
      </DNavBar>
      {isLogged && userForm.verified === false && <VerifictionBar />}
      <main
        className={`relative flex min-h-[calc(100vh-3.5rem)] flex-grow flex-col bg-slate-50 sm:px-3 sm:py-4 sm:pb-5 md:flex-row md:gap-6 md:px-[2.5%] md:py-8 lg:px-[5%] xl:px-[8%]`}
      >
        <aside
          className={`${!readMode && `hidden`} relative min-h-full flex-[1] rounded-xl border border-slate-700/50 bg-slate-800 p-4 shadow-lg transition-all duration-200 md:block`}
        >
          <h2 className="mb-5 select-none rounded-lg bg-slate-900/90 py-2.5 text-center text-sm font-semibold tracking-wide text-white shadow-inner">
            My Recent Texts
          </h2>
          <TextLabels
            readMode={readMode}
            setShowMore={setShowMore}
            displayShowMore={displayShowMore}
            showMore={showMore}
            emptyText={emptyText}
            myTexts={myTexts}
          />
        </aside>
        <div
          className={`relative ${readMode ? `sm:flex-[0] lg:flex-[0]` : `sm:flex-[2] lg:flex-[2.5]`} flex flex-grow flex-col transition-all duration-150`}
        >
          <Outlet
            context={{ myTexts, emptyText, setDbupdateToggle, dbupdateToggle }}
          />
        </div>
      </main>
    </>
  );
};
