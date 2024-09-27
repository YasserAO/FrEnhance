import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../authProvider";
import DNavBar from "../partials/DNavBar";
import { CreateAText } from "../partials/article/CreateAtext";
import { TextLabels } from "../partials/article/TextLabels";
import { EditAText } from "../partials/article/EditAText";
import { InsertAtext } from "../partials/article/InsertText";
const Dashboard = () => {
  const { isLogged } = useContext(AuthContext);
  const [dashMode, setDashMode] = useState(0);
  const [showWaitCursor, setShowWaitCursor] = useState(true);
  const [labelInHand, setLabelInHand] = useState();
  const [readMode, setReadMode] = useState(false);

  useEffect(() => {
    if (isLogged == null) {
      setShowWaitCursor(true);
    } else {
      setTimeout(() => {
        setShowWaitCursor(false);
      }, 1000);
    }
  }, [isLogged]);

  useEffect(() => {
    if (isLogged == false) window.location.href = "/login";
  }, [isLogged]);

  return (
    <div
      className={`relative flex min-h-svh flex-col bg-amber-100 pb-5 sm:min-h-screen ${showWaitCursor && `cursor-wait`}`}
    >
      <div
        className={`absolute right-0 top-0 z-50 flex h-full w-full select-none items-center justify-center bg-amber-100 opacity-0 transition-all duration-200 ${showWaitCursor && `opacity-100`} pointer-events-none`}
      >
        <p>Loading</p>
      </div>
      <DNavBar></DNavBar>
      <div className="grid h-full flex-grow pt-2 sm:pt-10 md:flex md:px-[10%]">
        <div className="hidden min-h-full w-[40%] overflow-hidden rounded-lg bg-gray-700 px-3 py-6 md:block lg:w-[30%]">
          <h2 className="mb-6 select-none rounded-lg bg-slate-900 py-3 text-center font-semibold text-white">
            My Recent texts
          </h2>
          <TextLabels setReadMode={setReadMode}></TextLabels>
        </div>
        {readMode ? (
          <div>
            <h1>This is Read Mode</h1>
          </div>
        ) : (
          <div className="col- grid h-fit grid-cols-2 gap-4 p-3 md:w-[70%]">
            <CreateAText
              dashMode={dashMode}
              setDashMode={setDashMode}
            ></CreateAText>
            <EditAText
              dashMode={dashMode}
              setDashMode={setDashMode}
            ></EditAText>
            <InsertAtext
              dashMode={dashMode}
              setDashMode={setDashMode}
            ></InsertAtext>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
