import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import BugForm from '../components/BugForm';

describe('BugForm Component', () => {
  test('renders form with all fields', () => {
    render(<BugForm onSubmit={vi.fn()} />);

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/reported by/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
  });

  test('displays validation errors for empty fields', () => {
    const mockSubmit = vi.fn();
    render(<BugForm onSubmit={mockSubmit} />);

    const submitButton = screen.getByRole('button', { name: /submit bug/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    expect(screen.getByText(/description is required/i)).toBeInTheDocument();
    expect(screen.getByText(/reporter name is required/i)).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  test('displays validation error for short title', () => {
    const mockSubmit = vi.fn();
    render(<BugForm onSubmit={mockSubmit} />);

    const titleInput = screen.getByLabelText(/title/i);
    const submitButton = screen.getByRole('button', { name: /submit bug/i });

    fireEvent.change(titleInput, { target: { value: 'AB' } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/title must be at least 3 characters/i)).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  test('displays validation error for short description', () => {
    const mockSubmit = vi.fn();
    render(<BugForm onSubmit={mockSubmit} />);

    const descriptionInput = screen.getByLabelText(/description/i);
    const submitButton = screen.getByRole('button', { name: /submit bug/i });

    fireEvent.change(descriptionInput, { target: { value: 'Short' } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/description must be at least 10 characters/i)).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  test('submits form with valid data', () => {
    const mockSubmit = vi.fn();
    render(<BugForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Test Bug' },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'This is a test bug description' },
    });
    fireEvent.change(screen.getByLabelText(/reported by/i), {
      target: { value: 'John Doe' },
    });

    const submitButton = screen.getByRole('button', { name: /submit bug/i });
    fireEvent.click(submitButton);

    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'Test Bug',
      description: 'This is a test bug description',
      reportedBy: 'John Doe',
      status: 'open',
      priority: 'medium',
    });
  });

  test('clears errors when user starts typing', () => {
    const mockSubmit = vi.fn();
    render(<BugForm onSubmit={mockSubmit} />);

    const titleInput = screen.getByLabelText(/title/i);
    const submitButton = screen.getByRole('button', { name: /submit bug/i });

    // Submit empty form to trigger validation errors
    fireEvent.click(submitButton);
    expect(screen.getByText(/title is required/i)).toBeInTheDocument();

    // Start typing to clear error
    fireEvent.change(titleInput, { target: { value: 'Test' } });
    expect(screen.queryByText(/title is required/i)).not.toBeInTheDocument();
  });

  test('renders cancel button when onCancel is provided', () => {
    const mockCancel = vi.fn();
    render(<BugForm onSubmit={vi.fn()} onCancel={mockCancel} />);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    expect(cancelButton).toBeInTheDocument();

    fireEvent.click(cancelButton);
    expect(mockCancel).toHaveBeenCalled();
  });

  test('populates form with initial data', () => {
    const initialData = {
      title: 'Existing Bug',
      description: 'This is an existing bug',
      reportedBy: 'Jane Smith',
      status: 'in-progress',
      priority: 'high',
    };

    render(<BugForm onSubmit={vi.fn()} initialData={initialData} />);

    expect(screen.getByDisplayValue('Existing Bug')).toBeInTheDocument();
    expect(screen.getByDisplayValue('This is an existing bug')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Jane Smith')).toBeInTheDocument();
    expect(screen.getByDisplayValue('in-progress')).toBeInTheDocument();
    expect(screen.getByDisplayValue('high')).toBeInTheDocument();
  });
});
