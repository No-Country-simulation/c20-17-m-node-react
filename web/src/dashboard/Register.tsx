import { useState } from "react";
import "./css/Register.css";

function Register() {
  // Declaración del estado para mostrar u ocultar la contraseña
  const [showPassword, setShowPassword] = useState(false);

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container-fluid h-100 p-0 d-flex flex-column align-items-center justify-content-center text-bg-dark">
      <div className="register-card">
        <h1 className="register-title">Regístrate</h1>
        <form className="register-form">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="name">First Name</label>
              <input type="text" id="name" className="form-control" placeholder="Ingresa tu nombre" />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="apellido">Last Name</label>
              <input type="text" id="apellido" className="form-control" placeholder="Ingresa tus apellidos" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" className="form-control" placeholder="Ingresa tu correo electrónico" />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" className="form-control" placeholder="Ingresa tu Dirección" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="password">Create Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-control"
                placeholder="Ingresa tu contraseña"
              />
              <button
                type="button"
                className="btn-toggle-password"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="passwordx2">Confirm Password</label>
              <input
                type="password"
                id="passwordx2"
                className="form-control"
                placeholder="Ingresa tu contraseña de nuevo"
              />
            </div>
          </div>
          <div className="form-group">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              Creating your account and you are accepting <a href="#">Terms & Conditions.</a>
            </label>
          </div>
          <button type="submit" className="btn btn-primary">Create Account</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
