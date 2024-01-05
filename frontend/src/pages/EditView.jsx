import { useState, useEffect } from "react";
import { editTodo, getTodo } from "../api/connect.api";
import { useNavigate, useParams } from "react-router-dom";
import formatDate from "../utils/formatDate";
function EditTodo({ todo }) {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState({
    title: "",
    description: "",
    done: false,
    creation_date: null,
    expiration_date: null,
    user: parseInt(localStorage.getItem("user_id")),
  });
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const onSubmit = async (todo) => {
    let data = await editTodo(params.id, todo);
    navigate("/all");
  };
  useEffect(() => {
    async function get() {
      if (params.id) {
        let todo = await getTodo(params.id);
        setData(todo.data);
        //  alert(JSON.stringify(todo.data));
      }
    }
    //get();
  }, []);
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
            cols="30"
            rows="10"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          ></textarea>
        </div>

        <div>
          <label>Ingrese la fecha maxima para realizar esta tarea. (*)</label>
          <input
            type="date"
            value={formatDate(data.expiration_date)}
            onChange={(e) =>
              setData({ ...data, expiration_date: e.target.value })
            }
          />
        </div>

        <div className="flex">
          <label>{data.done ? "Terminado" : "Pendiente"}</label>
          <input
            type="checkbox"
            checked={data.done}
            onChange={(e) => setData({ ...data, done: !data.done })}
          />
        </div>
        <button type="submit" onClick={() => onSubmit(data)}>
          {`${params.id ? "Guardar Cambios" : "Crear"}`}
        </button>
      </form>
    </div>
  );
}

export default EditTodo;
