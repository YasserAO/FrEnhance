import NavBar from "../partials/Navbar";

const MainPage = ({ children }) => {
  return (
    <div className="flex h-screen flex-col bg-amber-200">
      <NavBar></NavBar>
      {children}
    </div>
  );
};

export default MainPage;
