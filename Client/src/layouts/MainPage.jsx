import PropTypes from "prop-types";
import NavBar from "../partials/Navbar";
import { Outlet } from "react-router-dom";

export const MainPage = () => {
  return (
    <>
      <NavBar></NavBar>

      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
};

MainPage.propTypes = {
  children: PropTypes.node,
};
