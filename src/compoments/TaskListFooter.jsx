const TaskListFooter = ({ handleClearComplete, itemsLeft }) => {
  return (
    <div className="task-summary-container">
      <span>{`${itemsLeft} ${itemsLeft === 1 ? "item" : "items"} left`}</span>
      <button onClick={() => handleClearComplete()}>Clear Completed</button>
    </div>
  );
};

export { TaskListFooter };
