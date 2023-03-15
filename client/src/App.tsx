import { Routes, Route } from "react-router-dom";

import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import Form from "./pages/Form";
import LinkGenerator from "./pages/LinkGenerator";
import SendMessage from "./pages/SendMessage";
import Messages from "./pages/Messages";
import EmailNotVerified from "./pages/Email/EmailNotVerified"
import EmailVerified from "./pages/Email/EmailVerified"

const App = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<Form />} />
      <Route path="/messages/:usertpath" element={<SendMessage />} />
      <Route path="/email/verified" element={<EmailVerified />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/getURL" element={<LinkGenerator />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/email/not-verified" element={<EmailNotVerified />} />
      </Route>
    </Routes>
  );
};

export default App;
