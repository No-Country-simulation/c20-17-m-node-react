import "./css/FallBack.css";

function FallBack() {
  return (
    <>
      <div className="containerFallBack">
        <div className="d-flex flex-column align-items-center">
          {/* <h1>NoaBank</h1>
          <p>Tu plataforma de banca digital segura y accesible</p> */}
          <div
            className="spinner-border text-secondary"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          ></div>
        </div>
      </div>
    </>
  );
}

export default FallBack;
