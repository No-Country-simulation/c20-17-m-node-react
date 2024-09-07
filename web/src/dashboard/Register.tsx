import { useState } from "react";
import "./css/Register.css";
import { Link } from "react-router-dom";

function Register() {
  // Declaración del estado para mostrar u ocultar la contraseña
  const [showPassword, setShowPassword] = useState(false);

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  function openTab(tabname: string) {
    const lastname = document.getElementById("lastname");
    const birthday = document.getElementById("birthday");
    if (tabname === "empresa") {
      if (lastname && birthday) {
        lastname.style.display = "none";
        birthday.style.display = "none";
      }
    } else {
      if (lastname && birthday) {
        lastname.style.display = "block";
        birthday.style.display = "block";
      }
    }

    const tablinks = document.getElementsByClassName("tablink");
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("active");
    }
    const tab = document.getElementById(tabname);
    if (tab) {
      tab.classList.add("active");
    }
  }

  return (
    <div className="containerRegister">
      <div>
        <div className="containertabs">
          <div className="tabs">
            <div
              className="tablink active"
              id="persona"
              onClick={() => openTab("persona")}
            >
              Persona
            </div>
            <div
              className="tablink"
              id="empresa"
              onClick={() => openTab("empresa")}
            >
              Empresa
            </div>
          </div>
        </div>
        <div className="register-card">
          <h1 className="register-title">Regístrate</h1>

          <form className="register-form">
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="name">Nombre:</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Ingresa tu nombre"
                />
              </div>
              <div className="form-group col-md-6" id="lastname">
                <label htmlFor="apellido">Apellido:</label>
                <input
                  type="text"
                  id="apellido"
                  className="form-control"
                  placeholder="Ingresa tus apellidos"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Ingresa tu correo electrónico"
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="address">Direccion:</label>
                <input
                  type="text"
                  id="address"
                  className="form-control"
                  placeholder="Ingresa tu Dirección"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="address">Telefono:</label>
                <input
                  type="tel"
                  id="phone"
                  className="form-control"
                  placeholder="Ingresa Telefono"
                />
              </div>
              <div className="form-group col-md-6" id="birthday">
                <label htmlFor="email">Fecha de Nacimiento:</label>
                <input type="date" className="form-control" />
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
            <div className="form-group terms">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">
                <p className="text">
                  {" "}
                  Creating your account and you are accepting{" "}
                  <Link to="/termsconditions" target="_blank">
                    Terms & Conditions.
                  </Link>
                </p>
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
