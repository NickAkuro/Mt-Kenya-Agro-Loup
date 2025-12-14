import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import BugItem from '../components/BugItem';

describe('BugItem Component', () => {
  const mockBug = {
    id: '123',
    title: 'Test Bug',
    description: 'This is a test bug description',
    status: 'open',
    priority: 'high',
    reportedBy: 'John Doe',
    createdAt: '2024-01-01T12:00:00.000Z',
    updatedAt: '2024-01-01T12:00:00.000Z',
  };

  test('renders bug information correctly', () => {
    render(<BugItem bug={mockBug} onStatusChange={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByText('Test Bug')).toBeInTheDocument();
    expect(screen.getByText('This is a test bug description')).toBeInTheDocument();
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText('high')).toBeInTheDocument();
    expect(screen.getByText('open')).toBeInTheDocument();
  });

  test('calls onStatusChange when status is changed', () => {
    const mockStatusChange = vi.fn();
    render(<BugItem bug={mockBug} onStatusChange={mockStatusChange} onDelete={vi.fn()} />);

    const statusSelect = screen.getByRole('combobox');
    fireEvent.change(statusSelect, { target: { value: 'in-progress' } });

    expect(mockStatusChange).toHaveBeenCalledWith('123', 'in-progress');
  });

  test('calls onDelete when delete button is clicked and confirmed', () => {
    const mockDelete = vi.fn();
    window.confirm = vi.fn(() => true);

    render(<BugItem bug={mockBug} onStatusChange={vi.fn()} onDelete={mockDelete} />);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this bug?');
    expect(mockDelete).toHaveBeenCalledWith('123');
  });

  test('does not call onDelete when deletion is cancelled', () => {
    const mockDelete = vi.fn();
    window.confirm = vi.fn(() => false);

    render(<BugItem bug={mockBug} onStatusChange={vi.fn()} onDelete={mockDelete} />);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(window.confirm).toHaveBeenCalled();
    expect(mockDelete).not.toHaveBeenCalled();
  });

  test('applies correct CSS classes for different statuses', () => {
    const { rerender } = render(
      <BugItem bug={mockBug} onStatusChange={vi.fn()} onDelete={vi.fn()} />
    );

    let statusBadge = screen.getByText('open');
    expect(statusBadge).toHaveClass('status-open');

    rerender(
      <BugItem
        bug={{ ...mockBug, status: 'in-progress' }}
        onStatusChange={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    statusBadge = screen.getByText('in-progress');
    expect(statusBadge).toHaveClass('status-in-progress');

    rerender(
      <BugItem
        bug={{ ...mockBug, status: 'resolved' }}
        onStatusChange={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    statusBadge = screen.getByText('resolved');
    expect(statusBadge).toHaveClass('status-resolved');
  });

  test('applies correct CSS classes for different priorities', () => {
    const { rerender } = render(
      <BugItem bug={mockBug} onStatusChange={vi.fn()} onDelete={vi.fn()} />
    );

    let priorityBadge = screen.getByText('high');
    expect(priorityBadge).toHaveClass('priority-high');

    rerender(
      <BugItem
        bug={{ ...mockBug, priority: 'critical' }}
        onStatusChange={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    priorityBadge = screen.getByText('critical');
    expect(priorityBadge).toHaveClass('priority-critical');
  });
});
