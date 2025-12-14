import React, { useState } from 'react';
import './BugForm.css';

const BugForm = ({ onSubmit, initialData = null, onCancel }) => {
  const [formData, setFormData] = useState(
    initialData || {
      title: '',
      description: '',
      reportedBy: '',
      status: 'open',
      priority: 'medium',
    }
  );

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (!formData.reportedBy.trim()) {
      newErrors.reportedBy = 'Reporter name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);

    if (validateForm()) {
      onSubmit(formData);
      // Reset form if creating new bug
      if (!initialData) {
        setFormData({
          title: '',
          description: '',
          reportedBy: '',
          status: 'open',
          priority: 'medium',
        });
      }
    } else {
      console.log('Form validation failed:', errors);
    }
  };

  return (
    <form className="bug-form" onSubmit={handleSubmit}>
      <h2>{initialData ? 'Edit Bug' : 'Report New Bug'}</h2>

      <div className="form-group">
        <label htmlFor="title">
          Title <span className="required">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? 'error' : ''}
          placeholder="Enter bug title"
        />
        {errors.title && <span className="error-text">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">
          Description <span className="required">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={errors.description ? 'error' : ''}
          placeholder="Describe the bug in detail"
          rows="4"
        />
        {errors.description && <span className="error-text">{errors.description}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="reportedBy">
          Reported By <span className="required">*</span>
        </label>
        <input
          type="text"
          id="reportedBy"
          name="reportedBy"
          value={formData.reportedBy}
          onChange={handleChange}
          className={errors.reportedBy ? 'error' : ''}
          placeholder="Your name"
        />
        {errors.reportedBy && <span className="error-text">{errors.reportedBy}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={formData.status} onChange={handleChange}>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select id="priority" name="priority" value={formData.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Update Bug' : 'Submit Bug'}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default BugForm;
