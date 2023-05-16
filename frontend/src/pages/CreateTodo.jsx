import { useState } from "react";
import { createTodo } from "../api/connect.api";
import { useNavigate } from "react-router-dom";

function CreateTodo() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const values = {
    title: "",
    description: "",
  };
  const navigate = useNavigate();
  const [data, setData] = useState(values);
  const addTodo = async (todo) => {
    await createTodo(todo);
    setData({ title: "", description: "" });
    navigate("/all");
  };
  return (
    <div className="create__todo ">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ingrese el nombre de la tarea (*)</label>
          <input
            type="text"
            onChange={(e) =>
              setData({ title: e.target.value, description: data.description })
            }
            required
            placeholder="Reunión con proveedores"
            value={data.title}
          />
        </div>
        <div>
          <label>Ingrese la descripción de la tarea (*)</label>
          <textarea
            placeholder="Ingrese la descripción de la tarea"
            cols="30"
            rows="10"
            value={data.description}
            onChange={(e) =>
              setData({ title: data.title, description: e.target.value })
            }
          ></textarea>
        </div>
        <div>
          <input type="checkbox" />
        </div>
        <button type="submit" onClick={() => addTodo(data)}>
          Crear
        </button>
      </form>
    </div>
  );
}

export default CreateTodo;
