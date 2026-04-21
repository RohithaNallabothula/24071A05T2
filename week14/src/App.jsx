import { useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id, newText, newDate) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, text: newText, dueDate: newDate }
          : todo
      )
    );
  };

  return (
  <div className="container d-flex justify-content-center align-items-center min-vh-100">
    <div className="card shadow p-4" style={{ width: "500px" }}>
      <h2 className="text-center mb-4">Todo App</h2>

      <TodoInput addTodo={addTodo} />

      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
    </div>
  </div>
);

}

export default App;
