import React, { useContext } from "react";
import { Header } from "./compoments/Header";
import { ThemeContext } from "./compoments/themeContext";
import { TaskInput } from "./compoments/TaskInput";
import { Tasklist } from "./compoments/TaskList";
import { Footer } from "./compoments/Footer";
import { TaskListFooter } from "./compoments/TaskListFooter";
import { TaskFilters } from "./compoments/Filters";
import { useTasks } from "./hooks/useTasks";
import { useFilters } from "./hooks/useFilters";
import "./App.css";

function App() {
  /* Toggle light and dark mode */
  const { isLight } = useContext(ThemeContext);

  /* Load the default To Do tasks */
  const initialTasks = [
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
  ];
  const {
    tasks,
    addTask,
    handleSetComplete,
    handleDelete,
    handleDragEnd,
    handleClearComplete,
  } = useTasks(initialTasks);
  const { filter, filteredTasks, handleChangeFilter, itemsLeft } =
    useFilters(tasks);

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
