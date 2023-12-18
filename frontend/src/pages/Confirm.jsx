import { useEffect, useState } from "react";
import { getTodo } from "../api/connect.api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { deleteData } from "../api/connect.api";
function Confirm() {
  const params = useParams();
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(true);

  const [todo, setTodo] = useState({});
  const onDelete = async () => {
    if (confirm) {
      await deleteData(params.id);
      setTimeout(() => {
        navigate("/all");
      }, 500);
    }
  };
  const onCancel = () => {
    setConfirm(false);
    setTimeout(() => {
      navigate("/all");
    }, 500);
  };
  useEffect(() => {
    async function onLoad() {
      if (params.id) {
        let data = await getTodo(params.id);
        setTodo({ ...data.data });
      }
    }
    onLoad();
  }, []);

  return (
    <div className="card__confirm">
      <h4>Desea eliminar esta tarea ??</h4>
      <p>{todo.title}</p>
      <div>
        <button className="btn success" onClick={() => onDelete()}>
          Confirmar
        </button>
        <button className="btn warning" onClick={() => onCancel()}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default Confirm;
