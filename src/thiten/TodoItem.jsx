import React, { useState } from 'react';
import PropTypes from 'prop-types';

function TodoItem({ todo, index, completeTodo, removeTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      editTodo(index, editText);
    }
    setIsEditing(false);
  };

  return (
    <div
      className={`todo ${todo.isCompleted ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}
    >
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyPress={(e) => e.key === 'Enter' && handleEdit()}
          autoFocus
        />
      ) : (
        <>
          <span className="todo-text">{todo.text}</span>
          <div className="todo-actions">
            <button
              className={`complete-btn ${todo.isCompleted ? 'undo' : 'complete'}`}
              onClick={() => completeTodo(index)}
            >
              {todo.isCompleted ? 'Undo' : '✓'}
            </button>
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              ✎
            </button>
            <button className="delete-btn" onClick={() => removeTodo(index)}>
              ×
            </button>
          </div>
          {todo.createdAt && (
            <span className="todo-date">
              {new Date(todo.createdAt).toLocaleDateString()}
            </span>
          )}
        </>
      )}
    </div>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  index: PropTypes.number.isRequired,
  completeTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
};

export default TodoItem;
