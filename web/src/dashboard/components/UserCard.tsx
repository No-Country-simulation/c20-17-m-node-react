import styles from "../css/Dashboard.module.css";
interface props {
  first_name: string;
  last_name: string;
  account_number: string;
  alias: string;
  type: string;
}
function UserCard({
  first_name,
  last_name,
  account_number,
  alias,
  type,
}: props) {
  return (
    <>
      <div className={styles.transactioncard}>
        <div>
          <h6>
            {first_name} {last_name}
          </h6>
          <p>{alias}</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontWeight: "bold", fontSize: "12px" }}>
            {account_number}
          </p>
          <p>{type}</p>
        </div>
      </div>
    </>
  );
}

export default UserCard;
