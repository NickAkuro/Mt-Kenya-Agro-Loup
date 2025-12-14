import React from 'react';
import BugItem from './BugItem';
import './BugList.css';

const BugList = ({ bugs, onStatusChange, onDelete, loading, error }) => {
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading bugs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  if (!bugs || bugs.length === 0) {
    return (
      <div className="empty-state">
        <h3>No Bugs Found</h3>
        <p>There are no bugs reported yet. Create one using the form above.</p>
      </div>
    );
  }

  return (
    <div className="bug-list">
      <h2>Bug Reports ({bugs.length})</h2>
      <div className="bug-list-items">
        {bugs.map((bug) => (
          <BugItem
            key={bug.id}
            bug={bug}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default BugList;
