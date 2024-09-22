import { useContext, useEffect } from "react";
import { AuthContext } from "../authProvider";
import DNavBar from "../partials/DNavBar";
import { CreateAText } from "../partials/Buttons/CreateAtext";

const Dashboard = () => {
  const { isLogged } = useContext(AuthContext);

  useEffect(() => {
    if (isLogged == false) window.location.href = "/login";
  }, [isLogged]);

  return (
    <div className="relative flex h-screen flex-col bg-amber-100">
      <div
        className={`absolute right-0 top-0 z-50 flex h-full w-full items-center justify-center bg-amber-100 opacity-0 transition-all delay-[1s] duration-200 ${isLogged == null && `opacity-100`} pointer-events-none`}
      >
        <p>Loading</p>
      </div>

      <DNavBar></DNavBar>

      <div>
        <CreateAText></CreateAText>
      </div>
    </div>
  );
};

export default Dashboard;
