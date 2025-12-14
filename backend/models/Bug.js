import mongoose from 'mongoose';

const bugSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Bug title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters long'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Bug description is required'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters long'],
    },
    status: {
      type: String,
      enum: ['open', 'in-progress', 'resolved'],
      default: 'open',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    reportedBy: {
      type: String,
      required: [true, 'Reporter name is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Bug = mongoose.model('Bug', bugSchema);

export default Bug;
