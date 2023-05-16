import { useState, useEffect } from "react";
import { editTodo, getTodo } from "../api/connect.api";
import { useNavigate, useParams } from "react-router-dom";

function EditTodo({ todo }) {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState({});
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
      }
    }
    get();
  }, []);
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
        <button type="submit" onClick={() => onSubmit(data)}>
          {`${params.id ? 'Guardar Cambios' : 'Crear'}`}
        </button>
      </form>
    </div>
  );
}

export default EditTodo;
