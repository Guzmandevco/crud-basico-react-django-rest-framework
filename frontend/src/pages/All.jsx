import { useEffect, useState } from "react";
import { loadData } from "../api/connect.api";
import Todo from "../components/Todo";
function All() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    async function getData() {
      const data = await loadData();
      setTodos(data.data);
    }
    getData();
  }, []);
  return (
    <>
      <h3 style={{ textAlign: "center", margin: "20px" }}>{`${
        todos.length ? "Aquí están todas sus tareas" : "Usted aún no ha creado tareas"
      }`}</h3>
      <div className="todo__container">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            title={todo.title}
            description={todo.description}
            id={todo.id}
          />
        ))}
      </div>
    </>
  );
}

export default All;
