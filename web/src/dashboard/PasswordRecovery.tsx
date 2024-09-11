import "./css/PasswordRecovery.css";
import img from "../assets/logo.png";

function PasswordRecovery() {
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
            <form action="">
              <div className="recoveryInput">
                <p>
                  Ingresa tu correo electronico y te enviaremos un correo para
                  que resetees tu contraseña
                </p>
                <input type="email" id="email" className="forminput" />
              </div>
              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PasswordRecovery;
