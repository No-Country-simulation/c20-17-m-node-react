import styles from "../css/DashboardTransferences.module.css";
import logoperson from "../../assets/logoperson.svg";
import DashboarTransferencesCard from "./DashboarTransferencesCard";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../services/userSlice.tsx";
import { RootState } from "../../services/store";
import { User } from "../../assets/data";
import { searchUser, updateUser } from "../../services/authService";
import { useState } from "react";
import { transferSave } from "../../services/authService";
import { searchedUser } from "../../assets/data";

const DashboardTransferences = () => {
  const user = useSelector((state: RootState) => state.user) as User | null;

  const [accountNumber, setAccountNumber] = useState<string>("");
  const [transactioncontainer, setTransactioncontainer] =
    useState<boolean>(false);
  const [transactionFound, setTransactionFound] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [mountTransfer, setMountTransfer] = useState<number>(0);
  const [userExist, setUserExist] = useState<searchedUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (accountNumber.trim() === "") {
      alert("Por favor, ingresa un número de cuenta.");
      return;
    }

    // Realizar la búsqueda
    setTransactioncontainer(true);
    try {
      const exist = await searchUser(accountNumber);
      setUserExist(exist);
      setUserName(`${exist.data.first_name} ${exist.data.last_name}`);
      setTransactionFound(true);
    } catch (error) {
      console.error(error);
      setTransactionFound(false);
      // Mostrar mensaje de error si es necesario
    } finally {
      setIsLoading(false);
    }
  };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mountTransfer <= 0) {
      alert("El monto debe ser mayor a 0.");
      return;
    }

    try {
      const createTransfer = await transferSave(
        mountTransfer,
        user?._id ?? "",
        userExist?.data?._id ?? ""
      );

      if (createTransfer.status === 409) {
        alert(createTransfer.data.message);
      } else {
        // Aquí manejarías la creación exitosa de la transferencia
        alert(createTransfer.data.message);
        console.log(user?._id);
        const userUpdate = await updateUser(user?._id ?? "");

        dispatch(setUser(userUpdate));
      }
    } catch (error) {
      console.error(error);
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
                  ? "#479E47"
                  : "#FF4747";
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
              <button onClick={handleSearch} disabled={isLoading}>
                {isLoading ? "Buscando..." : "Buscar"}
              </button>
            </div>
            {transactioncontainer && (
              <div>
                <form action="" onSubmit={handleTransfer}>
                  {transactionFound && (
                    <div className={styles.transactionfound}>
                      <span>Cuenta encontrada</span>
                      <h5>{userName}</h5>
                      <p>Ingresa el monto a transferir</p>
                      <input
                        type="text"
                        placeholder="Monto a transferir"
                        onChange={(e) =>
                          setMountTransfer(Number(e.target.value))
                        }
                      />
                      <button type="submit">Transferir</button>
                    </div>
                  )}
                  {!transactionFound && (
                    <div className={styles.transactionnotfound}>
                      <span>Cuenta inexistente</span>
                    </div>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTransferences;
