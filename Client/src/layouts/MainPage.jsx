import PropTypes from "prop-types";
import NavBar from "../partials/Navbar";
import { Footer } from "../partials/Footer";
import { Outlet } from "react-router-dom";

export const MainPage = () => {
  return (
    <>
      <NavBar></NavBar>

      <main className="flex-1 bg-mainBody">
        <Outlet></Outlet>
      </main>

      <Footer></Footer>
    </>
  );
};

MainPage.propTypes = {
  children: PropTypes.node,
};
