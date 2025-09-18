import React, { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">📝 To-Do List</h1>

      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          className="px-3 py-2 border rounded w-64"
          placeholder="Enter a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add
        </button>
      </div>

      <ul className="w-72">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-white p-2 mb-2 rounded shadow"
          >
            <span>{task}</span>
            <button
              onClick={() => removeTask(index)}
              className="text-red-500 font-bold"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
