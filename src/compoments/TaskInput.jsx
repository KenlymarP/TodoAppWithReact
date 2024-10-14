import { useState } from "react";
const TaskInput = ({ addTask }) => {
  const [name, setName] = useState("");
  const handleTask = (e) => {
    if (e.key.toLowerCase() === "enter") {
      e.preventDefault();
      console.log("Task name:", name);
      addTask(name);
      setName("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      addTask(name);
      setName("");
    }
  };

  return (
    <form className="new-task-form" onSubmit={handleSubmit}>
      <span className="new-task-icon"></span>
      <input
        placeholder="Create new task..."
        className="new-task-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => handleTask(e)}
      />
    </form>
  );
};
export { TaskInput };
