import styles from "../css/Dashboard.module.css";
import logoperson from "../../assets/logoperson.svg";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { User } from "../../assets/data";
import DashboarTransferencesCard from "./DashboarTransferencesCard";

function DashboardHome() {
  //const user = useContext(UserContext);
  const [activeEye, setActiveEye] = useState(true);

  const user = useSelector((state: RootState) => state.user) as User | null;
  return (
    <>
      <div className={styles.containerwelcome}>
        <div className={styles.welcome}>
          <div>
            <h3>Hola, {user?.first_name || "Unknown"} </h3>
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
                    <h6>
                      CUENTA{" "}
                      {(user?.account_type || "Unknown")
                        .split("_")[0]
                        .toUpperCase()}
                    </h6>
                    <p>****{(user?.account_number || "Unknown").slice(-4)}</p>
                  </div>
                  <div>
                    <span>
                      $ {activeEye ? user?.account_balance || "nani?" : "****"}
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
                {user?.transfers?.map((transference) => {
                  let color = "";
                  let accountOwner = "";
                  if (user._id === transference.receptor.receptorId) {
                    color = "red";
                    accountOwner = transference.emisor.firstname;
                  } else {
                    color = "green";
                    accountOwner = transference.receptor.firstname;
                  }

                  return (
                    <DashboarTransferencesCard
                      key={transference._id}
                      nombre={accountOwner}
                      fecha={transference.createdAt}
                      monto={transference.mount}
                      color={color}
                    ></DashboarTransferencesCard>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardHome;
