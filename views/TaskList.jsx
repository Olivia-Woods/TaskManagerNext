import React from "react";
import TaskItem from "./TaskItem";
import styles from "./tasks.module.css";

const TaskList = ({ tasks, onDelete, onToggleDone, onTogglePriority }) => {
  if (!tasks || tasks.length === 0) {
    return <p>No tasks available. Add one above!</p>;
  }

  return (
    <ul className={styles["task-list"]}>
      {tasks.map((task) => (
        <li key={task._id}>
          <TaskItem
            task={task}
            onDelete={() => onDelete(task._id)}
            onToggleDone={() => onToggleDone(task._id)}
            onTogglePriority={() => onTogglePriority(task._id)}
          />
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
