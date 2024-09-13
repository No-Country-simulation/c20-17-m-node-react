import styles from "../css/DashboardTransferences.module.css";
import logoperson from "../../assets/logoperson.svg";
import DashboarTransferencesCard from "./DashboarTransferencesCard";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { User } from "../../assets/data";
import { searchUser } from "../../services/authService";
import { useState } from "react";

const DashboardTransferences = () => {
  const user = useSelector((state: RootState) => state.user) as User | null;
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [transactioncontainer, setTransactioncontainer] =
    useState<boolean>(false);
  const [transactionFound, setTransactionFound] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  console.log(transactionFound);
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setTransactioncontainer(true);
    try {
      const userExist = await searchUser(accountNumber);
      setUserName(`${userExist.data.first_name} ${userExist.data.last_name}`);
      setTransactionFound(true);
    } catch (error) {
      console.error(error);
      setTransactionFound(false);
      // Mostrar mensaje de error si es necesario
    }
  };

  return (
    <div className={styles.containerwelcome}>
      <div className={styles.welcome}>
        <div>
          <h3>Realiza tus Transferencias </h3>
          <p>¿Con quien haremos transacciones?</p>
        </div>
        <img src={logoperson} alt="Logo Persona" />
      </div>
      <div className={styles.containermain}>
        <div className={styles.containerTransferences}>
          <h2>Transferencias</h2>
          <div className={styles.transactionTransferences}>
            {user?.transfers?.map((transference) => {
              const color =
                user._id === transference.receptor.receptorId
                  ? "rgb(270, 71, 71)"
                  : "rgb(71, 158, 71)";
              const accountOwner =
                user._id === transference.receptor.receptorId
                  ? transference.emisor.firstname
                  : transference.receptor.firstname;

              return (
                <DashboarTransferencesCard
                  key={transference._id}
                  nombre={accountOwner}
                  fecha={transference.createdAt}
                  monto={transference.mount}
                  color={color}
                />
              );
            })}
          </div>
        </div>

        <div className={styles.transactioncontainer}>
          <div className={styles.transactionbackground}>
            <div className={styles.transactionsearch}>
              <h2>Transacción</h2>
              <p>Ingresa el número de cuenta</p>
              <input
                type="text"
                placeholder="Número de cuenta"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
              <button onClick={handleSearch}>Buscar</button>
            </div>
            {transactioncontainer && (
              <div>
                {transactionFound && (
                  <div className={styles.transactionfound}>
                    <span>Cuenta encontrada</span>
                    <h5>{userName}</h5>
                    <p>Ingresa el monto a transferir</p>
                    <input type="text" placeholder="Monto a transferir" />
                    <button>Transferir</button>
                  </div>
                )}
                {!transactionFound && (
                  <div className={styles.transactionnotfound}>
                    <span>Cuenta inexistente</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTransferences;
