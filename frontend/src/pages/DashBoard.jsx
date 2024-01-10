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
  useEffect(() => {
    async function getData() {
      try {
        const { data } = await retrieveUserData(token);
        setTodos(data.todos);
        // alert(JSON.stringify(data.todos));
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    }
    getData();
  }, [todos]);

  //redirect to given 'to' param using useNavigate instance
  const redirect = (to = "/") => {
    navigate(to);
  };
  return (
    <>
      <div className="todo__container">
        {todos.length ? (
          <>
            {todos.map((todo) => (
              <Todo key={todo.id} data={todo} />
            ))}
          </>
        ) : (
          <p>Usted no a creado Tareas </p>
        )}
      </div>
    </>
  );
}

export default DashBoard;
