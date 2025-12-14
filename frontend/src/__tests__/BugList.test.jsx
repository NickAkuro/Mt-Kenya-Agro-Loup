import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import BugList from '../components/BugList';

describe('BugList Component', () => {
  const mockBugs = [
    {
      id: '1',
      title: 'Bug 1',
      description: 'Description 1',
      status: 'open',
      priority: 'high',
      reportedBy: 'John Doe',
      createdAt: '2024-01-01T12:00:00.000Z',
      updatedAt: '2024-01-01T12:00:00.000Z',
    },
    {
      id: '2',
      title: 'Bug 2',
      description: 'Description 2',
      status: 'in-progress',
      priority: 'medium',
      reportedBy: 'Jane Smith',
      createdAt: '2024-01-02T12:00:00.000Z',
      updatedAt: '2024-01-02T12:00:00.000Z',
    },
  ];

  test('renders loading state', () => {
    render(<BugList bugs={[]} loading={true} error={null} onStatusChange={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByText(/loading bugs/i)).toBeInTheDocument();
  });

  test('renders error state', () => {
    render(
      <BugList
        bugs={[]}
        loading={false}
        error="Failed to fetch bugs"
        onStatusChange={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText(/failed to fetch bugs/i)).toBeInTheDocument();
  });

  test('renders empty state when no bugs', () => {
    render(<BugList bugs={[]} loading={false} error={null} onStatusChange={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByText(/no bugs found/i)).toBeInTheDocument();
  });

  test('renders list of bugs', () => {
    render(
      <BugList
        bugs={mockBugs}
        loading={false}
        error={null}
        onStatusChange={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText('Bug 1')).toBeInTheDocument();
    expect(screen.getByText('Bug 2')).toBeInTheDocument();
    expect(screen.getByText(/bug reports \(2\)/i)).toBeInTheDocument();
  });

  test('displays correct bug count', () => {
    render(
      <BugList
        bugs={mockBugs}
        loading={false}
        error={null}
        onStatusChange={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText(/bug reports \(2\)/i)).toBeInTheDocument();
  });
});
