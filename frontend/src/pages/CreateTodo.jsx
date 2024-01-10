import { useState, useContext } from "react";
import { createTodo } from "../api/connect.api";
import { useNavigate } from "react-router-dom";
function CreateTodo() {
  const { userData } = {};
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const values = {
    title: "",
    description: "",
    done: false,
    expiration_date: null,
    user: parseInt(localStorage.getItem("user_id")),
  };
  const navigate = useNavigate();
  const [data, setData] = useState(values);
  const addTodo = async (todo) => {
    await createTodo(todo);
    setData({
      title: "",
      description: "",
      done: false,
      expiration_date: null,
    });
    navigate("/dashboard");
  };
  return (
    <div className="create__todo ">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ingrese el nombre de la tarea (*)</label>
          <input
            type="text"
            onChange={(e) => setData({ ...data, title: e.target.value })}
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
            onChange={(e) => setData({ ...data, description: e.target.value })}
          ></textarea>
        </div>
        <div className="">
          <label> Expiration Date</label>
          <input
            type="date"
            onChange={(e) =>
              setData({ ...data, expiration_date: e.target.value })
            }
            value={data.expiration_date}
          />
        </div>
        <div>
          <input
            type="checkbox"
            checked={data.done}
            onChange={(e) => setData({ ...data, done: !data.done })}
          />
        </div>
        <button type="submit" onClick={() => addTodo(data)}>
          Crear
        </button>
      </form>
    </div>
  );
}

export default CreateTodo;
