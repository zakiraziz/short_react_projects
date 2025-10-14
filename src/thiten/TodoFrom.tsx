/* TodoForm Styles */
.todo-form-container {
  margin-bottom: 2rem;
}

.todo-form {
  background: var(--bg-secondary);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
}

.form-main {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.input-group {
  flex: 1;
}

.form-actions {
  display: flex;
  gap: 0.5rem;
}

.form-expanded {
  border-top: 1px solid var(--border-color);
  padding-top: 1.5rem;
  animation: slideDown 0.3s ease;
}

.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  flex: 1;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--text-color);
  font-size: 0.9rem;
}

.priority-buttons {
  display: flex;
  gap: 0.5rem;
}

.priority-btn {
  padding: 0.5rem 1rem;
  border: 2px solid;
  border-radius: var(--border-radius);
  background: none;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  transition: var(--transition);
  flex: 1;
}

.priority-btn:hover {
  transform: translateY(-1px);
}

.priority-btn.active {
  color: white;
}

.tags-input {
  display: flex;
  gap: 0.5rem;
}

.tags-input .input {
  flex: 1;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: var(--primary-color);
  color: white;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.tag-remove {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
}

.tag-remove:hover {
  background: rgba(255, 255, 255, 0.3);
}

.category-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: capitalize;
}

.category-work { background: #e3f2fd; color: #1976d2; }
.category-personal { background: #f3e5f5; color: #7b1fa2; }
.category-shopping { background: #e8f5e8; color: #388e3c; }
.category-health { background: #ffebee; color: #d32f2f; }
.category-finance { background: #fff3e0; color: #f57c00; }
.category-other { background: #f5f5f5; color: #616161; }

.form-preview {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: 1rem;
  margin-top: 1rem;
}

.preview-content {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.priority-preview, .due-date-preview {
  font-size: 0.8rem;
  opacity: 0.8;
}

.quick-todos {
  margin-top: 1rem;
}

.quick-todos-header {
  font-size: 0.9rem;
  color: var(--text-light);
  margin-bottom: 0.5rem;
}

.quick-todos-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.quick-todo-btn {
  padding: 0.5rem 1rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  color: var(--text-color);
  cursor: pointer;
  font-size: 0.8rem;
  transition: var(--transition);
}

.quick-todo-btn:hover {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.character-count {
  font-size: 0.8rem;
  color: var(--text-light);
  text-align: right;
  margin-top: 0.5rem;
}

.character-warning {
  color: var(--warning-color);
  font-weight: 600;
}

.error {
  border-color: var(--danger-color) !important;
}

.error-message {
  color: var(--danger-color);
  font-size: 0.8rem;
  margin-top: 0.25rem;
  display: block;
}

.icon {
  margin-right: 0.25rem;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .form-main {
    flex-direction: column;
  }
  
  .form-actions {
    width: 100%;
    justify-content: stretch;
  }
  
  .form-actions .btn {
    flex: 1;
  }
  
  .form-row {
    flex-direction: column;
  }
  
  .priority-buttons {
    flex-direction: column;
  }
}
