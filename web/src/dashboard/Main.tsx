/* interface props {
  children: JSX.Element;
  de: string;
} */

function Home(/* { children, de }: props */) {
  return (
    <>
      <div className="container-fluid h-100 p-0 d-flex align-items-center justify-content-center text-bg-dark home">
        <h1>Hola</h1>
      </div>
    </>
  );
}

export default Home;
