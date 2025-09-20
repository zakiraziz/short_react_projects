import React, { useState, useEffect } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all");

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== "") {
      const newTaskObj = {
        text: newTask,
        completed: false,
        dueDate: dueDate || null,
        priority: priority
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask("");
      setDueDate("");
      setPriority("medium");
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditText(tasks[index].text);
  };

  const saveEdit = (index) => {
    const updatedTasks = tasks.map((task, i) => 
      i === index ? { ...task, text: editText } : task
    );
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditText("");
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  const getPriorityClass = (priority) => {
    switch(priority) {
      case "high": return "border-l-4 border-l-red-500";
      case "medium": return "border-l-4 border-l-yellow-500";
      case "low": return "border-l-4 border-l-green-500";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 mt-4">📝 Enhanced To-Do List</h1>

      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col space-y-3 mb-4">
          <input
            type="text"
            className="px-3 py-2 border rounded"
            placeholder="Enter a task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
