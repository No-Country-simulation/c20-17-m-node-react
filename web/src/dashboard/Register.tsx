import { useState } from "react";
import "./css/Register.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { register } from "../services/authService";

function Register() {
  // Declaración del estado para mostrar u ocultar la contraseña
  const [showPassword, setShowPassword] = useState(false);

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  function openTab(tabname: string) {
    const lastname = document.getElementById("lastname");
    const birthday = document.getElementById("birthdaycontainer");
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

  //useNavigate para poder redireccionar
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const type = String(
      document.querySelector(".active")?.innerHTML.toLocaleLowerCase()
    );

    const first_name = (document.getElementById("name") as HTMLInputElement)
      .value;
    const last_name = (document.getElementById("apellido") as HTMLInputElement)
      .value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const address = (document.getElementById("address") as HTMLInputElement)
      .value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const date_of_birth = String(
      (document.getElementById("birthday") as HTMLInputElement).value
    );
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    const confirmpassword = document.getElementById(
      "passwordx2"
    ) as HTMLInputElement;

    if (password !== confirmpassword.value) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      console.log("estoy en el try: " + last_name);
      const createUser = await register(
        first_name,
        last_name,
        email,
        address,
        phone,
        date_of_birth,
        password,
        type
      );
      if (createUser.status === 409) {
        alert(createUser.data.message);
      } else {
        // Aquí manejarías la creación exitosa del usuario
        alert(createUser.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert("Un error a ocurrido. Intentalo otra vez.");
    }
  };

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

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="name">Nombre:</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Ingresa tu nombre"
                  required
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
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="address">Direccion:</label>
                <input
                  type="text"
                  id="address"
                  className="form-control"
                  placeholder="Ingresa tu Dirección"
                  required
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
                  maxLength={9}
                  minLength={9}
                  required
                />
              </div>
              <div className="form-group col-md-6" id="birthdaycontainer">
                <label htmlFor="email">Fecha de Nacimiento:</label>
                <input type="date" id="birthday" className="form-control" />
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
                  minLength={6}
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
                  minLength={6}
                  required
                />
              </div>
            </div>
            <div className="form-group terms">
              <input type="checkbox" id="terms" required />
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
