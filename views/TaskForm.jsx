"use client";

import React, { useState } from "react";
import styles from "./tasks.module.css";

const TaskForm = ({ onAdd }) => {
  const [task, setTask] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) {
      alert("Task cannot be empty!");
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);
    console.log(task.trim());
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: task.trim() }),
      });

      const result = await response.json();
      setIsSubmitting(false);

      if (result.success) {
        onAdd(result.data);
        console.log(result);
        setTask("");
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error adding task:", error);
      alert("Failed to add task.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input
        type="text"
        className={styles.input}
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter your task..."
        required
      />
      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
