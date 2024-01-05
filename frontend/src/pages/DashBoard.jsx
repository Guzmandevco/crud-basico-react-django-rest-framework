import { useEffect, useState, useContext } from "react";
import { loadData, retrieveUserData } from "../api/connect.api";
import Todo from "../components/Todo";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

function DashBoard() {
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [userData, setUserData] = useState(null);
  let isAuthenticated = true;
  useEffect(() => {
    async function getData() {
      try {
        const { data } = await retrieveUserData(token);
        setTodos(data.todos);

        alert(token);
      } catch (error) {
        console.error("Error al obtener datos:", error);
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

export default DashBoard;
