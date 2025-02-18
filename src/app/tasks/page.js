"use client";

import { useState, useEffect } from "react";
import TaskForm from "../../../views/TaskForm";
import TaskList from "../../../views/TaskList";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch Tasks from API on Page Load
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks");
        const data = await response.json();
        console.log(data);
        if (data.success) {
          setTasks(data.data);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  // Add Task to MongoDB
  const addTask = (taskContent) => {
    setTasks([...tasks, taskContent]);
  };

  // Delete Task from MongoDB
  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`/api/tasks?id=${taskId}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (result.success) {
        setTasks(tasks.filter((task) => task._id !== taskId));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Toggle Task Completion Status in MongoDB
  const toggleTaskDone = async (taskId) => {
    try {
      const task = tasks.find((task) => task._id === taskId);
      const updatedTask = { ...task, completed: !task.completed };

      const response = await fetch("/api/tasks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: taskId, completed: updatedTask.completed }),
      });

      const result = await response.json();
      if (result.success) {
        setTasks(
          tasks.map((task) => (task._id === taskId ? result.data : task))
        );
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Toggle Task Priority in MongoDB
  const toggleTaskPriority = async (taskId) => {
    try {
      const task = tasks.find((task) => task._id === taskId);
      const updatedTask = { ...task, isPriority: !task.isPriority };

      const response = await fetch("/api/tasks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: taskId,
          isPriority: updatedTask.isPriority,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setTasks(
          tasks.map((task) => (task._id === taskId ? result.data : task))
        );
      }
    } catch (error) {
      console.error("Error updating priority:", error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <TaskForm onAdd={addTask} />
      <TaskList
        tasks={tasks}
        onDelete={deleteTask}
        onToggleDone={toggleTaskDone}
        onTogglePriority={toggleTaskPriority}
      />
    </div>
  );
};

export default TasksPage;
