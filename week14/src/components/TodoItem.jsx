import { useState } from "react";

function TodoItem({ todo, toggleTodo, deleteTodo, updateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);
  const [newDate, setNewDate] = useState(todo.dueDate || "");

  const today = new Date().toISOString().split("T")[0];
  const isOverdue =
    !todo.completed &&
    todo.dueDate &&
    todo.dueDate < today;

  const handleUpdate = () => {
    updateTodo(todo.id, newText, newDate);
    setIsEditing(false);
  };
  return (
  <div
    className={`d-flex justify-content-between align-items-center p-2 mb-2 rounded ${
      isOverdue ? "bg-danger-subtle" : "bg-light"
    }`}
  >
    {isEditing ? (
      <div className="d-flex gap-2 w-100">
        <input
          className="form-control"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
        <input
          className="form-control"
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <button className="btn btn-success" onClick={handleUpdate}>
          Save
        </button>
      </div>
    ) : (
      <>
        <span
          onClick={() => toggleTodo(todo.id)}
          style={{
            cursor: "pointer",
            textDecoration: todo.completed
              ? "line-through"
              : "none",
          }}
          className={isOverdue ? "text-danger" : ""}
        >
          {todo.text}
          {todo.dueDate && ` (Due: ${todo.dueDate})`}
        </span>

        <div className="btn-group">
          <button
            className="btn btn-sm btn-warning"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => deleteTodo(todo.id)}
          >
            Delete
          </button>
        </div>
      </>
    )}
  </div>
);


}

export default TodoItem;
