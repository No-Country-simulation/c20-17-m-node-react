import bootstrapimg from "../assets/bootstrap.svg";
import styles from "./css/Dashboard.module.css";
import { useLocation } from "react-router-dom";

interface props {
  name: string;
}

function Dashboard() {
  const location = useLocation();
  const { name } = location.state as props;
  return (
    <>
      <div className="container-fluid h-100 p-0 text-bg-dark">
        {/* <nav className="fixed-top text-bg-dark border display-flex justify-content-between"> */}
        <nav className="navbar bg-body-tertiary p-2" data-bs-theme="dark">
          <div className="container-fluid">
            <div className="navbar-brand">
              <a href="" className="navbar-brand">
                <img
                  src={bootstrapimg}
                  alt="Logo"
                  width="30"
                  height="24"
                  className="d-inline-block align-text-top"
                />
                NoaBank
              </a>
            </div>
            {/* DIV DE NAVEGACION */}
            <div className="d-flex" role="search">
              <ul className={styles.navBar}>
                <li>Inicio</li>
                <li>Operaciones</li>
                <li>
                  <div className={styles.circle}>K</div>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/*-------------------- MAIN ----------------- */}
        <main className="">
          {/* ------------------- BIENVENIDA ----------------- */}
          <div className={styles.welcome}>
            <div>
              <h3>Hola, {name} </h3>
              <p>¿Que vamos a hacer hoy?</p>
            </div>
            <img src={bootstrapimg} alt="" />
          </div>
          {/* -------------------- MOSTRAR CUENTAS CON EL MONTO ------------------- */}
          <div className={styles.accounts}>
            <div className={styles.accountstitle}>
              <h2>Mis cuentas</h2>
              <a>OJO</a>
            </div>

            <div className={styles.account}>
              <div>
                <h6>CUENTAS DE AHORRO</h6>
                <p>**** 9007</p>
              </div>
              <div>
                <span>$ 900.00</span>
                <span>Saldo disponible</span>
              </div>
            </div>
          </div>
          {/* -------------- ULTIMAS TRANFERENCIAS ----------------- */}
          <div className={styles.transactions}>
            <h2>Ultimas Transferencias</h2>
            <div className={styles.transaction}>
              <div className={styles.transactioncard}>
                <div>
                  <h6>Nombre de Propietario</h6>
                  <p>28/08/2024</p>
                </div>
                <div>
                  <p>$ 6</p>
                </div>
              </div>
              <div className={styles.transactioncard}>
                <div>
                  <h6>Nombre de Propietario</h6>
                  <p>28/08/2024</p>
                </div>
                <div>
                  <p>$ 6</p>
                </div>
              </div>
              <div className={styles.transactioncard}>
                <div>
                  <h6>Nombre de Propietario</h6>
                  <p>28/08/2024</p>
                </div>
                <div>
                  <p>$ 6</p>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className={styles.footer}>
          <p>© 2022 NoaBank. Todos los derechos reservados.</p>
        </footer>
      </div>
    </>
  );
}

export default Dashboard;
