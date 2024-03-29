import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import CreateTodo from "./pages/CreateTodo";
import DashBoard from "./pages/DashBoard";
import RegisterView from "./pages/RegisterUser";
import LoginView from "./pages/LoginView";
import NotFoundPage from "./pages/Page404";
import EditTodo from "./pages/EditView";
import Confirm from "./pages/Confirm";
<<<<<<< HEAD
import PrivateRoute from "./routes/PrivateRoute";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
=======
import { retrieveUserData } from "./api/connect.api";

function App() {
  const getToken = () => localStorage.getItem("jwt");
  const [sessionId, setSessionId] = useState(getToken() || null);
  useEffect(() => {
    async function getData() {
      try {
        const res = await retrieveUserData(getToken());
        setTodos(res.todos);
        setSessionId(data.token);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    }
    getData();
>>>>>>> auth
  }, []);
  return (
    <>
      <Header />
      {token && <h1>Hola user</h1>}
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/create" element={<CreateTodo />}></Route>
        <Route path="/register" element={<RegisterView />}></Route>

        <Route path="/dashboard" element={<DashBoard />} />
        {/* PrivateRoute envuelve DashBoard */}
        {/*<PrivateRoute path="/dashboard" element={<DashBoard />} /> */}
        <Route path="/login" element={<LoginView />}></Route>
<<<<<<< HEAD
=======
        <Route path="/dashboard" element={<DashBoard />}></Route>
>>>>>>> auth
        <Route path="/edit/:id" element={<EditTodo />}></Route>
        <Route path="/delete/:id" element={<Confirm />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
