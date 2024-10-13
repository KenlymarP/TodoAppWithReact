import { Tasks } from "./Tasks";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DndContext, closestCenter } from "@dnd-kit/core";

const Tasklist = ({
  tasks,
  handleSetComplete,
  handleDelete,
  handleDragEnd,
}) => {
  return (
    <>
      <div className="list-container">
        <form className="task-list-form" onSubmit={(e) => e.preventDefault()}>
          {tasks.length > 0 ? (
            <ul>
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={tasks}
                  strategy={verticalListSortingStrategy}
                >
                  {tasks.map((task) => {
                    return (
                      <Tasks
                        key={task.id}
                        task={task}
                        handleDelete={handleDelete}
                        handleSetComplete={handleSetComplete}
                      />
                    );
                  })}
                </SortableContext>
              </DndContext>
            </ul>
          ) : (
            <p className="no-items-message">No items on the list</p>
          )}
        </form>
      </div>
    </>
  );
};

export { Tasklist };
