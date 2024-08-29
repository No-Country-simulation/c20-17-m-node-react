//import { Link } from "react-router-dom";
/* 
<h1>Hola</h1>
        <Link to="/dashboard" state={{ name: "Kurt" }}>
          Ingresar
        </Link> */
import { FormEvent } from "react";
import "../css/Login.css";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isAuthenticated = true;
    if (isAuthenticated) {
      navigate("/dashboard", { state: { name: "Kurt" } });
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <>
      <div className="container-fluid h-100 p-0 d-flex flex-column align-items-center justify-content-center text-bg-dark">
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="input-box">
              <input type="text" placeholder="Username" required />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input type="password" placeholder="Password" required />
              <FaLock className="icon" />
            </div>
            <div className="remember-forgot">
              <label>
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#">Forgot password</a>
            </div>

            <button type="submit">Login</button>

            <div className="register-link">
              <p>
                Haz olvidado tu contraseña? <a href="#">Regístrate</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
