import { Outlet } from "react-router-dom";
import NavBar from "../partials/Navbar";
export const Auth = () => {
  return (
    <>
      <NavBar auth={true}></NavBar>
      <main className="flex flex-1 flex-col">
        <Outlet></Outlet>
      </main>
    </>
  );
};
