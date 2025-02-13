"use client";

import React, { useState } from "react";
import styles from "./tasks.module.css";

const TaskItem = ({
  task,
  onDelete,
  onToggleDone,
  onTogglePriority,
  onEditTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.content); //

  const handleSaveEdit = () => {
    if (editText.trim()) {
      onEditTask(task._id, editText.trim());
      setIsEditing(false);
    } else {
      alert("Task cannot be empty!");
    }
  };

  return (
    <div
      className={`${styles["task-item"]} ${task.completed ? styles.done : ""} ${
        task.isPriority ? styles.priority : ""
      }`}
    >
      <div className={styles["task-content"]}>
        {isEditing ? (
          <>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className={styles["edit-input"]}
            />
            <button onClick={handleSaveEdit} className={styles["save-button"]}>
              Save
            </button>
          </>
        ) : (
          <>
            <span className={styles["task-text"]}>{task.content}</span>{" "}
            {/* ✅ Fix: Use `content` */}
            <small className={styles.timestamp}>
              {new Date(task.createdAt).toLocaleString()}{" "}
              {/* ✅ Fix: Use `createdAt` */}
            </small>
          </>
        )}
      </div>

      {!isEditing && (
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
            onClick={() => setIsEditing(true)}
            className={styles["edit-button"]}
            style={{
              border: "none",
              outline: "none",
              boxShadow: "none",
              background: "none",
            }}
          >
            ✏️
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
      )}
    </div>
  );
};

export default TaskItem;
