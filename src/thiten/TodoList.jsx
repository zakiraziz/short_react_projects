import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

function TodoList({ todos, completeTodo, removeTodo, editTodo }) {
  // Display message when no todos exist
  if (todos.length === 0) {
    return (
      <div className="todo-list empty">
        <p className="empty-message">No tasks found. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id || index} // Better to use todo.id if available
          index={index}
          todo={todo}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          editTodo={editTodo}
        />
      ))}
      
      {/* Status bar showing count */}
      <div className="todo-status">
        <span>{todos.filter(t => !t.completed).length} items left</span>
        {todos.some(t => t.completed) && (
          <button 
            className="clear-completed"
            onClick={() => {
              const completedIds = todos.filter(t => t.completed).map(t => t.id);
              completedIds.forEach(id => removeTodo(id));
            }}
          >
            Clear completed
          </button>
        )}
      </div>
    </div>
  );
}

// Prop type validation
TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      createdAt: PropTypes.instanceOf(Date)
    })
  ).isRequired,
  completeTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired
};

// Default props
TodoList.defaultProps = {
  todos: []
};

export default TodoList;
