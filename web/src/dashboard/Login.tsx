import { useState } from "react";
import { useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Preloader from "./components/LoginPreloader";

function Login() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const time = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }, 2000);

    return () => clearTimeout(time);
    /* window.onload = () => {
      setFadeOut(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };

    return () => {
      window.onload = null;
    }; */
  }, []);

  return (
    <>
      {loading && <Preloader fadeout={fadeOut} />}
      <LoginForm />
    </>
  );
}

export default Login;
