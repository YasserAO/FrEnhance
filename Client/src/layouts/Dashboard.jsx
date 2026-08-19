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
    <div className="flex h-svh w-full flex-col overflow-hidden bg-slate-900">
      <LoadingScreen isLogged={isLogged} />

      <DNavBar>
        <TextLabelsMobile
          readMode={readMode}
          emptyText={emptyText}
          myTexts={myTexts}
        />
      </DNavBar>
      {isLogged && userForm.verified === false && <VerifictionBar />}
      <main className="relative flex flex-1 min-h-0 overflow-hidden bg-slate-900 p-3 sm:p-4 md:gap-6 md:p-6 lg:px-8">
        <aside
          className={`${!readMode ? "hidden md:flex" : "hidden"} relative h-full w-80 max-w-[280px] flex-col rounded-2xl border border-slate-700/60 bg-slate-800/90 p-4 shadow-xl backdrop-blur-sm transition-all duration-200`}
        >
          <h2 className="mb-4 select-none rounded-xl bg-slate-950/80 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-slate-200 shadow-inner">
            My Recent Texts
          </h2>
          <div className="flex-1 min-h-0">
            <TextLabels
              readMode={readMode}
              setShowMore={setShowMore}
              displayShowMore={displayShowMore}
              showMore={showMore}
              emptyText={emptyText}
              myTexts={myTexts}
            />
          </div>
        </aside>
        <div
          className={`relative flex flex-1 min-h-0 flex-col overflow-y-auto rounded-2xl border border-slate-700/40 bg-slate-800/40 p-4 shadow-inner backdrop-blur-sm sm:p-6`}
        >
          <Outlet
            context={{ myTexts, emptyText, setDbupdateToggle, dbupdateToggle }}
          />
        </div>
      </main>
    </div>
  );
};
