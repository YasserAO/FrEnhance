import { useContext } from "react";
import { AuthContext } from "../authProvider";

const Dashboard = () => {
  const { userForm, isLogged } = useContext(AuthContext);
  if (isLogged == null) return <div>Loading</div>;
  return (
    <div className="flex h-screen flex-col bg-amber-200">
      <h1>Dashbord</h1>
    </div>
  );
};

export default Dashboard;
