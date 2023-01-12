import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Form from "./pages/Form";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Header />} />
      <Route path="/auth/*" element={<Form />} />
    </Routes>
  );
};

export default App;
