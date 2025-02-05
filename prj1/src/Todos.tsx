import type { AppDispatch, RootState } from "./store/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos, addTodo, remove } from "./store/todoSlice";
import { Todo } from "./models/todo";
import { useEffect, useState } from "react";

export function Todos() {
  const { todos, loading, error } = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch<AppDispatch>();
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      dispatch(addTodo(newTodo));
      setNewTodo(""); // Pulisce il campo dopo l'invio
    }
  };

  const removeTodo = (el: Todo) => {
    return remove(el);
  };

  return (
    <div>
      {loading && <p>Caricamento...</p>}
      {error && <p>Errore: {error}</p>}
      <div>
        <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Aggiungi un nuovo TODO..." />
        <button onClick={handleAddTodo}>Aggiungi</button>
      </div>

      <h2>Lista di todo</h2>
      <div>
        {todos.map((el) => {
          return (
            <div key={el.id}>
              <span>
                {el.title} {el.id}
              </span>
              <button aria-label="Rimuovi todo" onClick={() => dispatch(removeTodo(el))}>
                Rimuovi
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
