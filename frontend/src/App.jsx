import "./App.css";
import { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import CreateTodo from "./pages/CreateTodo";
import All from "./pages/All";
import RegisterView from './pages/RegisterUser'
import LoginView from './pages/LoginView'
import NotFoundPage from "./pages/Page404";
import EditTodo from "./pages/EditView";
import Confirm from "./pages/Confirm";
import { retrieveUserData } from './api/connect.api';
import { LoggingContext } from './context/LogginContext.jsx';

function App() {
  const getToken = () => localStorage.getItem('jwt');
  const {setToken, token, setLoged} = useContext(LoggingContext);
  const [sessionId, setSessionId] = useState(getToken() || null);
  useEffect(() => {
    async function getData() {
      try {
        const data = await retrieveUserData(token);
        setTodos(data.todos);
        //alert(JSON.stringify(data.todos))
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    }
    if(sessionId) {
      setToken(sessionId);
      setLoged(true);
    } else {
      setLoged(false);
    }
    getData();
  }, []);
  
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/create" element={<CreateTodo />}></Route>
          <Route path="/register" element={<RegisterView />}></Route>
          <Route path="/login" element={<LoginView />}></Route>
          <Route path="/all" element={<All />}></Route>
          <Route path="/edit/:id" element={<EditTodo />}></Route>
          <Route path="/delete/:id" element={<Confirm />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
        <div className="todo__container"></div>
      </BrowserRouter>
    </>
  );
}

export default App;
