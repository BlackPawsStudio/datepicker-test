import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Redirect } from "./components/Redirect";
import { Sundays } from "./components/pages";

const App = () => {
  return (
    <Routes>
      <Route path="*" element={<Redirect />} />
      <Route path="/pages/Sundays" element={<Sundays />} />
    </Routes>
  );
};

export default App;
