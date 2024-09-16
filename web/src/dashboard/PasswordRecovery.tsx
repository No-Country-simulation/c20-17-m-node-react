import "./css/PasswordRecovery.css";
import img from "../assets/logo.png";
import { useState } from "react";
import { forgotpassword } from "../services/authService";

function PasswordRecovery() {
  const [passwordrecovery, setPasswordRecovery] = useState("");

  const handlePasswordRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    const messageRecovery = await forgotpassword(passwordrecovery);

    alert(messageRecovery.message);
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
              <form action=""></form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PasswordRecovery;
