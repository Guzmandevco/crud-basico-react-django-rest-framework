function Home() {
  const isAuthenticated = true;

  return (
    <div style={{ textAlign: "left", margin: "20px" }}>
      <h3 style={{ textAlign: "center", margin: "20px" }}>
        Aquí está su lista de tareas
      </h3>
      <p>
        Aquí podrá llevar un registro y control de las tareas asignadas a su día
        a día.
      </p>
      <br />
      {isAuthenticated ? (
        <>
          <p>
            Centrarse en ser productivo, no en <span>recordar cosas</span>, con
            nuestra aplicación web puede gestionar su tiempo!
          </p>
          <div>
            <i className="fa fa-clock-o"></i>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Home;
