import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function TodoForm({ addTodo, editTodo, currentTodo }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const inputRef = React.useRef(null);

  useEffect(() => {
    if (currentTodo) {
      setValue(currentTodo.text);
      inputRef.current.focus();
    }
  }, [currentTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!value.trim()) {
      setError('Todo cannot be empty');
      return;
    }

    if (currentTodo) {
      editTodo({ ...currentTodo, text: value });
    } else {
      addTodo({
        text: value,
        isCompleted: false,
        id: Date.now(),
        createdAt: new Date()
      });
    }

    setValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setValue('');
      setError('');
    }
  };

  return (
    <div className="todo-form-container">
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="input-group">
          <input
            ref={inputRef}
            type="text"
            className={`todo-input ${error ? 'error' : ''}`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={currentTodo ? "Edit your todo..." : "Add new todo..."}
            aria-label={currentTodo ? "Edit todo" : "Add new todo"}
          />
          <button 
            type="submit" 
            className="submit-btn"
            disabled={!value.trim()}
          >
            {currentTodo ? 'Update' : 'Add'}
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
}

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func,
  currentTodo: PropTypes.shape({
    text: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isCompleted: PropTypes.bool,
    createdAt: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date)
    ])
  })
};

TodoForm.defaultProps = {
  editTodo: () => {},
  currentTodo: null
};

export default TodoForm;
