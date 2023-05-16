import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import CreateTodo from "./pages/CreateTodo";
import All from "./pages/All";
import "./App.css";
import EditTodo from "./pages/Edit";
import Confirm from "./pages/Confirm";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/create" element={<CreateTodo />}></Route>
          <Route path="/all" element={<All />}></Route>
          <Route path="/edit/:id" element={<EditTodo />}></Route>
          <Route path="/delete/:id" element={<Confirm />}></Route>
        </Routes>
        <div className="todo__container"></div>
      </BrowserRouter>
    </>
  );
}

export default App;
