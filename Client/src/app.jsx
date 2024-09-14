import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./view/homepage";
import Generate from "./view/generate";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage></Homepage>}></Route>
        <Route path="/generate" element={<Generate></Generate>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
