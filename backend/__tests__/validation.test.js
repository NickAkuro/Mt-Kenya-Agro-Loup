import {
  validateBugData,
  sanitizeBugData,
  isValidObjectId,
  formatBugResponse,
} from '../../utils/validation.js';

describe('Validation Utilities', () => {
  describe('validateBugData', () => {
    test('should validate correct bug data', () => {
      const validBug = {
        title: 'Test Bug',
        description: 'This is a test bug description',
        reportedBy: 'John Doe',
        status: 'open',
        priority: 'high',
      };

      const result = validateBugData(validBug);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should reject bug without title', () => {
      const invalidBug = {
        description: 'This is a test bug description',
        reportedBy: 'John Doe',
      };

      const result = validateBugData(invalidBug);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Title is required');
    });

    test('should reject bug with short title', () => {
      const invalidBug = {
        title: 'AB',
        description: 'This is a test bug description',
        reportedBy: 'John Doe',
      };

      const result = validateBugData(invalidBug);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Title must be at least 3 characters long');
    });

    test('should reject bug with long title', () => {
      const invalidBug = {
        title: 'A'.repeat(101),
        description: 'This is a test bug description',
        reportedBy: 'John Doe',
      };

      const result = validateBugData(invalidBug);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Title cannot exceed 100 characters');
    });

    test('should reject bug without description', () => {
      const invalidBug = {
        title: 'Test Bug',
        reportedBy: 'John Doe',
      };

      const result = validateBugData(invalidBug);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Description is required');
    });

    test('should reject bug with short description', () => {
      const invalidBug = {
        title: 'Test Bug',
        description: 'Short',
        reportedBy: 'John Doe',
      };

      const result = validateBugData(invalidBug);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Description must be at least 10 characters long');
    });

    test('should reject bug without reporter', () => {
      const invalidBug = {
        title: 'Test Bug',
        description: 'This is a test bug description',
      };

      const result = validateBugData(invalidBug);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Reporter name is required');
    });

    test('should reject bug with invalid status', () => {
      const invalidBug = {
        title: 'Test Bug',
        description: 'This is a test bug description',
        reportedBy: 'John Doe',
        status: 'invalid-status',
      };

      const result = validateBugData(invalidBug);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid status value');
    });

    test('should reject bug with invalid priority', () => {
      const invalidBug = {
        title: 'Test Bug',
        description: 'This is a test bug description',
        reportedBy: 'John Doe',
        priority: 'super-critical',
      };

      const result = validateBugData(invalidBug);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid priority value');
    });
  });

  describe('sanitizeBugData', () => {
    test('should trim whitespace from fields', () => {
      const bugData = {
        title: '  Test Bug  ',
        description: '  This is a test  ',
        reportedBy: '  John Doe  ',
      };

      const result = sanitizeBugData(bugData);
      expect(result.title).toBe('Test Bug');
      expect(result.description).toBe('This is a test');
      expect(result.reportedBy).toBe('John Doe');
    });

    test('should handle undefined fields', () => {
      const bugData = {};
      const result = sanitizeBugData(bugData);
      expect(result.title).toBeUndefined();
      expect(result.description).toBeUndefined();
      expect(result.reportedBy).toBeUndefined();
    });
  });

  describe('isValidObjectId', () => {
    test('should validate correct ObjectId', () => {
      const validId = '507f1f77bcf86cd799439011';
      expect(isValidObjectId(validId)).toBe(true);
    });

    test('should reject invalid ObjectId', () => {
      expect(isValidObjectId('invalid-id')).toBe(false);
      expect(isValidObjectId('123')).toBe(false);
      expect(isValidObjectId('')).toBe(false);
    });
  });

  describe('formatBugResponse', () => {
    test('should format bug object correctly', () => {
      const bug = {
        _id: '507f1f77bcf86cd799439011',
        title: 'Test Bug',
        description: 'Test Description',
        status: 'open',
        priority: 'high',
        reportedBy: 'John Doe',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = formatBugResponse(bug);
      expect(result.id).toBe(bug._id);
      expect(result.title).toBe(bug.title);
      expect(result).not.toHaveProperty('_id');
    });

    test('should return null for null input', () => {
      const result = formatBugResponse(null);
      expect(result).toBeNull();
    });
  });
});
