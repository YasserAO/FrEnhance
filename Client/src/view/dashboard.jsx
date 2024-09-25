import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../authProvider";
import DNavBar from "../partials/DNavBar";
import { CreateAText } from "../partials/article/CreateAtext";
import { TextLabels } from "../partials/article/TextLabels";
import { EditAText } from "../partials/article/EditAText";

const Dashboard = () => {
  const { isLogged } = useContext(AuthContext);
  const [dashMode, setDashMode] = useState(0);

  useEffect(() => {
    if (isLogged == false) window.location.href = "/login";
  }, [isLogged]);

  return (
    <div className="relative flex min-h-screen flex-col bg-amber-100 pb-5">
      <div
        className={`absolute right-0 top-0 z-50 flex h-full w-full items-center justify-center bg-amber-100 opacity-0 transition-all delay-[1s] duration-200 ${isLogged == null && `opacity-100`} pointer-events-none`}
      >
        <p>Loading</p>
      </div>
      <DNavBar></DNavBar>
      <div className="h-full flex-grow pt-10 md:flex md:px-[10%]">
        <div className="hidden min-h-full w-[40%] overflow-hidden rounded-lg bg-gray-700 px-3 py-6 md:block lg:w-[30%]">
          <h2 className="mb-6 rounded-lg bg-slate-900 py-3 text-center font-semibold text-white">
            My Recent texts
          </h2>
          <TextLabels></TextLabels>
        </div>
        <div className="md:w-[70%]">
          <CreateAText
            dashMode={dashMode}
            setDashMode={setDashMode}
          ></CreateAText>
          <EditAText dashMode={dashMode} setDashMode={setDashMode}></EditAText>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
