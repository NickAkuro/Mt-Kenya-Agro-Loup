import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../server.js';
import Bug from '../../models/Bug.js';

// Mock the Bug model
jest.mock('../../models/Bug.js');

describe('Bug Routes Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/bugs', () => {
    test('should return all bugs', async () => {
      const mockBugs = [
        {
          _id: '507f1f77bcf86cd799439011',
          title: 'Bug 1',
          description: 'Description 1',
          status: 'open',
          priority: 'high',
          reportedBy: 'John Doe',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          _id: '507f1f77bcf86cd799439012',
          title: 'Bug 2',
          description: 'Description 2',
          status: 'in-progress',
          priority: 'medium',
          reportedBy: 'Jane Smith',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      Bug.find = jest.fn().mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockBugs),
      });

      const response = await request(app).get('/api/bugs');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.count).toBe(2);
      expect(response.body.data).toHaveLength(2);
      expect(Bug.find).toHaveBeenCalledWith({});
    });

    test('should filter bugs by status', async () => {
      Bug.find = jest.fn().mockReturnValue({
        sort: jest.fn().mockResolvedValue([]),
      });

      await request(app).get('/api/bugs?status=open');

      expect(Bug.find).toHaveBeenCalledWith({ status: 'open' });
    });

    test('should filter bugs by priority', async () => {
      Bug.find = jest.fn().mockReturnValue({
        sort: jest.fn().mockResolvedValue([]),
      });

      await request(app).get('/api/bugs?priority=high');

      expect(Bug.find).toHaveBeenCalledWith({ priority: 'high' });
    });
  });

  describe('GET /api/bugs/:id', () => {
    test('should return a single bug', async () => {
      const mockBug = {
        _id: '507f1f77bcf86cd799439011',
        title: 'Test Bug',
        description: 'Test Description',
        status: 'open',
        priority: 'high',
        reportedBy: 'John Doe',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      Bug.findById = jest.fn().mockResolvedValue(mockBug);

      const response = await request(app).get('/api/bugs/507f1f77bcf86cd799439011');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe('Test Bug');
    });

    test('should return 400 for invalid ID format', async () => {
      const response = await request(app).get('/api/bugs/invalid-id');

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Invalid bug ID format');
    });

    test('should return 404 for non-existent bug', async () => {
      Bug.findById = jest.fn().mockResolvedValue(null);

      const response = await request(app).get('/api/bugs/507f1f77bcf86cd799439011');

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Bug not found');
    });
  });

  describe('POST /api/bugs', () => {
    test('should create a new bug', async () => {
      const newBug = {
        title: 'New Bug',
        description: 'This is a new bug description',
        reportedBy: 'John Doe',
        status: 'open',
        priority: 'high',
      };

      const mockCreatedBug = {
        _id: '507f1f77bcf86cd799439011',
        ...newBug,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      Bug.create = jest.fn().mockResolvedValue(mockCreatedBug);

      const response = await request(app).post('/api/bugs').send(newBug);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe('New Bug');
      expect(Bug.create).toHaveBeenCalled();
    });

    test('should reject bug with missing title', async () => {
      const invalidBug = {
        description: 'This is a description',
        reportedBy: 'John Doe',
      };

      const response = await request(app).post('/api/bugs').send(invalidBug);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.errors).toContain('Title is required');
    });

    test('should reject bug with short description', async () => {
      const invalidBug = {
        title: 'Test Bug',
        description: 'Short',
        reportedBy: 'John Doe',
      };

      const response = await request(app).post('/api/bugs').send(invalidBug);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/bugs/:id', () => {
    test('should update a bug', async () => {
      const updatedData = {
        title: 'Updated Bug',
        description: 'Updated description',
        reportedBy: 'John Doe',
        status: 'in-progress',
      };

      const mockUpdatedBug = {
        _id: '507f1f77bcf86cd799439011',
        ...updatedData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      Bug.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUpdatedBug);

      const response = await request(app)
        .put('/api/bugs/507f1f77bcf86cd799439011')
        .send(updatedData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe('Updated Bug');
    });

    test('should return 404 for non-existent bug', async () => {
      Bug.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

      const response = await request(app)
        .put('/api/bugs/507f1f77bcf86cd799439011')
        .send({
          title: 'Updated Bug',
          description: 'Updated description',
          reportedBy: 'John Doe',
        });

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('PATCH /api/bugs/:id/status', () => {
    test('should update bug status', async () => {
      const mockBug = {
        _id: '507f1f77bcf86cd799439011',
        title: 'Test Bug',
        description: 'Test Description',
        status: 'resolved',
        priority: 'high',
        reportedBy: 'John Doe',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      Bug.findByIdAndUpdate = jest.fn().mockResolvedValue(mockBug);

      const response = await request(app)
        .patch('/api/bugs/507f1f77bcf86cd799439011/status')
        .send({ status: 'resolved' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.status).toBe('resolved');
    });

    test('should reject invalid status', async () => {
      const response = await request(app)
        .patch('/api/bugs/507f1f77bcf86cd799439011/status')
        .send({ status: 'invalid-status' });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Invalid status value');
    });
  });

  describe('DELETE /api/bugs/:id', () => {
    test('should delete a bug', async () => {
      const mockBug = {
        _id: '507f1f77bcf86cd799439011',
        title: 'Test Bug',
      };

      Bug.findByIdAndDelete = jest.fn().mockResolvedValue(mockBug);

      const response = await request(app).delete('/api/bugs/507f1f77bcf86cd799439011');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Bug deleted successfully');
    });

    test('should return 404 for non-existent bug', async () => {
      Bug.findByIdAndDelete = jest.fn().mockResolvedValue(null);

      const response = await request(app).delete('/api/bugs/507f1f77bcf86cd799439011');

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });

    test('should return 400 for invalid ID', async () => {
      const response = await request(app).delete('/api/bugs/invalid-id');

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });
});
