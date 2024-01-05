import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logging } from "../api/connect.api";
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("jwt") || "");
  const navigate = useNavigate();
  const loginAction = async (data) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/users/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const res = await response.json();
      if (res) {
        {
          /*setUser(res.data.user);*/
        }
        // alert(res.token);
        setToken(res.token);
        localStorage.setItem("jwt", res.token);
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
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };
export const useAuth = () => {
  return useContext(AuthContext);
};
