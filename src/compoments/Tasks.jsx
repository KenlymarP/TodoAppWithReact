import { useState } from "react";
import iconCross from "../assets/icon-cross.svg";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
const Tasks = ({ task, handleSetComplete, handleDelete }) => {
  const [showBorder, setShowBorder] = useState(false);

  const hoverEnter = () => {
    setShowBorder(true);
  };
  const hoverLeave = () => {
    setShowBorder(false);
  };

  const { id, name, completed } = task;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <li
      ref={setNodeRef}
      style={style}
      className="task"
      onMouseEnter={hoverEnter}
      onMouseLeave={hoverLeave}
    >
      <label htmlFor="" className="task-label">
        <input
          type="checkbox"
          onChange={(e) => {
            handleSetComplete(id);
            e.stopPropagation();
          }}
          checked={completed}
        />
        <div className={`${showBorder ? "gradient-border-wrapper" : ""}`}>
          <div className={`${showBorder ? "gradient-border" : ""}`}></div>
        </div>
      </label>
      <div {...attributes} {...listeners} style={{ cursor: "grab" }}>
        <span className={`${completed ? "task--completed" : ""} task-text`}>
          {name}
        </span>
      </div>
      <button className="button-delete-task">
        <img
          src={iconCross}
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(id);
          }}
          alt="delete task"
        />
      </button>
    </li>
  );
};
export { Tasks };
