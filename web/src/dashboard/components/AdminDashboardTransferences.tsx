import styles from "../css/DashboardTransferences.module.css";
import logoperson from "../../assets/logoperson.svg";
import UserCard from "./UserCard.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { User } from "../../assets/data";

const AdminDashboardTransferences = () => {
  const user = useSelector((state: RootState) => state.user) as User | null;

  /* const handleTransfer = async (e: React.FormEvent) => {
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
  }; */

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
          <h2>Usuarios</h2>
          <div className={styles.transactionTransferences}>
            {user?.allUsers?.map((user) => {
              return (
                <a href="">
                  <UserCard
                    key={user._id}
                    first_name={user.first_name}
                    last_name={user.last_name}
                    account_number={user.account_number}
                    alias={user.alias}
                  />
                </a>
              );
            })}
          </div>
        </div>

        <div className={styles.transactioncontainer}>
          <div className={styles.transactionbackground}></div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardTransferences;
