import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Header />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default App;
