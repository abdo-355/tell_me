import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Form from "./pages/Form";
import AuthProvider from "./context/auth-provider";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/auth/*" element={<Form />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
