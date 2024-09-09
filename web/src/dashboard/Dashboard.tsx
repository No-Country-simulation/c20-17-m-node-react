import logoperson from "../assets/logoperson.svg";
import styles from "./css/Dashboard.module.css";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoimg from "../assets/logo.png";
//import DashboarTransferencesCard from "./components/DashboarTransferencesCard";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Dashboard() {
  const location = useLocation();
  const user = location.state?.user;
  const navigate = useNavigate();
  const [activeEye, setActiveEye] = useState(true);

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("auth");
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  function handleLogout() {
    sessionStorage.removeItem("auth"); // Elimina el estado de autenticación
    navigate("/");
  }
  /* const transferencia = transferences.filter(
    (transference) =>
      transference.cuentafrom === user.cuentas[0].number ||
      transference.cuentato === user.cuentas[0].number
  );

  const recentTransferences = transferencia
    .slice(0, 3)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); */

  /* function getUserByAccountNumber(accountNumber: string): string {
    const user = users.find((user) =>
      user.cuentas.some((cuenta) => cuenta.number === accountNumber)
    );
    return user ? user.name : "Desconocido";
  } */

  //console.log(recentTransferences);
  return (
    <>
      <div className={styles.container}>
        <div>
          <nav className="navbar bg-body-tertiary p-2" data-bs-theme="dark">
            <div className="container-fluid" style={{ maxWidth: "1130px" }}>
              <div className="navbar-brand">
                <a className={styles.navbarBrand}>
                  <div className={styles.containerlogo}>
                    <div className={styles.logo}>
                      <img
                        src={logoimg}
                        alt="Logo"
                        className="d-inline-block align-text-top"
                      />
                    </div>
                    <p>NoaBank</p>
                  </div>
                </a>
              </div>
              {/* DIV DE NAVEGACION */}
              <div className="d-flex gap-3" role="search">
                <input type="checkbox" id={styles.menu} className="d-none" />
                <ul className={styles.navBar}>
                  <li>Inicio</li>
                  <li>
                    <Link to="/">Transferencias</Link>
                  </li>
                  <li>
                    <a onClick={handleLogout}>Cerrar sesion</a>
                  </li>
                </ul>

                <label htmlFor={styles.menu}>
                  <div className={styles.circle}>
                    {user.first_name.slice(0, 1).toUpperCase()}
                  </div>
                </label>
              </div>
            </div>
          </nav>

          {/*-------------------- MAIN ----------------- */}
          <main className={styles.main}>
            {/* ------------------- BIENVENIDA ----------------- */}
            <div className={styles.containerwelcome}>
              <div className={styles.welcome}>
                <div>
                  <h3>Hola, {user.first_name} </h3>
                  <p>¿Que vamos a hacer hoy?</p>
                </div>
                <img src={logoperson} alt="" />
              </div>
              {/* -------------------- MOSTRAR CUENTAS CON EL MONTO ------------------- */}
              <div className={styles.containermain}>
                <div className={styles.articles}></div>
                <div className={styles.accountscontainer}>
                  <div className={styles.accounts}>
                    <div className={styles.accountstitle}>
                      <h2>Mis cuentas</h2>
                      <a
                        className={styles.eye}
                        onClick={() => setActiveEye(!activeEye)}
                      >
                        {activeEye ? <FaEye /> : <FaEyeSlash />}
                      </a>
                    </div>

                    <a href="" className={styles.accountancla}>
                      <div className={styles.account}>
                        <div>
                          <h6>CUENTA {user.account_type.toUpperCase()}</h6>
                          <p>****{user.account_number}</p>
                        </div>
                        <div>
                          <span>
                            $ {activeEye ? user.account_balance : "****"}
                          </span>
                          <span>Saldo disponible</span>
                        </div>
                      </div>
                    </a>
                  </div>
                  {/* -------------- ULTIMAS TRANFERENCIAS ----------------- */}
                  <div className={styles.transactions}>
                    <h2>Ultimas Transferencias</h2>
                    <div className={styles.transaction}>
                      {/* recentTransferences.map((transference) => {
                      const accountNumber =
                        transference.cuentafrom === user.cuentas[0].number
                          ? transference.cuentato
                          : transference.cuentafrom;

                      const accountOwner =
                        getUserByAccountNumber(accountNumber);
                      const color =
                        accountNumber === transference.cuentato
                          ? "red"
                          : "green";
                      return (
                        <DashboarTransferencesCard
                          key={transference.id}
                          nombre={accountOwner}
                          fecha={new Date(transference.date)}
                          monto={transference.monto}
                          color={color}
                        ></DashboarTransferencesCard>
                      );
                    }) */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <footer className={styles.footer}>
            <p>© 2024 NoaBank. Todos los derechos reservados.</p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
