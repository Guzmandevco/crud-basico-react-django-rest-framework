import { useState } from "react";
import { createTodo } from "../api/connect.api";
import { useNavigate } from "react-router-dom";

function RegisterView() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const values = {
    title: "",
    description: "",
    done: false
  };
  const navigate = useNavigate();
  const [data, setData] = useState(values);
  const addTodo = async (todo) => {
    await createTodo(todo);
    setData({ title: "", description: "", done: false});
    navigate("/all");
  };
  return (
    <div className="create__todo ">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ingrese su email  (*)</label>
          <input
            type="email"
            onChange={(e) =>
              setData({...data, title: e.target.value})
            }
            required
            placeholder="Ej: suemail@gmail.com"
            value={data.title}
          />
        </div>
        <div>
          <label>Ingrese un nombre de usuario (*)</label>
          <input type="text" placeholder="Ej: Alan Brito" />
        </div>
                <div>
          <label>Ingrese una contraseña (*)</label>
          <input type="password" placeholder="Ej: **********" />
        </div>
        <div className="flex">
          <label>Acepto los terminos y condiciones (*)</label>
          <input type="checkbox" checked={data.done} onChange = {e => setData({...data, done: !data.done}) } />
        </div>
        <button type="submit" onClick={() => addTodo(data)}>
          Registrarme
        </button>
      </form>
    </div>
  );
}

export default RegisterView;
