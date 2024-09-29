import PropTypes from "prop-types";
import NavBar from "../partials/Navbar";

const MainPage = ({ children }) => {
  console.log(import.meta.env.VITE_API_URL);
  return (
    <div className="flex h-svh flex-col bg-amber-100">
      <NavBar></NavBar>
      {children}
    </div>
  );
};

MainPage.propTypes = {
  children: PropTypes.node,
};

export default MainPage;
