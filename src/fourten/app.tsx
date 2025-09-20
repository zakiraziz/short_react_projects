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
          
          <div className="flex space-x-2">
            <input
              type="date"
              className="px-3 py-2 border rounded flex-1"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <select
              className="px-3 py-2 border rounded"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
          
          <button
            onClick={addTask}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Add Task
          </button>
        </div>

        <div className="flex justify-between mb-4">
          <div className="flex space-x-2">
            <button 
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter("active")}
              className={`px-3 py-1 rounded ${filter === "active" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              Active
            </button>
            <button 
              onClick={() => setFilter("completed")}
              className={`px-3 py-1 rounded ${filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              Completed
            </button>
          </div>
          
          <button
            onClick={clearCompleted}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Clear Completed
          </button>
        </div>

        <div className="mb-2 text-sm text-gray-600">
          {tasks.filter(t => !t.completed).length} tasks remaining
        </div>

        <ul className="space-y-2">
          {filteredTasks.length === 0 ? (
            <li className="text-center text-gray-500 py-4">No tasks found</li>
          ) : (
            filteredTasks.map((task, index) => {
              // Find the original index to handle operations correctly
              const originalIndex = tasks.findIndex(t => t === task);
              
              return (
                <li
                  key={originalIndex}
                  className={`flex justify-between items-center p-3 rounded shadow ${getPriorityClass(task.priority)} ${task.completed ? "bg-green-50 line-through text-gray-500" : "bg-white"}`}
                >
                  {editingIndex === originalIndex ? (
                    <div className="flex flex-col w-full">
                      <input
                        type="text"
                        className="px-2 py-1 border rounded mb-2"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        autoFocus
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => saveEdit(originalIndex)}
                          className="px-2 py-1 bg-green-500 text-white rounded text-sm"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="px-2 py-1 bg-gray-500 text-white rounded text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col flex-1">
                        <span>{task.text}</span>
                        {task.dueDate && (
                          <span className="text-xs text-gray-500">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleComplete(originalIndex)}
                          className="h-5 w-5"
                        />
                        <button
                          onClick={() => startEditing(originalIndex)}
                          className="text-blue-500 font-bold"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => removeTask(originalIndex)}
                          className="text-red-500 font-bold"
                        >
                          ✕
                        </button>
                      </div>
                    </>
                  )}
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}

