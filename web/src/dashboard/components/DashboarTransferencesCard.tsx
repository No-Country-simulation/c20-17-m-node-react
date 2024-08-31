import styles from "../css/Dashboard.module.css";
interface props {
  nombre: string;
  fecha: Date;
  monto: number;
  color: string;
}
function DashboarTransferencesCard({ nombre, fecha, monto, color }: props) {
  return (
    <>
      <div className={styles.transactioncard}>
        <div>
          <h6>{nombre}</h6>
          <p>{fecha.toLocaleDateString()}</p>
        </div>
        <div>
          <p style={{ color: color, fontWeight: "bold" }}>
            {color === "red" ? "-" : "+"}$ {monto}
          </p>
        </div>
      </div>
    </>
  );
}

export default DashboarTransferencesCard;
