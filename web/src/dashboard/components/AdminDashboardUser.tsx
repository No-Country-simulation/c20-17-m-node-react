import styles from "../css/AdminDashboardUser.module.css";
import logoperson from "../../assets/logoperson.svg";
import UserCard from "./UserCard.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { User } from "../../assets/data";
import { useState } from "react";
import { AdminUser } from "../../assets/data.tsx";

const AdminDashboardUser = () => {
  const user = useSelector((state: RootState) => state.user) as User | null;
  console.log(user?.allUsers);
  //Datos del Usuario
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [mount, setMount] = useState(0);
  const [isActive, setActive] = useState(false);

  // Estado local para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  // Filtrar usuarios según el término de búsqueda
  const filteredUsers = user?.allUsers?.filter((user) =>
    `${user.first_name} ${user.last_name} ${user.account_number} ${user.alias}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Función para manejar la selección de un usuario
  const handleUserClick = (user: AdminUser) => {
    setSelectedUser(user); // Almacenar el usuario seleccionado
    setActive(user.isActive); // Almacenar el estado activo/inactivo
    setName(user.first_name);
    setLastName(user.last_name);
    setEmail(user.email);
    setPhone(user.phone);
    setMount(user.account_balance);
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
          <div className={styles.search}>
            <h2>Usuarios</h2>
            <input
              type="text"
              id="search"
              placeholder="Buscar usuario"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className={styles.transactionTransferences}>
            {filteredUsers?.map((user) => {
              return (
                <a
                  href="#"
                  key={user._id}
                  onClick={() => handleUserClick(user)}
                >
                  <UserCard
                    key={user._id}
                    first_name={user.first_name}
                    last_name={user.last_name}
                    account_number={user.account_number}
                    alias={user.alias}
                    type={user.account_type}
                  />
                </a>
              );
            })}
          </div>
        </div>

        <div className={styles.transactioncontainer}>
          <div className={styles.transactionbackground}>
            <h4>Editar Usuario</h4>
            {selectedUser && (
              <form>
                <label>Nombre:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <br />
                <label>Apellido:</label>
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <br />
                <label>Email:</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <label>Telefono:</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <br />
                <label>Monto de Cuenta:</label>
                <input
                  type="text"
                  value={mount}
                  onChange={(e) => setMount(parseFloat(e.target.value))}
                />
                <br />
                <label>Estado:</label>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    id="toggle"
                    checked={isActive} // Mostrar si está activo o no
                    onChange={() => setActive(!isActive)} // Cambiar el estado al hacer clic
                  />
                  <span className={styles.slider}></span>
                </label>

                <br />
                <button type="submit">Guardar Cambios</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardUser;
