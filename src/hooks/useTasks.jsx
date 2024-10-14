import { useState, useEffect } from "react";
import { arrayMove } from "@dnd-kit/sortable";
const useTasks = (initialTasks) => {
  const [tasks, setTasks] = useState(initialTasks);
  /* Load tasks from localStorage on component mount */
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  /* Save tasks to localStorage whenever tasks change */
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  /* Add new taks to the list */
  const addTask = (name) => {
    const lastId = tasks.length > 0 ? tasks[tasks.length - 1].id : 1;
    const newTask = {
      id: lastId + 1,
      name,
      completed: false,
    };
    if (newTask.name.trim() === "") {
      alert("Please, write a new task");
    } else {
      const taskList = [...tasks, newTask];
      setTasks(taskList);
    }
  };

  /* Mark tasks as complete */
  const handleSetComplete = (id) => {
    const updatedList = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedList);
  };

  /* Delete tasks from the list */
  const handleDelete = (id) => {
    const updatedList = tasks.filter((task) => task.id !== id);
    setTasks(updatedList);
  };

  /* DragEnd */
  const handleDragEnd = (e) => {
    const { active, over } = e;
    setTasks((task) => {
      const oldIndex = task.findIndex((task) => task.id === active.id);
      const newIndex = task.findIndex((task) => task.id === over.id);
      return arrayMove(task, oldIndex, newIndex);
    });
  };
  /*  Clear all completed tasks*/
  const handleClearComplete = () => {
    const updatedList = tasks.filter((task) => !task.completed);
    setTasks(updatedList);
  };

  return {
    tasks,
    setTasks,
    addTask,
    handleSetComplete,
    handleDelete,
    handleDragEnd,
    handleClearComplete,
  };
};
export { useTasks };
