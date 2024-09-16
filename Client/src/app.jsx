import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./view/homepage";
import Generate from "./view/generate";
import Dashboard from "./view/dashboard";
import Register from "./view/register";
import Login from "./view/login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage></Homepage>}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/generate" element={<Generate></Generate>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
