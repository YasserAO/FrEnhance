import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./view/mainPage";
import Dashboard from "./view/dashboard";
import Register from "./view/register";
import Login from "./view/login";
import About from "./partials/About";
import Contact from "./partials/Contact";
import Features from "./partials/Features";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage></MainPage>}></Route>
        <Route
          path="/features"
          element={
            <MainPage>
              <Features></Features>
            </MainPage>
          }
        ></Route>
        <Route
          path="/about"
          element={
            <MainPage>
              <About></About>
            </MainPage>
          }
        ></Route>
        <Route
          path="/contact"
          element={
            <MainPage>
              <Contact></Contact>
            </MainPage>
          }
        ></Route>

        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
