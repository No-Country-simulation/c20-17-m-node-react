import "../css/Login.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { login } from "../../services/authService.tsx";
import { useDispatch } from "react-redux";
import { setUser } from "../../services/userSlice.tsx";
import logoimg from "../../assets/logo.png";

function LoginForm() {
  const dispatch = useDispatch();

  //useNavigate para poder redireccionar
  const navigate = useNavigate();
  //creamos useState para email, password y recordar datos
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  //useEffect para leer el localStorage y verificar si existen datos preguardados
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    const savedRemenber = localStorage.getItem("remember") === "true";

    if (sessionStorage.getItem("auth") === "true") {
      sessionStorage.removeItem("auth");
    }

    if (savedRemenber) {
      setEmail(savedEmail || "");
      setPassword(savedPassword || "");
      setRemember(true);
    }
  }, []);

  //funcion para manejar el submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
        console.log("User to dispatch:", userExist);

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
      <div className="container-fluid h-100 p-0 d-flex flex-column align-items-center justify-content-center text-bg-dark">
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="loginlogo">
              <img src={logoimg} alt="LogoNoaBank" />
            </div>
            <div className="input-box">
              <input
                type="text"
                placeholder="Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FaLock className="icon" />
            </div>
            <div className="remember-forgot">
              <label>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                />
                <p> Remember me</p>
              </label>
              <Link to="/passwordrecovery">¿Olvidaste la Contraseña?</Link>
            </div>

            <button type="submit">Login</button>

            <div className="register-link">
              <p>
                ¿Aún no estas registrado? <Link to="/register">Regístrate</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
