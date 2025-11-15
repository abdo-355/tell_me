import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import Form from "./pages/Form";
import LinkGenerator from "./pages/LinkGenerator";
import SendMessage from "./pages/SendMessage";
import Messages from "./pages/Messages";
import EmailVerified from "./pages/Email/EmailVerified"
import EmailNotVerified from "./pages/Email/EmailNotVerified";
import VerifyEmail from "./pages/Email/VerifyEmail";
import NotFound from "./pages/NotFound";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn } = useAuth();
  return isSignedIn ? <>{children}</> : <Navigate to="/auth/login" replace />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn } = useAuth();
  return !isSignedIn ? <>{children}</> : <Navigate to="/" replace />;
};

const App = () => {
  return (
    <Routes>
      <Route path="/messages/:usertpath" element={<SendMessage />} />
      <Route path="/email/verify" element={<VerifyEmail />} />
      <Route path="/email/verified" element={<EmailVerified />} />
      <Route path="/auth/*" element={<PublicRoute><Form /></PublicRoute>} />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/getURL" element={<ProtectedRoute><LinkGenerator /></ProtectedRoute>} />
        <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
        <Route path="/email/not-verified" element={<ProtectedRoute><EmailNotVerified /></ProtectedRoute>} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
