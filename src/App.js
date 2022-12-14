import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import ChangePassword from "./components/changePassword/ChangePassword";

import "./App.css";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  useEffect(() => {
    document.title = `Form - ${
      location.pathname.replace("/", "") === "changepassword"
        ? "Change Password"
        : location.pathname.replace("/", "")
    } `;
  }, [location]);
  return (
    <div className="background">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/changePassWord" element={<ChangePassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
