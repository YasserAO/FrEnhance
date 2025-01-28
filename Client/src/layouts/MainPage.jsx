import PropTypes from "prop-types";
import NavBar from "../partials/Navbar";
import { Footer } from "../partials/Footer";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../authProvider";
import { useContext } from "react";
import { VerifictionBar } from "../partials/VerificationBar";

export const MainPage = () => {
  const { userForm, isLogged } = useContext(AuthContext);
  console.log();

  return (
    <>
      <NavBar></NavBar>
      {isLogged && userForm.verified === false && <VerifictionBar />}
      <main className="flex flex-1 flex-col bg-mainBody">
        <Outlet></Outlet>
      </main>

      <Footer></Footer>
    </>
  );
};

MainPage.propTypes = {
  children: PropTypes.node,
};
