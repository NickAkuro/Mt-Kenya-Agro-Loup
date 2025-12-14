/**
 * Validates bug data
 * @param {Object} bugData - The bug data to validate
 * @returns {Object} - Validation result with isValid and errors
 */
export const validateBugData = (bugData) => {
  const errors = [];

  if (!bugData.title || bugData.title.trim().length === 0) {
    errors.push('Title is required');
  } else if (bugData.title.trim().length < 3) {
    errors.push('Title must be at least 3 characters long');
  } else if (bugData.title.trim().length > 100) {
    errors.push('Title cannot exceed 100 characters');
  }

  if (!bugData.description || bugData.description.trim().length === 0) {
    errors.push('Description is required');
  } else if (bugData.description.trim().length < 10) {
    errors.push('Description must be at least 10 characters long');
  }

  if (!bugData.reportedBy || bugData.reportedBy.trim().length === 0) {
    errors.push('Reporter name is required');
  }

  if (bugData.status && !['open', 'in-progress', 'resolved'].includes(bugData.status)) {
    errors.push('Invalid status value');
  }

  if (bugData.priority && !['low', 'medium', 'high', 'critical'].includes(bugData.priority)) {
    errors.push('Invalid priority value');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Sanitizes bug data by trimming whitespace
 * @param {Object} bugData - The bug data to sanitize
 * @returns {Object} - Sanitized bug data
 */
export const sanitizeBugData = (bugData) => {
  return {
    ...bugData,
    title: bugData.title?.trim(),
    description: bugData.description?.trim(),
    reportedBy: bugData.reportedBy?.trim(),
  };
};

/**
 * Checks if a string is a valid MongoDB ObjectId
 * @param {string} id - The ID to validate
 * @returns {boolean} - True if valid ObjectId
 */
export const isValidObjectId = (id) => {
  const objectIdPattern = /^[0-9a-fA-F]{24}$/;
  return objectIdPattern.test(id);
};

/**
 * Formats bug data for response
 * @param {Object} bug - The bug object from database
 * @returns {Object} - Formatted bug data
 */
export const formatBugResponse = (bug) => {
  if (!bug) return null;
  
  return {
    id: bug._id,
    title: bug.title,
    description: bug.description,
    status: bug.status,
    priority: bug.priority,
    reportedBy: bug.reportedBy,
    createdAt: bug.createdAt,
    updatedAt: bug.updatedAt,
  };
};
