import { editTodo, deleteData } from "../api/connect.api";
import { useNavigate } from "react-router-dom";
function Todo({ title, description, id }) {
  const navigate = useNavigate();
  const deleted = function () {
    navigate("/delete/" + id);
  };

  const edit = async function () {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="todo">
      <h3>{title}</h3>
      <p>{description}</p>
      <form action="">
        <label htmlFor="terminado">Terminado</label>
        <input type="checkbox" />
      </form>
      <div className="button__container">
        <button className={"btn warning"} onClick={() => edit()}>
          Editar
        </button>
        <button className={"btn danger"} onClick={() => deleted()}>
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default Todo;
