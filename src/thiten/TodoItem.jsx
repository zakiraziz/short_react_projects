import React, { useState, useRef, useEffect } from 'react';

function TodoItem({ 
  todo, 
  index,
  completeTodo, 
  removeTodo, 
  editTodo,
  startEdit,
  cancelEdit,
  setTodoPriority,
  setTodoDueDate,
  isEditing = false,
  priorities 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState(todo.priority);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || '');
  const [editCategory, setEditCategory] = useState(todo.category || '');
  const [isDragging, setIsDragging] = useState(false);
  
  const editInputRef = useRef(null);
  const todoRef = useRef(null);

  // Focus edit input when editing starts
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [isEditing]);

  // Reset edit state when todo changes
  useEffect(() => {
    if (!isEditing) {
      setEditText(todo.text);
      setEditPriority(todo.priority);
      setEditDueDate(todo.dueDate || '');
      setEditCategory(todo.category || '');
    }
  }, [todo, isEditing]);

  const handleComplete = () => {
    completeTodo(todo.id);
  };

  const handleRemove = () => {
    // Add confirmation for important todos
    if (todo.priority === 'high' && !todo.isCompleted) {
      if (!window.confirm('This is a high priority todo. Are you sure you want to delete it?')) {
        return;
      }
    }
    removeTodo(todo.id);
  };

  const handleEdit = () => {
    startEdit(todo.id);
  };

  const handleSaveEdit = () => {
    if (editText.trim()) {
      editTodo(todo.id, {
        text: editText.trim(),
        priority: editPriority,
        dueDate: editDueDate || null,
        category: editCategory || null
      });
    }
  };

  const handleCancelEdit = () => {
    cancelEdit();
    setEditText(todo.text);
    setEditPriority(todo.priority);
    setEditDueDate(todo.dueDate || '');
    setEditCategory(todo.category || '');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  const handlePriorityChange = (newPriority) => {
    setTodoPriority(todo.id, newPriority);
  };

  const handleDueDateChange = (newDueDate) => {
    setTodoDueDate(todo.id, newDueDate);
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: '#f44336',
      medium: '#ff9800',
      low: '#4caf50'
    };
    return colors[priority] || '#666';
  };

  const getPriorityIcon = (priority) => {
    const icons = {
      high: '🔥',
      medium: '⚠️',
      low: '💤'
    };
    return icons[priority] || '📝';
  };

  const isOverdue = () => {
    if (!todo.dueDate || todo.isCompleted) return false;
    return new Date(todo.dueDate) < new Date().setHours(0, 0, 0, 0);
  };

  const getDueDateText = () => {
    if (!todo.dueDate) return null;
    
    const dueDate = new Date(todo.dueDate);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (dueDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (dueDate.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else if (dueDate < today) {
      return `Overdue: ${dueDate.toLocaleDateString()}`;
    } else {
      return dueDate.toLocaleDateString();
    }
  };

  const getTimeUntilDue = () => {
    if (!todo.dueDate) return null;
    
    const dueDate = new Date(todo.dueDate);
    const now = new Date();
    const diffTime = dueDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    if (diffDays > 1) return `Due in ${diffDays} days`;
    if (diffDays === -1) return 'Due yesterday';
    return `Due ${Math.abs(diffDays)} days ago`;
  };

  const formatCreatedDate = () => {
    if (!todo.createdAt) return null;
    return new Date(todo.createdAt).toLocaleDateString();
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.setData('text/plain', todo.id);
    e.dataTransfer.effectAllowed = 'move';
    
    // Add a slight delay for better visual feedback
    setTimeout(() => {
      if (todoRef.current) {
        todoRef.current.style.opacity = '0.4';
      }
    }, 0);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (todoRef.current) {
      todoRef.current.style.opacity = '1';
    }
  };

  if (isEditing) {
    return (
      <div 
        className={`todo editing ${isDragging ? 'dragging' : ''}`}
        ref={todoRef}
      >
        <div className="todo-edit-form">
          <input
            ref={editInputRef}
            type="text"
            className="todo-edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Edit todo..."
          />
          
          <div className="edit-controls">
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
              className="priority-select"
              style={{ borderLeftColor: getPriorityColor(editPriority) }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="due-date-input"
            />
            
            <select
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              className="category-select"
            >
              <option value="">No Category</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="shopping">Shopping</option>
              <option value="health">Health</option>
              <option value="finance">Finance</option>
            </select>
          </div>
          
          <div className="edit-actions">
            <button 
              onClick={handleSaveEdit}
              className="btn btn-primary"
              disabled={!editText.trim()}
            >
              Save
            </button>
            <button 
              onClick={handleCancelEdit}
              className="btn btn-outline"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={todoRef}
      className={`
        todo 
        ${todo.isCompleted ? 'completed' : ''} 
        ${isHovered ? 'hovered' : ''}
        ${isDragging ? 'dragging' : ''}
        priority-${todo.priority}
        ${isOverdue() ? 'overdue' : ''}
        ${isExpanded ? 'expanded' : ''}
      `}
      style={{
        borderLeftColor: getPriorityColor(todo.priority),
        opacity: isDragging ? 0.4 : 1
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowActions(false);
      }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="todo-content">
        <div className="todo-main">
          <button
            className={`todo-checkbox ${todo.isCompleted ? 'checked' : ''}`}
            onClick={handleComplete}
            aria-label={todo.isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {todo.isCompleted && '✓'}
          </button>
          
          <div className="todo-text-content">
            <div className="todo-text" onClick={() => setIsExpanded(!isExpanded)}>
              {todo.text}
            </div>
            
            <div className="todo-meta">
              <span 
                className="priority-badge"
                style={{ color: getPriorityColor(todo.priority) }}
                onClick={() => handlePriorityChange(
                  todo.priority === 'high' ? 'medium' : 
                  todo.priority === 'medium' ? 'low' : 'high'
                )}
              >
                {getPriorityIcon(todo.priority)} {todo.priority}
              </span>
              
              {todo.dueDate && (
                <span 
                  className={`due-date ${isOverdue() ? 'overdue' : ''}`}
                  onClick={() => {
                    const newDate = prompt('Enter new due date (YYYY-MM-DD):', todo.dueDate);
                    if (newDate) handleDueDateChange(newDate);
                  }}
                >
                  📅 {getDueDateText()}
                </span>
              )}
              
              {todo.category && (
                <span className={`category category-${todo.category}`}>
                  {todo.category}
                </span>
              )}
              
              {todo.tags && todo.tags.length > 0 && (
                <div className="todo-tags">
                  {todo.tags.map(tag => (
                    <span key={tag} className="tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            {isExpanded && (
              <div className="todo-details">
                <div className="detail-item">
                  <strong>Created:</strong> {formatCreatedDate()}
                </div>
                {todo.completedAt && (
                  <div className="detail-item">
                    <strong>Completed:</strong> {new Date(todo.completedAt).toLocaleDateString()}
                  </div>
                )}
                {todo.dueDate && (
                  <div className="detail-item">
                    <strong>Time until due:</strong> {getTimeUntilDue()}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div 
          className={`todo-actions ${showActions ? 'visible' : ''}`}
          onMouseEnter={() => setShowActions(true)}
        >
          <button
            onClick={handleEdit}
            className="todo-action-btn btn-edit"
            aria-label="Edit todo"
          >
            ✏️
          </button>
          
          <button
            onClick={handleComplete}
            className="todo-action-btn btn-complete"
            aria-label={todo.isCompleted ? 'Mark incomplete' : 'Mark complete'}
          >
            {todo.isCompleted ? '↶' : '✓'}
          </button>
          
          <button
            onClick={handleRemove}
            className="todo-action-btn btn-delete"
            aria-label="Delete todo"
          >
            🗑️
          </button>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="todo-action-btn btn-expand"
            aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
          >
            {isExpanded ? '▲' : '▼'}
          </button>
        </div>
      </div>
      
      {isOverdue() && (
        <div className="overdue-warning">
          ⚠️ This task is overdue!
        </div>
      )}
    </div>
  );
}

export default TodoItem;
