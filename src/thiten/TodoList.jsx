import React, { useState, useMemo, useCallback, useEffect } from 'react';
import TodoItem from './TodoItem';
import EmptyState from './EmptyState';
import LoadingSpinner from './LoadingSpinner';
import DragDropContext from './DragDropContext';

function TodoList({ 
  todos, 
  completeTodo, 
  removeTodo, 
  editTodo,
  startEdit,
  cancelEdit,
  setTodoPriority,
  setTodoDueDate,
  editIndex,
  priorities,
  filter = 'all',
  searchTerm = '',
  sortBy = 'date',
  onReorderTodos,
  loading = false,
  error = null
}) {
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [selectedTodos, setSelectedTodos] = useState(new Set());
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [dragState, setDragState] = useState({
    isDragging: false,
    dragIndex: null,
    hoverIndex: null
  });

  // Filter and sort todos
  const processedTodos = useMemo(() => {
    let filtered = todos;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(todo => 
        todo.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (todo.tags && todo.tags.some(tag => 
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )) ||
        (todo.category && todo.category.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply status filter
    switch (filter) {
      case 'active':
        filtered = filtered.filter(todo => !todo.isCompleted);
        break;
      case 'completed':
        filtered = filtered.filter(todo => todo.isCompleted);
        break;
      case 'overdue':
        filtered = filtered.filter(todo => 
          !todo.isCompleted && 
          todo.dueDate && 
          new Date(todo.dueDate) < new Date().setHours(0, 0, 0, 0)
        );
        break;
      case 'high-priority':
        filtered = filtered.filter(todo => 
          !todo.isCompleted && todo.priority === 'high'
        );
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
        
        case 'completed':
          return a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1;
        
        default:
          return 0;
      }
    });

    return filtered;
  }, [todos, filter, searchTerm, sortBy]);

  // Selection handlers
  const toggleTodoSelection = useCallback((todoId) => {
    setSelectedTodos(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(todoId)) {
        newSelection.delete(todoId);
      } else {
        newSelection.add(todoId);
      }
      return newSelection;
    });
  }, []);

  const selectAllTodos = useCallback(() => {
    if (selectedTodos.size === processedTodos.length) {
      setSelectedTodos(new Set());
    } else {
      setSelectedTodos(new Set(processedTodos.map(todo => todo.id)));
    }
  }, [processedTodos, selectedTodos.size]);

  const clearSelection = useCallback(() => {
    setSelectedTodos(new Set());
    setIsSelectMode(false);
  }, []);

  // Bulk actions
  const completeSelected = useCallback(() => {
    selectedTodos.forEach(todoId => {
      const todoIndex = todos.findIndex(todo => todo.id === todoId);
      if (todoIndex !== -1) {
        completeTodo(todoId);
      }
    });
    clearSelection();
  }, [selectedTodos, todos, completeTodo, clearSelection]);

  const deleteSelected = useCallback(() => {
    if (window.confirm(`Are you sure you want to delete ${selectedTodos.size} todo(s)?`)) {
      selectedTodos.forEach(todoId => {
        removeTodo(todoId);
      });
      clearSelection();
    }
  }, [selectedTodos, removeTodo, clearSelection]);

  const setPriorityForSelected = useCallback((priority) => {
    selectedTodos.forEach(todoId => {
      setTodoPriority(todoId, priority);
    });
  }, [selectedTodos, setTodoPriority]);

  // Drag and drop handlers
  const handleDragStart = useCallback((dragIndex) => {
    setDragState({
      isDragging: true,
      dragIndex,
      hoverIndex: dragIndex
    });
  }, []);

  const handleDragOver = useCallback((hoverIndex) => {
    setDragState(prev => ({
      ...prev,
      hoverIndex
    }));
  }, []);

  const handleDragEnd = useCallback(() => {
    if (dragState.dragIndex !== null && dragState.hoverIndex !== null &&
        dragState.dragIndex !== dragState.hoverIndex) {
      onReorderTodos?.(dragState.dragIndex, dragState.hoverIndex);
    }
    setDragState({
      isDragging: false,
      dragIndex: null,
      hoverIndex: null
    });
  }, [dragState.dragIndex, dragState.hoverIndex, onReorderTodos]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isSelectMode) {
        clearSelection();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSelectMode, clearSelection]);

  // Auto-enter select mode when todos are selected via other means
  useEffect(() => {
    if (selectedTodos.size > 0 && !isSelectMode) {
      setIsSelectMode(true);
    }
  }, [selectedTodos.size, isSelectMode]);

  // Calculate statistics for the current view
  const viewStats = useMemo(() => ({
    total: processedTodos.length,
    completed: processedTodos.filter(todo => todo.isCompleted).length,
    overdue: processedTodos.filter(todo => 
      !todo.isCompleted && 
      todo.dueDate && 
      new Date(todo.dueDate) < new Date().setHours(0, 0, 0, 0)
    ).length,
    highPriority: processedTodos.filter(todo => 
      !todo.isCompleted && todo.priority === 'high'
    ).length
  }), [processedTodos]);

  // Group todos by date for timeline view
  const groupedTodos = useMemo(() => {
    if (sortBy !== 'dueDate') return null;

    const groups = {};
    processedTodos.forEach(todo => {
      let dateKey;
      if (!todo.dueDate) {
        dateKey = 'No due date';
      } else {
        const dueDate = new Date(todo.dueDate);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (dueDate.toDateString() === today.toDateString()) {
          dateKey = 'Today';
        } else if (dueDate.toDateString() === tomorrow.toDateString()) {
          dateKey = 'Tomorrow';
        } else if (dueDate < today) {
          dateKey = 'Overdue';
        } else {
          dateKey = dueDate.toLocaleDateString();
        }
      }

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(todo);
    });

    return groups;
  }, [processedTodos, sortBy]);

  if (loading) {
    return (
      <div className="todo-list loading">
        <LoadingSpinner />
        <p>Loading todos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="todo-list error">
        <div className="error-message">
          <h3>Error loading todos</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="btn btn-primary">
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (processedTodos.length === 0) {
    return (
      <EmptyState 
        filter={filter}
        searchTerm={searchTerm}
        totalTodos={todos.length}
      />
    );
  }

  return (
    <DragDropContext.Provider value={{
      onDragStart: handleDragStart,
      onDragOver: handleDragOver,
      onDragEnd: handleDragEnd,
      dragState
    }}>
      <div className="todo-list-container">
        {/* Selection Toolbar */}
        {isSelectMode && (
          <div className="selection-toolbar">
            <div className="selection-info">
              <strong>{selectedTodos.size} todo(s) selected</strong>
            </div>
            <div className="selection-actions">
              <button 
                onClick={completeSelected}
                className="btn btn-primary"
                disabled={selectedTodos.size === 0}
              >
                Mark Complete
              </button>
              <button 
                onClick={deleteSelected}
                className="btn btn-danger"
                disabled={selectedTodos.size === 0}
              >
                Delete
              </button>
              <div className="priority-actions">
                <span>Set priority:</span>
                {Object.entries(priorities || {}).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => setPriorityForSelected(value)}
                    className="btn btn-outline"
                    style={{ fontSize: '0.8rem', padding: '4px 8px' }}
                  >
                    {value}
                  </button>
                ))}
              </div>
              <button 
                onClick={clearSelection}
                className="btn btn-outline"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* View Statistics */}
        <div className="view-stats">
          <span>Showing {viewStats.total} todo(s)</span>
          {viewStats.completed > 0 && <span>• {viewStats.completed} completed</span>}
          {viewStats.overdue > 0 && <span className="overdue-warning">• {viewStats.overdue} overdue</span>}
          {viewStats.highPriority > 0 && <span>• {viewStats.highPriority} high priority</span>}
        </div>

        {/* Select All Bar */}
        {!isSelectMode && processedTodos.length > 0 && (
          <div className="select-all-bar">
            <button
              onClick={selectAllTodos}
              className="btn btn-outline"
            >
              {selectedTodos.size === processedTodos.length ? 'Deselect All' : 'Select All'}
            </button>
            {selectedTodos.size > 0 && (
              <button
                onClick={() => setIsSelectMode(true)}
                className="btn btn-secondary"
              >
                Manage Selection ({selectedTodos.size})
              </button>
            )}
          </div>
        )}

        {/* Todo List */}
        <div className="todo-list">
          {groupedTodos ? (
            // Timeline view for due date sorting
            Object.entries(groupedTodos).map(([dateGroup, groupTodos]) => (
              <div key={dateGroup} className="todo-group">
                <div className="group-header">
                  <h3 className="group-title">{dateGroup}</h3>
                  <span className="group-count">({groupTodos.length})</span>
                </div>
                <div className="group-todos">
                  {groupTodos.map((todo, index) => {
                    const globalIndex = todos.findIndex(t => t.id === todo.id);
                    return (
                      <TodoItem
                        key={todo.id}
                        index={globalIndex}
                        todo={todo}
                        completeTodo={completeTodo}
                        removeTodo={removeTodo}
                        editTodo={editTodo}
                        startEdit={startEdit}
                        cancelEdit={cancelEdit}
                        setTodoPriority={setTodoPriority}
                        setTodoDueDate={setTodoDueDate}
                        isEditing={editIndex === todo.id}
                        priorities={priorities}
                        isSelected={selectedTodos.has(todo.id)}
                        onSelect={toggleTodoSelection}
                        isSelectMode={isSelectMode}
                        dragIndex={globalIndex}
                      />
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            // Regular list view
            processedTodos.map((todo, index) => {
              const globalIndex = todos.findIndex(t => t.id === todo.id);
              return (
                <TodoItem
                  key={todo.id}
                  index={globalIndex}
                  todo={todo}
                  completeTodo={completeTodo}
                  removeTodo={removeTodo}
                  editTodo={editTodo}
                  startEdit={startEdit}
                  cancelEdit={cancelEdit}
                  setTodoPriority={setTodoPriority}
                  setTodoDueDate={setTodoDueDate}
                  isEditing={editIndex === todo.id}
                  priorities={priorities}
                  isSelected={selectedTodos.has(todo.id)}
                  onSelect={toggleTodoSelection}
                  isSelectMode={isSelectMode}
                  dragIndex={globalIndex}
                />
              );
            })
          )}
        </div>

        {/* List Footer */}
        <div className="todo-list-footer">
          <div className="footer-stats">
            <span>Total: {todos.length}</span>
            <span>Completed: {todos.filter(t => t.isCompleted).length}</span>
            <span>Active: {todos.filter(t => !t.isCompleted).length}</span>
          </div>
          {processedTodos.length < todos.length && (
            <div className="filter-notice">
              <em>
                {todos.length - processedTodos.length} todo(s) hidden by current filter
                {searchTerm && ` and search for "${searchTerm}"`}
              </em>
            </div>
          )}
        </div>
      </div>
    </DragDropContext.Provider>
  );
}

export default TodoList;
