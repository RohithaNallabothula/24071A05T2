import { useState } from "react";

function TodoInput({ addTodo }) {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    addTodo({
      id: Date.now(),
      text,
      completed: false,
      dueDate,
    });

    setText("");
    setDueDate("");
  };

  return (
   <form onSubmit={handleSubmit} className="mb-3">
  <div className="row g-2">
    <div className="col-12">
      <input
        className="form-control"
        type="text"
        placeholder="Enter task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>

    <div className="col-8">
      <input
        className="form-control"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
    </div>

    <div className="col-4 d-grid">
      <button className="btn btn-primary" type="submit">
        Add
      </button>
    </div>
  </div>
</form>

  );
}

export default TodoInput;
