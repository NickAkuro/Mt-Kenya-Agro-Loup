import React, { useState, useEffect } from 'react';
import BugForm from './components/BugForm';
import BugList from './components/BugList';
import ErrorBoundary from './components/ErrorBoundary';
import bugService from './services/bugService';
import './App.css';

function App() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch all bugs on component mount
  useEffect(() => {
    fetchBugs();
  }, []);

  const fetchBugs = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching bugs...');
      
      const response = await bugService.getAllBugs();
      console.log('Bugs fetched successfully:', response.data);
      
      setBugs(response.data);
    } catch (err) {
      console.error('Error fetching bugs:', err);
      const errorMessage = err.response?.data?.error || 'Failed to fetch bugs';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBug = async (bugData) => {
    try {
      console.log('Creating bug with data:', bugData);
      setError(null);
      
      const response = await bugService.createBug(bugData);
      console.log('Bug created successfully:', response.data);
      
      // Add new bug to the list
      setBugs((prev) => [response.data, ...prev]);
      
      setSuccessMessage('Bug reported successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error creating bug:', err);
      const errorMessage = err.response?.data?.error || 'Failed to create bug';
      setError(errorMessage);
      
      // Display validation errors if any
      if (err.response?.data?.errors) {
        console.error('Validation errors:', err.response.data.errors);
      }
    }
  };

  const handleStatusChange = async (bugId, newStatus) => {
    try {
      console.log(`Updating bug ${bugId} status to ${newStatus}`);
      setError(null);
      
      const response = await bugService.updateBugStatus(bugId, newStatus);
      console.log('Bug status updated:', response.data);
      
      // Update bug in the list
      setBugs((prev) =>
        prev.map((bug) => (bug.id === bugId ? response.data : bug))
      );
      
      setSuccessMessage('Bug status updated!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error updating bug status:', err);
      const errorMessage = err.response?.data?.error || 'Failed to update bug status';
      setError(errorMessage);
    }
  };

  const handleDeleteBug = async (bugId) => {
    try {
      console.log(`Deleting bug ${bugId}`);
      setError(null);
      
      await bugService.deleteBug(bugId);
      console.log('Bug deleted successfully');
      
      // Remove bug from the list
      setBugs((prev) => prev.filter((bug) => bug.id !== bugId));
      
      setSuccessMessage('Bug deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error deleting bug:', err);
      const errorMessage = err.response?.data?.error || 'Failed to delete bug';
      setError(errorMessage);
    }
  };

  return (
    <ErrorBoundary>
      <div className="container">
        <header className="app-header">
          <h1>🐛 Bug Tracker</h1>
          <p className="subtitle">Track and manage bugs efficiently</p>
        </header>

        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="success-message" role="status">
            {successMessage}
          </div>
        )}

        <BugForm onSubmit={handleCreateBug} />

        <BugList
          bugs={bugs}
          onStatusChange={handleStatusChange}
          onDelete={handleDeleteBug}
          loading={loading}
          error={null}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;
