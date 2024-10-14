import { useState } from "react";
/* import { useTasks } from "./useTasks"; */
const useFilters = (tasks) => {
  /* const { tasks, setTasks } = useTasks(); */
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

  /* total tasks */
  const itemsLeft = tasks?.filter((task) => !task.completed).length;

  return {
    filter,
    filteredTasks,
    handleChangeFilter,

    itemsLeft,
  };
};
export { useFilters };
