import { Routes, Route } from "react-router-dom";

import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import Form from "./pages/Form";
import LinkGenerator from "./pages/LinkGenerator";
import SendMessage from "./pages/SendMessage";
import Messages from "./pages/Messages";

const App = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<Form />} />
      <Route path="/messages/:usertpath" element={<SendMessage />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/getURL" element={<LinkGenerator />} />
        <Route path="/messages" element={<Messages />} />
      </Route>
    </Routes>
  );
};

export default App;
