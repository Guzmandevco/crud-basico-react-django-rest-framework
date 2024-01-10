import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { logging } from "../api/connect.api";
=======
//import jwt from "jsonwebtoken";
>>>>>>> auth
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  const loginAction = async (data) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res) {
<<<<<<< HEAD
        {
          /*setUser(res.data.user);*/
        }
        // alert(res.token);
        setToken(res.token);
        localStorage.setItem("jwt", res.token);
=======
        setUser(res.username);
        setToken(res.access);
        setIsAuth(true);
        //alert(JSON.stringify(res.id));
        localStorage.setItem("user", res.username);
        localStorage.setItem("jwt", res.access);
        localStorage.setItem("user_id", res.id);
>>>>>>> auth
        navigate("/dashboard");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      navigate("/test");
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ isAuth, setIsAuth, token, user, loginAction, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };
<<<<<<< HEAD
=======

>>>>>>> auth
export const useAuth = () => {
  return useContext(AuthContext);
};
