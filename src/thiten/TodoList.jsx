/* Todo List Container */
.todo-list-container {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.todo-list-header {
  padding: 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

.list-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
}

.stat {
  font-size: 14px;
  color: #6c757d;
  padding: 6px 12px;
  background: white;
  border-radius: 20px;
  border: 1px solid #e9ecef;
}

.stat strong {
  color: #495057;
}

.overdue-stat {
  color: #ff6b6b;
  border-color: #ff6b6b;
}

.priority-stat {
  color: #ff6b6b;
  border-color: #ff6b6b;
}

/* Bulk Actions */
.bulk-actions-panel {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #e7f3ff;
  border-radius: 8px;
  border: 1px solid #b3d9ff;
  flex-wrap: wrap;
}

.bulk-info {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  color: #0066cc;
}

.bulk-select {
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  background: white;
  min-width: 150px;
}

/* Selection Controls */
.selection-controls {
  padding: 15px 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

.select-all-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: 500;
  color: #495057;
}

.drag-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #6c757d;
}

/* Todo List Scroll Container */
.todo-list-scroll-container {
  max-height: 60vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.todo-list {
  min-height: 100px;
  position: relative;
}

.todo-list.drag-over {
  background: #f0f8ff;
}

.todo-list.virtual-scroll {
  position: relative;
}

/* Todo Item Wrapper */
.todo-item-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 0 20px;
  border-bottom: 1px solid #f1f3f4;
  transition: all 0.2s ease;
  position: relative;
}

.todo-item-wrapper:last-child {
  border-bottom: none;
}

.todo-item-wrapper:hover {
  background: #f8f9fa;
}

.todo-item-wrapper.selected {
  background: #e7f3ff;
  border-left: 4px solid #0066cc;
}

.todo-item-wrapper.dragging {
  opacity: 0.6;
  background: #f0f8ff;
}

.selection-checkbox {
  padding-top: 20px;
  flex-shrink: 0;
}

.selection-checkbox input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

/* Virtual Scroll */
.virtual-scroll-spacer {
  pointer-events: none;
}

.virtual-scroll-info {
  font-size: 12px;
  color: #6c757d;
  margin-left: 10px;
}

/* List Footer */
.todo-list-footer {
  padding: 15px 20px;
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

.footer-stats {
  font-size: 14px;
  color: #6c757d;
}

.footer-actions {
  display: flex;
  gap: 10px;
}

/* Small Button Variant */
.btn.sm {
  padding: 6px 12px;
  font-size: 12px;
}

/* Error State */
.error-state {
  text-align: center;
  padding: 40px 20px;
  color: #6c757d;
}

.error-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.error-state h3 {
  color: #dc3545;
  margin-bottom: 8px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .todo-list-header {
    flex-direction: column;
    align-items: stretch;
  }

  .list-stats {
    justify-content: center;
  }

  .bulk-actions-panel {
    flex-direction: column;
    align-items: stretch;
  }

  .selection-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .todo-item-wrapper {
    padding: 0 15px;
  }

  .todo-list-footer {
    flex-direction: column;
    text-align: center;
  }

  .stat {
    font-size: 12px;
    padding: 4px 8px;
  }
}

@media (max-width: 480px) {
  .todo-list-header,
  .selection-controls,
  .todo-list-footer {
    padding: 12px 15px;
  }

  .todo-item-wrapper {
    padding: 0 10px;
  }
}

/* Drag and Drop Styles */
.react-beautiful-dnd-drag-handle {
  cursor: grab !important;
}

.react-beautiful-dnd-drag-handle:active {
  cursor: grabbing !important;
}

/* Smooth transitions */
.todo-list-scroll-container {
  scroll-behavior: smooth;
}

/* Custom scrollbar for webkit */
.todo-list-scroll-container::-webkit-scrollbar {
  width: 8px;
}

.todo-list-scroll-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.todo-list-scroll-container::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.todo-list-scroll-container::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
