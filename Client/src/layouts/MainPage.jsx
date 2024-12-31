import PropTypes from "prop-types";
import NavBar from "../partials/Navbar";
import { Footer } from "../partials/Footer";
import { Outlet } from "react-router-dom";

export const MainPage = () => {
  return (
    <>
      <NavBar></NavBar>

      <main>
        <Outlet></Outlet>
      </main>

      <Footer></Footer>
    </>
  );
};

MainPage.propTypes = {
  children: PropTypes.node,
};
