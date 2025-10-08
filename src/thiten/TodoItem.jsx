/* Todo Item Styles */
.todo {
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin: 12px 0;
  border-left: 4px solid #667eea;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.todo:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.todo.completed {
  opacity: 0.7;
  background: #f8f9fa;
}

.todo.completed .todo-text {
  text-decoration: line-through;
  color: #6c757d;
}

.todo.dragging {
  opacity: 0.5;
  transform: rotate(5deg);
}

.todo.expanded {
  margin: 16px 0;
}

/* Main Content */
.todo-main {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.todo-checkbox {
  flex-shrink: 0;
}

.checkbox {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #dee2e6;
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none;
  position: relative;
}

.checkbox:checked {
  background: #4CAF50;
  border-color: #4CAF50;
}

.checkbox:checked::after {
  content: '✓';
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  font-weight: bold;
}

.checkbox:hover {
  border-color: #4CAF50;
}

.todo-content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  min-height: 40px;
}

.todo-text-container {
  flex: 1;
}

.todo-text {
  font-size: 16px;
  line-height: 1.4;
  color: #2c3e50;
  word-break: break-word;
  display: block;
  margin-bottom: 8px;
}

.todo-metadata {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.todo-category,
.due-date,
.todo-priority,
.todo-tags-count {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: white;
}

.todo-category {
  background: #667eea;
}

.todo-priority {
  color: white;
}

.todo-tags-count {
  background: #6c757d;
}

.due-date.overdue {
  background: #ff6b6b;
  animation: pulse 2s infinite;
}

.due-date.due-today {
  background: #ff9ff3;
}

.due-date.due-soon {
  background: #feca57;
  color: #2c3e50;
}

.due-date.due-later {
  background: #54a0ff;
}

.expand-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  font-size: 12px;
  color: #6c757d;
  flex-shrink: 0;
}

.expand-btn:hover {
  background: #e9ecef;
}

/* Actions */
.todo-actions {
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.todo-actions.visible {
  opacity: 1;
}

.action-btn {
  background: none;
  border: none;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit-btn:hover {
  background: #667eea;
  color: white;
}

.complete-btn:hover {
  background: #4CAF50;
  color: white;
}

.complete-btn.completed:hover {
  background: #6c757d;
}

.delete-btn:hover {
  background: #ff6b6b;
  color: white;
}

/* Expanded Details */
.todo-details {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e9ecef;
  animation: slideDown 0.3s ease;
}

.detail-section {
  margin-bottom: 16px;
}

.detail-section label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #495057;
  font-size: 14px;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tags-list .tag {
  background: #e9ecef;
  color: #495057;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.date-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
}

.date-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.date-item label {
  font-size: 12px;
  color: #6c757d;
  margin: 0;
  font-weight: normal;
}

.quick-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.quick-btn {
  padding: 6px 12px;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.quick-btn:hover:not(:disabled) {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.quick-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: #e9ecef;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #4CAF50;
  transition: width 0.3s ease;
}

/* Swipe Actions (Mobile) */
.swipe-actions {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.swipe-complete,
.swipe-delete {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 12px;
  pointer-events: all;
}

.swipe-complete {
  left: 0;
  background: #4CAF50;
}

.swipe-delete {
  right: 0;
  background: #ff6b6b;
}

/* Priority-specific styles */
.todo.priority-high {
  border-left-width: 6px;
}

.todo.priority-medium {
  border-left-width: 4px;
}

.todo.priority-low {
  border-left-width: 2px;
}

/* Animations */
@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.7; }
  100% { opacity: 1; }
}

@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 500px;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .todo-main {
    flex-direction: column;
    gap: 8px;
  }

  .todo-content {
    width: 100%;
  }

  .todo-actions {
    opacity: 1;
    align-self: flex-end;
  }

  .todo-metadata {
    flex-direction: column;
    align-items: flex-start;
  }

  .date-info {
    grid-template-columns: 1fr;
  }

  .quick-actions {
    flex-direction: column;
  }

  .swipe-actions {
    display: flex;
  }
}

@media (max-width: 480px) {
  .todo {
    padding: 12px;
  }

  .todo-text {
    font-size: 14px;
  }

  .action-btn {
    padding: 6px;
    font-size: 12px;
  }
}
