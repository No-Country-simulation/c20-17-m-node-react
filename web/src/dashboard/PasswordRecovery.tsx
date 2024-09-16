import "./css/PasswordRecovery.css";
import img from "../assets/logo.png";
import { useState } from "react";
import { forgotpassword } from "../services/authService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function PasswordRecovery() {
  const [passwordrecovery, setPasswordRecovery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handlePasswordRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    const messageRecovery = await forgotpassword(passwordrecovery);

    alert(messageRecovery.message);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const messageRecovery = await forgotpassword(passwordrecovery);
    alert(messageRecovery.message);
    try {
      const userExist = await login(email, password);
      //si las credenciales son correctas
      if (userExist._id) {
        if (remember) {
          localStorage.setItem("email", email);
          localStorage.setItem("password", password);
          localStorage.setItem("remember", "true");
        } else {
          localStorage.removeItem("email");
          localStorage.removeItem("password");
          localStorage.removeItem("remember");
        }

        sessionStorage.setItem("token", userExist.token);
        sessionStorage.setItem("auth", "true");

        dispatch(setUser(userExist));
        /* console.log("User to dispatch:", userExist); */

        //redireccionar
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      alert("Usario o contraseña incorrecta.");
    }
  };

  return (
    <>
      <div className="containerPasswordRecovery">
        <div className="recoveryCard">
          <div className="recoveryTitle">
            <div className="recoveryLogo">
              <img src={img} alt="NoabankLogo" />
            </div>
            <h1>Olvidaste tu contraseña</h1>
          </div>
          <div className="recoveryForm">
            <form action="" onSubmit={handlePasswordRecovery}>
              <div className="recoveryInput">
                <p>
                  Ingresa tu correo electronico y te enviaremos un correo para
                  que resetees tu contraseña
                </p>
                <input
                  type="email"
                  id="email"
                  className="forminput"
                  value={passwordrecovery}
                  onChange={(e) => setPasswordRecovery(e.target.value)}
                />
              </div>
              <button type="submit">Enviar</button>
            </form>
            <div>
              <form action="">
                <input
                  type="text"
                  placeholder="Ingresa tu clave"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button type="submit">Ingresar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PasswordRecovery;
