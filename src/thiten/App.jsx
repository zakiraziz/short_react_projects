import React, { useState, useEffect, useCallback } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilters from './components/TodoFilters';
import TodoStats from './components/TodoStats';
import EmptyState from './components/EmptyState';
import { exportToCSV, importFromCSV } from './utils/csvHelper';
import { saveToLocalStorage, loadFromLocalStorage } from './utils/storageHelper';
import { generateId } from './utils/helpers';
import './App.css';

// Constants
const FILTERS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed'
};

const PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
};

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState(FILTERS.ALL);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [loading, setLoading] = useState(true);
  const [editTodo, setEditTodo] = useState(null);

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = loadFromLocalStorage('todos');
    if (savedTodos) {
      setTodos(savedTodos);
    }
    setLoading(false);
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    if (!loading) {
      saveToLocalStorage('todos', todos);
    }
  }, [todos, loading]);

  // Add a new todo
  const addTodo = useCallback((text, priority = PRIORITIES.MEDIUM, dueDate = null) => {
    const newTodo = {
      id: generateId(),
      text: text.trim(),
      isCompleted: false,
      priority,
      dueDate,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    
    setTodos(prevTodos => [newTodo, ...prevTodos]);
  }, []);

  // Edit an existing todo
  const updateTodo = useCallback((id, updates) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, ...updates, updatedAt: new Date().toISOString() } : todo
      )
    );
    setEditTodo(null);
  }, []);

  // Complete/uncomplete a todo
  const completeTodo = useCallback((id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id
          ? {
              ...todo,
              isCompleted: !todo.isCompleted,
              completedAt: !todo.isCompleted ? new Date().toISOString() : null
            }
          : todo
      )
    );
  }, []);

  // Remove a todo
  const removeTodo = useCallback((id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []);

  // Remove all completed todos
  const clearCompleted = useCallback(() => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.isCompleted));
  }, []);

  // Mark all todos as complete/incomplete
  const toggleAllTodos = useCallback(() => {
    const allCompleted = todos.every(todo => todo.isCompleted);
    setTodos(prevTodos =>
      prevTodos.map(todo => ({
        ...todo,
        isCompleted: !allCompleted,
        completedAt: !allCompleted ? new Date().toISOString() : null
      }))
    );
  }, [todos]);

  // Filter todos based on current filter and search term
  const filteredTodos = useCallback(() => {
    let filtered = todos;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(todo =>
        todo.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    switch (filter) {
      case FILTERS.ACTIVE:
        filtered = filtered.filter(todo => !todo.isCompleted);
        break;
      case FILTERS.COMPLETED:
        filtered = filtered.filter(todo => todo.isCompleted);
        break;
      default:
        break;
    }

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'createdAt':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    return filtered;
  }, [todos, filter, searchTerm, sortBy]);

  // Export todos to CSV
  const handleExport = useCallback(() => {
    exportToCSV(todos, 'todos.csv');
  }, [todos]);

  // Import todos from CSV
  const handleImport = useCallback((file) => {
    importFromCSV(file, (importedTodos) => {
      setTodos(prevTodos => [...prevTodos, ...importedTodos]);
    });
  }, []);

  // Get statistics
  const getStats = useCallback(() => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.isCompleted).length;
    const active = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, active, completionRate };
  }, [todos]);

  // Handle drag and drop reordering
  const handleDragEnd = useCallback((result) => {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
  }, [todos]);

  if (loading) {
    return (
      <div className="app">
        <div className="app-container">
          <div className="loading-spinner">
            <div className="loading"></div>
            <p>Loading your todos...</p>
          </div>
        </div>
      </div>
    );
  }

  const currentTodos = filteredTodos();
  const stats = getStats();

  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <h1>Todo List</h1>
          <p>Stay organized and get things done</p>
        </header>

        <TodoStats stats={stats} />

        <TodoForm 
          addTodo={addTodo}
          editTodo={editTodo}
          updateTodo={updateTodo}
          onCancelEdit={() => setEditTodo(null)}
          onExport={handleExport}
          onImport={handleImport}
        />

        <TodoFilters
          filter={filter}
          setFilter={setFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
          hasTodos={todos.length > 0}
          hasCompleted={stats.completed > 0}
          onClearCompleted={clearCompleted}
          onToggleAll={toggleAllTodos}
        />

        {todos.length === 0 ? (
          <EmptyState />
        ) : (
          <TodoList
            todos={currentTodos}
            completeTodo={completeTodo}
            updateTodo={updateTodo}
            removeTodo={removeTodo}
            setEditTodo={setEditTodo}
            onDragEnd={handleDragEnd}
          />
        )}

        {/* Keyboard shortcuts info */}
        <div className="keyboard-shortcuts">
          <small>💡 Press '/' to focus search, 'a' to add new todo</small>
        </div>
      </div>
    </div>
  );
}

export default App;
