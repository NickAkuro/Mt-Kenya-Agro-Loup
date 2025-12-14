import express from 'express';
import Bug from '../models/Bug.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { validateBugData, sanitizeBugData, isValidObjectId, formatBugResponse } from '../utils/validation.js';

const router = express.Router();

/**
 * @route   GET /api/bugs
 * @desc    Get all bugs
 * @access  Public
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    console.log('GET /api/bugs - Fetching all bugs');
    
    const { status, priority } = req.query;
    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter.priority = priority;
    }

    const bugs = await Bug.find(filter).sort({ createdAt: -1 });
    
    console.log(`Found ${bugs.length} bugs`);
    
    res.status(200).json({
      success: true,
      count: bugs.length,
      data: bugs.map(formatBugResponse),
    });
  })
);

/**
 * @route   GET /api/bugs/:id
 * @desc    Get single bug by ID
 * @access  Public
 */
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    console.log(`GET /api/bugs/${id} - Fetching bug`);

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid bug ID format',
      });
    }

    const bug = await Bug.findById(id);

    if (!bug) {
      return res.status(404).json({
        success: false,
        error: 'Bug not found',
      });
    }

    res.status(200).json({
      success: true,
      data: formatBugResponse(bug),
    });
  })
);

/**
 * @route   POST /api/bugs
 * @desc    Create a new bug
 * @access  Public
 */
router.post(
  '/',
  asyncHandler(async (req, res) => {
    console.log('POST /api/bugs - Creating new bug');
    console.log('Request body:', req.body);

    // Sanitize input data
    const sanitizedData = sanitizeBugData(req.body);

    // Validate bug data
    const validation = validateBugData(sanitizedData);
    
    if (!validation.isValid) {
      console.log('Validation failed:', validation.errors);
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        errors: validation.errors,
      });
    }

    // Create bug
    const bug = await Bug.create(sanitizedData);
    
    console.log('Bug created successfully:', bug._id);

    res.status(201).json({
      success: true,
      data: formatBugResponse(bug),
    });
  })
);

/**
 * @route   PUT /api/bugs/:id
 * @desc    Update a bug
 * @access  Public
 */
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    console.log(`PUT /api/bugs/${id} - Updating bug`);

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid bug ID format',
      });
    }

    // Sanitize input data
    const sanitizedData = sanitizeBugData(req.body);

    // Validate bug data
    const validation = validateBugData(sanitizedData);
    
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        errors: validation.errors,
      });
    }

    const bug = await Bug.findByIdAndUpdate(id, sanitizedData, {
      new: true,
      runValidators: true,
    });

    if (!bug) {
      return res.status(404).json({
        success: false,
        error: 'Bug not found',
      });
    }

    console.log('Bug updated successfully');

    res.status(200).json({
      success: true,
      data: formatBugResponse(bug),
    });
  })
);

/**
 * @route   PATCH /api/bugs/:id/status
 * @desc    Update bug status only
 * @access  Public
 */
router.patch(
  '/:id/status',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    console.log(`PATCH /api/bugs/${id}/status - Updating status to ${status}`);

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid bug ID format',
      });
    }

    if (!['open', 'in-progress', 'resolved'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status value',
      });
    }

    const bug = await Bug.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!bug) {
      return res.status(404).json({
        success: false,
        error: 'Bug not found',
      });
    }

    res.status(200).json({
      success: true,
      data: formatBugResponse(bug),
    });
  })
);

/**
 * @route   DELETE /api/bugs/:id
 * @desc    Delete a bug
 * @access  Public
 */
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    console.log(`DELETE /api/bugs/${id} - Deleting bug`);

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid bug ID format',
      });
    }

    const bug = await Bug.findByIdAndDelete(id);

    if (!bug) {
      return res.status(404).json({
        success: false,
        error: 'Bug not found',
      });
    }

    console.log('Bug deleted successfully');

    res.status(200).json({
      success: true,
      message: 'Bug deleted successfully',
    });
  })
);

export default router;
