import { editTodo, deleteData, createTodo } from "../api/connect.api";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function Todo({ title, description, id, done }) {
  const navigate = useNavigate();
  const updateState = async (todo) => {
    await createTodo(todo);
    setData({ title: "", description: "", done: false});
    navigate("/all");
  };
  const deleted = () => {
    navigate("/delete/" + id);
  };

  const edit = () => {
    navigate(`/edit/${id}`);
  };

  const [state, setState] = useState({
    title: title,
    description: description,
    done: done
  });

  const toggleCompleted = () => {
    setState({ ...state, done: !state.done });
   // updateState(state);
  };

  return (
    <div className={state.done  ? 'todo done' : 'todo'}>
      <h3>{state.title}</h3>
      <p>{state.description}</p>
      <form action="">
        <label htmlFor="terminado">{state.done ? 'Terminado' : 'Pendiente'}</label>
      
      </form>
      <div className="button__container">
        <button className={"btn warning"} onClick={edit}>
          <i className="fa fa-pencil"></i>
        </button>
        <button className={"btn danger"} onClick={deleted}>
          <i className="fa fa-trash"></i>
        
        </button>
      </div>
    </div>
  );
}

export default Todo;
