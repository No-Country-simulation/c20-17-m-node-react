import "./App.css";
import Login from "./dashboard/Login.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard.tsx";
import Register from "./dashboard/Register.tsx";
import TermsConditions from "./dashboard/TermsConditions.tsx";
import PasswordRecovery from "./dashboard/PasswordRecovery.tsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/passwordrecovery" element={<PasswordRecovery />} />
          <Route path="/termsconditions" element={<TermsConditions />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
