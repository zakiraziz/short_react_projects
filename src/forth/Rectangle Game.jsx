import React, { useState, useEffect } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== "") {
      const task = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
        priority: "medium"
      };
      setTasks([...tasks, task]);
      setNewTask("");
    }
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
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
        task.id === id ? { ...task, text: editText.trim() } : task
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

  const setPriority = (id, priority) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, priority } : task
    ));
  };

  const getFilteredTasks = () => {
    let filtered = tasks;
    
    // Apply filter
    if (filter === "active") {
      filtered = filtered.filter(task => !task.completed);
    } else if (filter === "completed") {
      filtered = filtered.filter(task => task.completed);
    }
    
    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const active = total - completed;
    return { total, completed, active };
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const filteredTasks = getFilteredTasks();
  const stats = getStats();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          📝 To-Do List
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Stay organized and productive
        </p>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Add Task Input */}
        <div className="flex space-x-2 mb-6">
          <input
            type="text"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 font-medium"
          >
            Add
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-2 mb-4">
          {[
            { key: "all", label: "All", count: stats.total },
            { key: "active", label: "Active", count: stats.active },
            { key: "completed", label: "Completed", count: stats.completed }
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`flex-1 py-2 rounded-lg transition duration-200 font-medium ${
                filter === key
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {label} ({count})
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Total: {stats.total}</span>
            <span>Active: {stats.active}</span>
            <span>Completed: {stats.completed}</span>
          </div>
          {stats.total > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(stats.completed / stats.total) * 100}%` }}
              ></div>
            </div>
          )}
        </div>

        {/* Task List */}
        <ul className="space-y-2 max-h-96 overflow-y-auto">
          {filteredTasks.length === 0 ? (
            <li className="text-center text-gray-500 py-4">
              {searchTerm ? "No tasks match your search" : "No tasks yet. Add one above!"}
            </li>
          ) : (
            filteredTasks.map((task) => (
              <li
                key={task.id}
                className={`flex items-center justify-between p-3 rounded-lg border transition duration-200 ${
                  task.completed
                    ? "bg-green-50 border-green-200"
                    : "bg-white border-gray-200 hover:shadow-md"
                }`}
              >
                <div className="flex items-center space-x-3 flex-1">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                    className="h-5 w-5 text-blue-500 rounded focus:ring-blue-400"
                  />
                  
                  {editingIndex === task.id ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && saveEdit(task.id)}
                      className="flex-1 px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      autoFocus
                    />
                  ) : (
                    <span
                      className={`flex-1 ${
                        task.completed
                          ? "line-through text-gray-500"
                          : "text-gray-800"
                      }`}
                    >
                      {task.text}
                    </span>
                  )}
                  
                  {/* Priority Indicator */}
                  <span
                    className={`w-2 h-2 rounded-full ${
                      task.priority === "high"
                        ? "bg-red-500"
                        : task.priority === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                    title={`${task.priority} priority`}
                  ></span>
                </div>

                <div className="flex space-x-2 ml-3">
                  {editingIndex === task.id ? (
                    <>
                      <button
                        onClick={() => saveEdit(task.id)}
                        className="text-green-500 hover:text-green-700 transition duration-200"
                        title="Save"
                      >
                        ✓
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="text-gray-500 hover:text-gray-700 transition duration-200"
                        title="Cancel"
                      >
                        ✕
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditing(task)}
                        className="text-blue-500 hover:text-blue-700 transition duration-200"
                        title="Edit"
                      >
                        ✎
                      </button>
                      <button
                        onClick={() => removeTask(task.id)}
                        className="text-red-500 hover:text-red-700 transition duration-200"
                        title="Delete"
                      >
                        ✕
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))
          )}
        </ul>

        {/* Actions */}
        {tasks.length > 0 && (
          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={clearCompleted}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 font-medium"
              disabled={stats.completed === 0}
            >
              Clear Completed
            </button>
            
            {/* Priority Selector for new tasks */}
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => {
                // This would set priority for new tasks in a more complete implementation
              }}
            >
              <option value="low">Low Priority</option>
              <option value="medium" selected>Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
        )}

        {/* Quick Tips */}
        <div className="mt-6 text-xs text-gray-500 text-center">
          <p>💡 Tip: Press Enter to quickly add tasks</p>
        </div>
      </div>
    </div>
  );
}
