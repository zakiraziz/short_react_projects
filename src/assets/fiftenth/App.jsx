import React, { useState } from 'react';
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
const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <span 
        className="todo-text"
        onClick={() => onToggle(todo.id)}
      >
        {todo.text}
      </span>
      <button 
        className="delete-btn"
        onClick={() => onDelete(todo.id)}
      >
        Delete
      </button>
    </div>
  );
};

// Todo List Component
const TodoList = ({ todos, onToggleTodo, onDeleteTodo }) => {
  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggleTodo}
          onDelete={onDeleteTodo}
        />
      ))}
    </div>
  );
};
