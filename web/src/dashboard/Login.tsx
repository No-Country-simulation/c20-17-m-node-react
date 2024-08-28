import { useState } from "react";
import { useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Preloader from "./components/LoginPreloader";
import "./css/Login.css";

function Login() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const time = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }, 1800);

    return () => clearTimeout(time);
  }, []);

  return (
    <>
      <div className="container-fluid h-100 text-bg-dark overflow-hidden loginform">
        {loading && <Preloader fadeout={fadeOut} />}
        <LoginForm />
      </div>
    </>
  );
}

export default Login;
