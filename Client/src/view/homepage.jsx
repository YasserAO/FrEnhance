import NavBar from "../partials/Navbar";
import Template from "../partials/template";

const Home = () => {
  return <Template left={<NavBar />} right={<NavBar />}></Template>;
};

export default Home;
