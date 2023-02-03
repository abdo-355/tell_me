import { Routes, Route } from "react-router-dom";

import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import Form from "./pages/Form";
import URLGenerator from "./pages/URLGenerator";

const App = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<Form />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/getURL" element={<URLGenerator />} />
      </Route>
    </Routes>
  );
};

export default App;
