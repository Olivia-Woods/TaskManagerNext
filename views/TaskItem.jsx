import React, { useState } from "react";
import styles from "./tasks.module.css";

const TaskItem = ({ task, onDelete, onToggleDone, onTogglePriority }) => {
  return (
    <div
      className={`${styles["task-item"]} ${task.completed ? styles.done : ""} ${
        task.isPriority ? styles.priority : ""
      }`}
    >
      <div className={styles["task-content"]}>
        <span className={styles["task-text"]}>{task.content}</span>{" "}
        <small className={styles.timestamp}>
          {new Date(task.createdAt).toLocaleString()}
        </small>
      </div>

      <div className={styles.buttons}>
        <button
          onClick={() => onToggleDone(task._id)}
          className={styles["done-button"]}
          style={{
            border: "none",
            outline: "none",
            boxShadow: "none",
            background: "none",
          }}
        >
          {task.completed ? "✅" : "✅"}
        </button>
        <button
          onClick={() => onTogglePriority(task._id)}
          className={styles["priority-button"]}
          style={{
            border: "none",
            outline: "none",
            boxShadow: "none",
            background: "none",
          }}
        >
          {task.isPriority ? "⭐" : "⭐"}
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className={styles["delete-button"]}
          style={{
            border: "none",
            outline: "none",
            boxShadow: "none",
            background: "none",
          }}
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
