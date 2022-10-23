import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import ChangePassword from "./components/changePassword/ChangePassword";

import "./App.css";

function App() {
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
