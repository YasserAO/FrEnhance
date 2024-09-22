import PropTypes from "prop-types";
import NavBar from "../partials/Navbar";

const MainPage = ({ children }) => {
  return (
    <div className="flex h-screen flex-col bg-amber-100">
      <NavBar></NavBar>
      {children}
    </div>
  );
};

MainPage.propTypes = {
  children: PropTypes.node,
};

export default MainPage;
