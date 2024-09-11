import styles from "./css/Dashboard.module.css";
//import { UserContext } from "../services/UserContext";
import { Link, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../services/store";
import { clearUser } from "../services/userSlice";
import { User } from "../assets/data";
import logoimg from "../assets/logo.png";

function Dashboard() {
  //const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user) as User | null;

  /* console.log(user);
  console.log("User from Redux:", user); */

  //const user = location.state?.user || {};

  //const [user, setUser] = useState(() => location.state?.user || null);

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("auth");
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  function handleLogout() {
    sessionStorage.removeItem("auth"); // Elimina el estado de autenticación
    dispatch(clearUser(null));
    navigate("/");
  }

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
                  <li>
                    <Link to="/dashboard">Inicio</Link>
                  </li>
                  <li>
                    <Link to="transferences">Transferencias</Link>
                  </li>
                  <li>
                    <a onClick={handleLogout}>Cerrar sesion</a>
                  </li>
                </ul>

                <label htmlFor={styles.menu}>
                  <div className={styles.circle}>
                    {(user?.first_name || "?").slice(0, 1).toUpperCase()}
                  </div>
                </label>
              </div>
            </div>
          </nav>

          {/*-------------------- MAIN ----------------- */}

          <main className={styles.main}>
            <Outlet />
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
