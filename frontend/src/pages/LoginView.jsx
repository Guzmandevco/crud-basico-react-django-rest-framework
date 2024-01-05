import { useState, useContext } from "react";
import { logging } from "../api/connect.api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
function LoginView() {
  const navigate = useNavigate();
  const { loginAction } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const loggIn = async (userData) => {
    // const res = await logging(userData);
    loginAction(userData);
  };

  return (
    <div className="create__todo ">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ingrese su email (*)</label>
          <input
            type="email"
            onChange={handleEmailChange}
            value={email}
            placeholder="Ej: username@gmail.com"
          />
        </div>
        <div>
          <label>Ingrese su contraseña (*)</label>
          <input
            type="password"
            placeholder="***********"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="flex">
          <label>Acepto los terminos y condiciones (*)</label>
          <input type="checkbox" />
        </div>
        <button type="submit" onClick={() => loggIn({ email, password })}>
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginView;
