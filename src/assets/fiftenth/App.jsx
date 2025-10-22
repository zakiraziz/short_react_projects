import React, { useState, useEffect } from 'react';
import './App.css';

// Header Component
const Header = ({ title }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <p>Welcome to our React App</p>
    </header>
  );
};

// Todo Item Component
const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing && editText.trim()) {
      onEdit(todo.id, editText);
    }
    setIsEditing(!isEditing);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="todo-checkbox"
      />
      
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyPress={handleKeyPress}
          className="edit-input"
          autoFocus
        />
      ) : (
        <span 
          className="todo-text"
          onClick={() => onToggle(todo.id)}
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.text}
        </span>
      )}
      
      <div className="todo-actions">
        <button 
          className="edit-btn"
          onClick={handleEdit}
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button 
          className="delete-btn"
          onClick={() => onDelete(todo.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

// Todo List Component
const TodoList = ({ todos, onToggleTodo, onDeleteTodo, onEditTodo }) => {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>No todos found. Add a new todo to get started!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggleTodo}
          onDelete={onDeleteTodo}
          onEdit={onEditTodo}
        />
      ))}
    </div>
  );
};

// Add Todo Form Component
const AddTodoForm = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTodo(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new todo..."
        className="todo-input"
      />
      <button type="submit" className="add-btn">
        Add Todo
      </button>
    </form>
  );
};

// Filter Component
const TodoFilter = ({ filter, setFilter }) => {
  return (
    <div className="todo-filter">
      <button 
        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
        onClick={() => setFilter('all')}
      >
        All
      </button>
      <button 
        className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
        onClick={() => setFilter('active')}
      >
        Active
      </button>
      <button 
        className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
        onClick={() => setFilter('completed')}
      >
        Completed
      </button>
    </div>
  );
};

// Search Component
const SearchTodo = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-todo">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search todos..."
        className="search-input"
      />
    </div>
  );
};

// Clear Completed Component
const ClearCompleted = ({ onClearCompleted, hasCompleted }) => {
  if (!hasCompleted) return null;

  return (
    <div className="clear-completed">
      <button 
        className="clear-btn"
        onClick={onClearCompleted}
      >
        Clear Completed
      </button>
    </div>
  );
};

// Main App Component
const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a project', completed: true },
    { id: 3, text: 'Deploy to production', completed: false }
  ]);
  
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  // Filter and search todos
  const filteredTodos = todos.filter(todo => {
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'active' && !todo.completed) || 
      (filter === 'completed' && todo.completed);
    
    const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const hasCompletedTodos = completedCount > 0;

  return (
    <div className="app">
      <Header title="React Todo App" />
      
      <main className="main-content">
        <div className="stats">
          <p>Total: {todos.length} | Completed: {completedCount} | Pending: {todos.length - completedCount}</p>
        </div>
        
        <AddTodoForm onAddTodo={addTodo} />
        
        <div className="controls">
          <SearchTodo 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
          />
          <TodoFilter 
            filter={filter} 
            setFilter={setFilter} 
          />
        </div>
        
        <TodoList
          todos={filteredTodos}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
          onEditTodo={editTodo}
        />
        
        <ClearCompleted 
          onClearCompleted={clearCompleted}
          hasCompleted={hasCompletedTodos}
        />
      </main>
    </div>
  );
};

export default App;
