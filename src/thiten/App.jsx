import React, { useState, useEffect, useCallback } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoStats from './components/TodoStats';
import FilterControls from './components/FilterControls';
import ThemeToggle from './components/ThemeToggle';
import SearchBar from './components/SearchBar';
import ExportImport from './components/ExportImport';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TodoProvider } from './context/TodoContext';
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
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [filter, setFilter] = useState(FILTERS.ALL);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useLocalStorage('darkMode', false);
  const [editIndex, setEditIndex] = useState(null);
  const [sortBy, setSortBy] = useState('date');

  // Initialize theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Add todo with enhanced functionality
  const addTodo = useCallback((text, priority = PRIORITIES.MEDIUM, dueDate = null) => {
    const newTodo = {
      id: Date.now().toString(),
      text: text.trim(),
      isCompleted: false,
      priority,
      dueDate,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    
    setTodos(prevTodos => [...prevTodos, newTodo]);
  }, [setTodos]);

  // Edit todo
  const editTodo = useCallback((id, updates) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id ? { ...todo, ...updates } : todo
      )
    );
    setEditIndex(null);
  }, [setTodos]);

  // Start editing
  const startEdit = useCallback((id) => {
    setEditIndex(id);
  }, []);

  // Cancel editing
  const cancelEdit = useCallback(() => {
    setEditIndex(null);
  }, []);

  // Complete todo with timestamp
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
  }, [setTodos]);

  // Remove todo
  const removeTodo = useCallback((id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, [setTodos]);

  // Clear all completed todos
  const clearCompleted = useCallback(() => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.isCompleted));
  }, [setTodos]);

  // Toggle all todos
  const toggleAllTodos = useCallback(() => {
    const allCompleted = todos.every(todo => todo.isCompleted);
    setTodos(prevTodos => 
      prevTodos.map(todo => ({
        ...todo,
        isCompleted: !allCompleted,
        completedAt: !allCompleted ? new Date().toISOString() : null
      }))
    );
  }, [todos, setTodos]);

  // Set priority for todo
  const setTodoPriority = useCallback((id, priority) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id ? { ...todo, priority } : todo
      )
    );
  }, [setTodos]);

  // Set due date for todo
  const setTodoDueDate = useCallback((id, dueDate) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id ? { ...todo, dueDate } : todo
      )
    );
  }, [setTodos]);

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
        case 'date':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'alphabetical':
          return a.text.localeCompare(b.text);
        default:
          return 0;
      }
    });

    return filtered;
  }, [todos, filter, searchTerm, sortBy]);

  // Calculate statistics
  const stats = {
    total: todos.length,
    completed: todos.filter(todo => todo.isCompleted).length,
    active: todos.filter(todo => !todo.isCompleted).length,
    highPriority: todos.filter(todo => todo.priority === PRIORITIES.HIGH && !todo.isCompleted).length
  };

  // Check for overdue todos
  const overdueTodos = todos.filter(todo => 
    !todo.isCompleted && 
    todo.dueDate && 
    new Date(todo.dueDate) < new Date()
  ).length;

  // Export data
  const exportData = () => {
    const data = {
      todos,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    return JSON.stringify(data, null, 2);
  };

  // Import data
  const importData = (importedData) => {
    try {
      const data = JSON.parse(importedData);
      if (data.todos && Array.isArray(data.todos)) {
        setTodos(data.todos);
        return true;
      }
    } catch (error) {
      console.error('Invalid import data:', error);
    }
    return false;
  };

  // Theme toggle
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <TodoProvider value={{
      priorities: PRIORITIES,
      filters: FILTERS
    }}>
      <div className="app">
        <header className="app-header">
          <h1>Todo List</h1>
          <ThemeToggle 
            isDarkMode={isDarkMode} 
            toggleTheme={toggleTheme} 
          />
        </header>

        <TodoStats 
          stats={stats} 
          overdueTodos={overdueTodos}
        />

        <div className="app-controls">
          <SearchBar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          
          <FilterControls
            filter={filter}
            setFilter={setFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            filters={FILTERS}
          />
        </div>

        <TodoForm 
          addTodo={addTodo}
          priorities={PRIORITIES}
        />

        {todos.length > 0 && (
          <div className="bulk-actions">
            <button 
              className="btn btn-outline"
              onClick={toggleAllTodos}
              disabled={todos.length === 0}
            >
              {todos.every(todo => todo.isCompleted) ? 'Unmark All' : 'Complete All'}
            </button>
            <button 
              className="btn btn-danger"
              onClick={clearCompleted}
              disabled={stats.completed === 0}
            >
              Clear Completed ({stats.completed})
            </button>
          </div>
        )}

        <TodoList
          todos={filteredTodos()}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          editTodo={editTodo}
          startEdit={startEdit}
          cancelEdit={cancelEdit}
          setTodoPriority={setTodoPriority}
          setTodoDueDate={setTodoDueDate}
          editIndex={editIndex}
          priorities={PRIORITIES}
        />

        {todos.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">📝</div>
            <h3>No todos yet!</h3>
            <p>Add a todo above to get started.</p>
          </div>
        )}

        <ExportImport 
          exportData={exportData}
          importData={importData}
        />

        <footer className="app-footer">
          <p>
            {stats.active} {stats.active === 1 ? 'task' : 'tasks'} remaining • 
            {overdueTodos > 0 && (
              <span className="overdue-warning"> {overdueTodos} overdue!</span>
            )}
          </p>
        </footer>
      </div>
    </TodoProvider>
  );
}

export default App;
