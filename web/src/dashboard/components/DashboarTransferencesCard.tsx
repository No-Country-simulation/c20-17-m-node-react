import styles from "../css/Dashboard.module.css";
interface props {
  nombre: string;
  fecha: string;
  monto: number;
  color: string;
}
function DashboarTransferencesCard({ nombre, fecha, monto, color }: props) {
  return (
    <>
      <div className={styles.transactioncard}>
        <div>
          <h6>{nombre}</h6>
          <p>{fecha}</p>
        </div>
        <div>
          <p style={{ color: color, fontWeight: "bold" }}>
            {color === "#FF4747" ? "-" : "+"}$ {monto}
          </p>
        </div>
      </div>
    </>
  );
}

export default DashboarTransferencesCard;
