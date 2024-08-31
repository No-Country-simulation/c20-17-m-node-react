import "../css/Login.css";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import users from "../../assets/data";

function LoginForm() {
  //useNavigate para poder redireccionar
  const navigate = useNavigate();
  //creamos useState para email, password y recordardatos
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  //useEffect para leer el localStorage y verificar si existen datos preguardados
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    const savedRemenber = localStorage.getItem("remember") === "true";

    if (savedRemenber) {
      setEmail(savedEmail || "");
      setPassword(savedPassword || "");
      setRemember(true);
    }
  }, []);

  //funcion para manejar el submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //validar credenciales
    const userExist = users.find(
      (user) => user.email === email && user.password === password
    );

    //si las credenciales son correctas
    if (userExist) {
      if (remember) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("remember", "true");
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        localStorage.removeItem("remember");
      }

      navigate("/dashboard", { state: { name: userExist.name } });
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
                Remember me
              </label>
              <a href="#">¿Olvidaste la Contraseña?</a>
            </div>

            <button type="submit">Login</button>

            <div className="register-link">
              <p>
                ¿Aún no estas registrado? <a href="#">Regístrate</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
