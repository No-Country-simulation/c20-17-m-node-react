import { Link } from "react-router-dom";

function LoginForm() {
  return (
    <>
      <div className="container-fluid h-100 p-0 d-flex flex-column align-items-center justify-content-center text-bg-dark">
        <h1>Hola</h1>
        <Link to="/dashboard" state={{ name: "Kurt" }}>
          Ingresar
        </Link>
      </div>
    </>
  );
}

export default LoginForm;
