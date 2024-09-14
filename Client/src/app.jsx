import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./view/dashboard";
import Homepage from "./view/homepage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage></Homepage>}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
