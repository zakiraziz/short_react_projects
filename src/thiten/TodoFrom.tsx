/* Todo Form Styles */
.todo-form-container {
  margin-bottom: 30px;
}

.todo-form {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  border: 2px solid #e9ecef;
}

.form-main {
  margin-bottom: 15px;
}

.input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.input-group .input {
  flex: 1;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.import-export-buttons {
  display: flex;
  gap: 10px;
}

.form-advanced {
  border-top: 1px solid #e9ecef;
  padding-top: 20px;
  animation: slideDown 0.3s ease;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #495057;
}

.priority-buttons {
  display: flex;
  gap: 10px;
}

.priority-btn {
  flex: 1;
  padding: 8px 12px;
  border: 2px solid #e9ecef;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.priority-btn:hover {
  border-color: #667eea;
  transform: translateY(-1px);
}

.priority-btn.active {
  border-color: transparent;
}

.tags-input-container {
  space-y: 10px;
}

.tags-display {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: #667eea;
  color: white;
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 12px;
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
  font-size: 14px;
}

.tag-remove:hover {
  background: rgba(255, 255, 255, 0.3);
}

.tag-input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.tag-input {
  flex: 1;
}

.predefined-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-suggestion {
  padding: 4px 8px;
  background: #e9ecef;
  border: 1px solid #dee2e6;
  border-radius: 12px;
  font-size: 11px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tag-suggestion:hover:not(:disabled) {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.tag-suggestion:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.edit-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
}

/* Form Preview */
.form-preview {
  margin-top: 20px;
  padding: 15px;
  background: #e7f3ff;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.form-preview h4 {
  margin: 0 0 10px 0;
  color: #495057;
  font-size: 14px;
}

.preview-content {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.preview-text {
  font-weight: 500;
  color: #495057;
}

.preview-priority,
.preview-due-date,
.preview-category {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  color: white;
}

.preview-due-date,
.preview-category {
  background: #6c757d;
}

.preview-tags {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}

.preview-tag {
  font-size: 11px;
  color: #667eea;
  background: white;
  padding: 2px 6px;
  border-radius: 10px;
  border: 1px solid #667eea;
}

/* Error States */
.error {
  border-color: #ff6b6b !important;
  box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.1) !important;
}

.error-message {
  color: #ff6b6b;
  font-size: 12px;
  margin-top: 5px;
  font-weight: 500;
}

/* Animations */
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
  .form-row {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .input-group {
    flex-direction: column;
  }
  
  .form-actions {
    flex-direction: column;
    align-items: stretch;
  }
  
  .import-export-buttons {
    justify-content: center;
  }
  
  .priority-buttons {
    flex-direction: column;
  }
}
