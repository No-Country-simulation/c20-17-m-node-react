import "./App.css";
import Login from "./dashboard/Login.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./dashboard/Main.tsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
