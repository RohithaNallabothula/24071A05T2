import TodoItem from "./TodoItem";

function TodoList({ todos, toggleTodo, deleteTodo, updateTodo }) {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      ))}
    </div>
  );
}

export default TodoList;
