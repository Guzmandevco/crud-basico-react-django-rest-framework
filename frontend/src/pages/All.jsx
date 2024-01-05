import { useEffect, useState, useContext } from "react";
import { loadData, retrieveUserData } from "../api/connect.api";
import Todo from "../components/Todo";
import { useNavigate } from "react-router-dom";
import { LoggingContext } from "../context/LogginContext";
function All() {
  const { loged, token } = useContext(LoggingContext);
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [userData, setUserData] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(loged);
  useEffect(() => {
    async function getData() {
      try {
        const data = await retrieveUserData(token);
        setTodos(data.todos);
        // alert(JSON.stringify(data.todos));
      } catch (error) {
        console.error("Error al obtener datos:", error);
        // Puedes manejar el error según tus necesidades
      }
    }
    getData();
  }, []);

  //redirect to given 'to' param using useNavigate instance
  const redirect = (to = "/") => {
    navigate(to);
  };
  return (
    <>
      <h3 style={{ textAlign: "center", margin: "20px" }}>{`${
        todos.length
          ? "Aquí están todas sus tareas"
          : "Usted aún no ha creado tareas"
      }`}</h3>
      <div className="todo__container">
        {isAuthenticated ? (
          <>
            {todos.map((todo) => (
              <Todo key={todo.id} data={todo} />
            ))}
          </>
        ) : (
          redirect()
        )}
      </div>
    </>
  );
}

export default All;
