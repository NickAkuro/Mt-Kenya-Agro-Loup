import React from 'react';
import './BugItem.css';

const BugItem = ({ bug, onStatusChange, onDelete }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'open':
        return 'status-open';
      case 'in-progress':
        return 'status-in-progress';
      case 'resolved':
        return 'status-resolved';
      default:
        return '';
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'low':
        return 'priority-low';
      case 'medium':
        return 'priority-medium';
      case 'high':
        return 'priority-high';
      case 'critical':
        return 'priority-critical';
      default:
        return '';
    }
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    console.log(`Changing bug ${bug.id} status to ${newStatus}`);
    onStatusChange(bug.id, newStatus);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this bug?')) {
      console.log(`Deleting bug ${bug.id}`);
      onDelete(bug.id);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bug-item">
      <div className="bug-header">
        <h3 className="bug-title">{bug.title}</h3>
        <div className="bug-badges">
          <span className={`badge priority ${getPriorityClass(bug.priority)}`}>
            {bug.priority}
          </span>
          <span className={`badge status ${getStatusClass(bug.status)}`}>
            {bug.status}
          </span>
        </div>
      </div>

      <p className="bug-description">{bug.description}</p>

      <div className="bug-meta">
        <span className="meta-item">
          <strong>Reported by:</strong> {bug.reportedBy}
        </span>
        <span className="meta-item">
          <strong>Created:</strong> {formatDate(bug.createdAt)}
        </span>
      </div>

      <div className="bug-actions">
        <div className="status-change">
          <label htmlFor={`status-${bug.id}`}>Change Status:</label>
          <select
            id={`status-${bug.id}`}
            value={bug.status}
            onChange={handleStatusChange}
            className="status-select"
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <button onClick={handleDelete} className="btn-delete">
          Delete
        </button>
      </div>
    </div>
  );
};

export default BugItem;
