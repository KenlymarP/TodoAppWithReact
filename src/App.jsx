import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Header } from "./compoments/Header";
import { ThemeContext } from "./compoments/themeContext";
import { TaskInput } from "./compoments/TaskInput";
import { Tasklist } from "./compoments/TaskList";
import { Footer } from "./compoments/Footer";
import { TaskListFooter } from "./compoments/TaskListFooter";
import { arrayMove } from "@dnd-kit/sortable";
import { TaskFilters } from "./compoments/Filters";
import "./App.css";

function App() {
  /* Toggle light and dark mode */
  const { isLight } = useContext(ThemeContext);

  /* Load the default To Do tasks */
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Jog around the park 3x",
      completed: false,
    },
    {
      id: 2,
      name: "10 minutes meditation",
      completed: false,
    },
    {
      id: 3,
      name: "Read for 1 hour",
      completed: false,
    },
    {
      id: 4,
      name: "Pick up groceries",
      completed: false,
    },
    {
      id: 5,
      name: "Complete Todo App On Frontend Mentor",
      completed: false,
    },
  ]);

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

  /*  Clear all completed tasks*/
  const handleClearComplete = () => {
    const updatedList = tasks.filter((task) => !task.completed);
    setTasks(updatedList);
  };

  /* Initializing filter status to all */
  const [filter, setFilter] = useState("all");

  /* task filters  */
  const filterTypes = {
    all: tasks,
    active: tasks.filter((task) => !task?.completed),
    completed: tasks.filter((task) => task?.completed),
  };

  /* store the array in a constant */
  const filteredTasks = filterTypes[filter];

  /* change filters for tasks*/
  const handleChangeFilter = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);
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

  /* total tasks */
  const itemsLeft = tasks?.filter((task) => !task.completed).length;

  return (
    <>
      <div className={`${!isLight ? "is-dark-theme" : ""} container`}>
        <div>
          <Header />
          <main>
            <TaskInput addTask={addTask} />
            <Tasklist
              tasks={filteredTasks}
              handleSetComplete={handleSetComplete}
              handleDelete={handleDelete}
              handleDragEnd={handleDragEnd}
            />
            <div className="summary-filters-wrapper">
              <TaskListFooter
                itemsLeft={itemsLeft}
                handleClearComplete={handleClearComplete}
              />
              <TaskFilters
                onChangeFilter={handleChangeFilter}
                filter={filter}
              />
            </div>
            <Footer />
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
