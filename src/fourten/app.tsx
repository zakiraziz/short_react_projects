import React, { useState, useEffect } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all"); // "all", "active", "completed"
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("todoTasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== "") {
      const newTaskObj = {
        id: Date.now(),
        text: newTask,
        completed: false,
        createdAt: new Date().toLocaleString()
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask("");
    }
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const startEditing = (task) => {
    setEditingIndex(task.id);
    setEditText(task.text);
  };

  const saveEdit = (id) => {
    if (editText.trim() !== "") {
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, text: editText } : task
      ));
      setEditingIndex(null);
      setEditText("");
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditText("");
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case "active":
        return tasks.filter(task => !task.completed);
      case "completed":
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const activeCount = tasks.length - completedCount;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">📝 To-Do List</h1>

        {/* Add Task Section */}
        <div className="flex space-x-2 mb-6">
          <input
            type="text"
            className="px-3 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 whitespace-nowrap"
          >
            Add Task
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-between mb-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            All ({tasks.length})
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-3 py-1 rounded ${filter === "active" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Active ({activeCount})
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-3 py-1 rounded ${filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Completed ({completedCount})
          </button>
        </div>

        {/* Task List */}
        <ul className="mb-4 max-h-96 overflow-y-auto">
          {getFilteredTasks().map((task) => (
            <li
              key={task.id}
              className={`flex justify-between items-center p-3 mb-2 rounded border-l-4 ${
                task.completed 
                  ? "bg-green-50 border-green-400 text-gray-500" 
                  : "bg-white border-blue-400"
              } shadow-sm`}
            >
              <div className="flex items-center space-x-3 flex-1">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                  className="h-5 w-5 text-blue-500 rounded focus:ring-blue-400"
                />
                
                {editingIndex === task.id ? (
                  <div className="flex-1 flex space-x-2">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      autoFocus
                    />
                    <button
                      onClick={() => saveEdit(task.id)}
                      className="px-2 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                    >
                      ✓
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-2 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <>
                    <span 
                      className={`flex-1 ${task.completed ? "line-through" : ""} cursor-pointer`}
                      onDoubleClick={() => startEditing(task)}
                    >
                      {task.text}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditing(task)}
                        className="text-blue-500 hover:text-blue-700 text-sm"
                        title="Edit task"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => removeTask(task.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                        title="Delete task"
                      >
                        🗑️
                      </button>
                    </div>
                  </>
                )}
              </div>
            </li>
          ))}
          
          {getFilteredTasks().length === 0 && (
            <li className="text-center text-gray-500 py-4">
              {filter === "completed" 
                ? "No completed tasks" 
                : filter === "active" 
                ? "No active tasks" 
                : "No tasks yet. Add one above!"}
            </li>
          )}
        </ul>

        {/* Clear Completed Button */}
        {completedCount > 0 && (
          <div className="flex justify-center">
            <button
              onClick={clearCompleted}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
            >
              Clear Completed ({completedCount})
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="text-center text-sm text-gray-600 mt-4">
          {tasks.length > 0 && (
            <p>
              {activeCount} task{activeCount !== 1 ? 's' : ''} remaining
              {completedCount > 0 && `, ${completedCount} completed`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
