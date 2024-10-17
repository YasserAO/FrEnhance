import { Outlet } from "react-router-dom";
import NavBar from "../partials/Navbar";
export const Auth = () => {
  return (
    <>
      <NavBar auth={true}></NavBar>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
};
