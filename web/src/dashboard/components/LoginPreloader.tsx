interface props {
  fadeout: boolean;
}

function Preloader({ fadeout }: props) {
  return (
    <>
      <div
        className={`container-fluid h-100 p-0 d-flex align-items-center justify-content-center text-bg-dark preloader ${
          fadeout ? "opacity-0" : ""
        }`}
      >
        <div className="d-flex flex-column align-items-center">
          <h1>Bienvenido a NoaBank</h1>
          <p>Tu plataforma de banca digital segura y accesible</p>
          <div
            className="spinner-border text-secondary"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="visually-hidden">Loading... asdhaslfhfhsdfh</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Preloader;
