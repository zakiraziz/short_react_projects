import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

// Header Component
const Header = ({ title }) => (
  <header>
    <h1>{title || 'React App'}</h1>
  </header>
);

// Counter Component
const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <p>Count: {count}</p>
      <div className="buttons">
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  );
};

// TodoList Component
const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { text: input, id: Date.now() }]);
      setInput('');
    }
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
 return (
    <div className="todo">
      <div className="todo-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => removeTodo(todo.id)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="app">
      <Header title="My React Project" />
      <main>
        <Counter />
        <TodoList />
      </main>
    </div>
  );
};
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);

// Render the app
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
