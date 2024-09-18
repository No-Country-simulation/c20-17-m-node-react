import styles from "../css/AdminDashboardUser.module.css";
import logoperson from "../../assets/logoperson.svg";
import UserCard from "./UserCard.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { User } from "../../assets/data";
import { useState } from "react";
import { AdminUser } from "../../assets/data.tsx";

const AdminDashboardTransferences = () => {
  const user = useSelector((state: RootState) => state.user) as User | null;

  // Estado local para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  // Filtrar usuarios según el término de búsqueda
  const filteredUsers = user?.allUsers?.filter((user) =>
    `${user.first_name} ${user.last_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Función para manejar la selección de un usuario
  const handleUserClick = (user: AdminUser) => {
    setSelectedUser(user); // Almacenar el usuario seleccionado
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
                  />
                </a>
              );
            })}
          </div>
        </div>

        <div className={styles.transactioncontainer}>
          <div className={styles.transactionbackground}>
            {selectedUser && (
              <form>
                <h4>Editar Usuario</h4>
                <label>Nombre:</label>
                <input
                  type="text"
                  value={selectedUser.first_name}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      first_name: e.target.value,
                    })
                  }
                />
                <br />
                <label>Alias:</label>
                <input
                  type="text"
                  value={selectedUser.alias}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, alias: e.target.value })
                  }
                />
                {/* Aquí puedes agregar más campos para modificar los datos */}
                <button type="submit">Guardar Cambios</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardTransferences;
