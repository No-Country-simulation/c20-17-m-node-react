import "./css/PasswordRecovery.css";
import img from "../assets/logo.png";
import { useState } from "react";
import { forgotpassword, login } from "../services/authService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../services/userSlice";

function PasswordRecovery() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: email recovery, 2: login recovery
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePasswordRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const messageRecovery = await forgotpassword(email);
      alert(messageRecovery.message);
      setStep(2); // Pasar a la siguiente etapa (OTP)
    } catch (error) {
      console.error("Error al enviar el correo de recuperación", error);
      alert("Hubo un error al enviar el correo de recuperación.");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userExist = await login("", "", otp); // Revisar si necesitas enviar email/contraseña aquí
      if (userExist._id) {
        sessionStorage.setItem("token", userExist.token);
        sessionStorage.setItem("auth", "true");
        dispatch(setUser(userExist));
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      alert("OTP incorrecto.");
    }
  };

  return (
    <div className="containerPasswordRecovery">
      <div className="recoveryCard">
        <div className="recoveryTitle">
          <div className="recoveryLogo">
            <img src={img} alt="NoabankLogo" />
          </div>
          <h1>Olvidaste tu contraseña</h1>
        </div>

        {step === 1 && (
          <div className="recoveryForm">
            <form onSubmit={handlePasswordRecovery}>
              <div className="recoveryInput">
                <p>
                  Ingresa tu correo electrónico y te enviaremos un enlace para
                  restablecer tu contraseña.
                </p>
                <input
                  type="email"
                  id="email"
                  className="forminput"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" disabled={!email}>
                Enviar
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Ingresa tu código OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button type="submit" disabled={!otp}>
                Ingresar
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default PasswordRecovery;
