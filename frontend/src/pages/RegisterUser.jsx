import { useState } from "react";
import { register } from "../api/connect.api";
import { useNavigate } from "react-router-dom";

function RegisterView() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const userData = {
    name: "",
    email: "",
    password: "",
    username: ""
  };
  const navigate = useNavigate();
  const [data, setData] = useState(userData);
  const userRegister = async (dataUser) => {
    await register(dataUser);
    setData({ name: "", email: "",  password: "", username:""});
    navigate("/login");
  };
  return (
    <div className="create__todo ">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ingrese su email  (*)</label>
          <input
            type="email"
            onChange={(e) =>
              setData({...data, email: e.target.value})
            }
            required
            placeholder="Ej: suemail@gmail.com"
            value={data.email}
          />
        </div>
        <div>
          <label>Ingrese un nombre de usuario (*)</label>
          <input type="text" placeholder="Ej: Alan Brito" onChange={(e) => setData({...data, username: e.target.value})}/>
        </div> 
        <div>
          <label>Ingrese su nombre (*)</label>
          <input type="text" placeholder="Ej: Luis Peréz" onChange={(e) => setData({...data, name: e.target.value})}/>
        </div> 
        <div>
          <label>Ingrese una contraseña (*)</label>
          <input type="password" placeholder="Ej: **********" value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
        </div>
        { /*<div className="flex">
          <label>Acepto los terminos y condiciones (*)</label>
          <input type="checkbox" checked={data.done} onChange = {e => setData({...data, done: !data.done}) } />
        </div> */ }
        <button type="submit" onClick={() => userRegister(data)}>
          Registrarme
        </button>
      </form>
    </div>
  );
}

export default RegisterView;
