import styles from "../css/DashboardTransferences.module.css";
import logoperson from "../../assets/logoperson.svg";
import DashboarTransferencesCard from "./DashboarTransferencesCard";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { User } from "../../assets/data";

function DashboardTransferences() {
  const user = useSelector((state: RootState) => state.user) as User | null;
  return (
    <>
      <div className={styles.containerwelcome}>
        <div className={styles.welcome}>
          <div>
            <h3>Realiza tus Transferencias </h3>
            <p>¿Con quien haremos transacciones?</p>
          </div>
          <img src={logoperson} alt="" />
        </div>
        <div className={styles.containermain}>
          <div className={styles.containerTransferences}>
            <h2>Transferencias</h2>
            <div className={styles.transactionTransferences}>
              {user?.transfers?.map((transference) => {
                let color = "";
                let accountOwner = "";
                if (user._id === transference.receptor.receptorId) {
                  color = "rgb(270, 71, 71)";
                  accountOwner = transference.emisor.firstname;
                } else {
                  color = "rgb(71, 158, 71)";
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

          <div className={styles.transactioncontainer}>
            <div className={styles.transactionbackground}>
              <div className={styles.transactionsearch}>
                <h2>Transaccion</h2>
                <p>Ingresa el numero de Cuenta</p>
                <input type="text" placeholder="Numero de cuenta" />
                <button>Buscar</button>
              </div>
              <div className={styles.transactionfound}>
                <span>Cuenta inexistente</span>
                <h5>Nombre</h5>
                <p>Ingresa el monto a transferir</p>
                <input type="text" placeholder="Numero de cuenta" />
                <button>Buscar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardTransferences;
