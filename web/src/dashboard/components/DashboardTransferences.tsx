import styles from "../css/Dashboard.module.css";
import logoperson from "../../assets/logoperson.svg";

function DashboardTransferences() {
  return (
    <>
      <div className={styles.containerwelcome}>
        <div className={styles.welcome}>
          <div>
            <h3>Raliza tus Transferencias </h3>
            <p>¿Con quien haremos transacciones?</p>
          </div>
          <img src={logoperson} alt="" />
        </div>
        <div className={styles.containermain}>
          <h1> contenedor de transacciones</h1>
        </div>
      </div>
    </>
  );
}

export default DashboardTransferences;
