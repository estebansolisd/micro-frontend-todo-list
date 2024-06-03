import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import TodoList from '@/components/TodoList';
import { useTodoContext } from '@/context/TodoContext';

// Mock useTodoContext
vi.mock('@/context/TodoContext', () => {
  return {
    useTodoContext: vi.fn(),
  };
});

describe('TodoList', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    (useTodoContext as Mock).mockReturnValue({
      state: {
        todos: [
          { id: '1', text: 'Learn React', completed: false },
          { id: '2', text: 'Write Tests', completed: true },
          { id: '3', text: 'Deploy App', completed: false },
        ],
        filter: 'ALL',
      },
      dispatch: mockDispatch,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the list of todos', () => {
    render(<TodoList />);
    const todoItems = screen.getAllByRole('listitem');
    expect(todoItems).toHaveLength(3);
  });

  it('toggles todo completion when clicking on checkbox or text', () => {
    render(<TodoList />);
    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'TOGGLE_TODO', id: '1' });

    const todoText = screen.getByText('Write Tests');
    fireEvent.click(todoText);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'TOGGLE_TODO', id: '2' });
  });

  it('removes todo when clicking on remove button', () => {
    render(<TodoList />);
    const removeButton = screen.getAllByRole('button', { name: /remove/i })[0];
    fireEvent.click(removeButton);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'REMOVE_TODO', id: '1' });
  });

  it('filters todos correctly based on state.filter === "ALL"', () => {
    render(<TodoList />);
    const todoItems = screen.getAllByRole('listitem');
    expect(todoItems).toHaveLength(3);
  });

  it('filters todos correctly based on state.filter === "ACTIVE"', () => {
    (useTodoContext as Mock).mockReturnValue({
      state: {
        todos: [
          { id: '1', text: 'Learn React', completed: false },
          { id: '2', text: 'Write Tests', completed: true },
          { id: '3', text: 'Deploy App', completed: false },
        ],
        filter: 'ACTIVE',
      },
      dispatch: mockDispatch,
    });

    render(<TodoList />);
    const todoItems = screen.getAllByRole('listitem');
    expect(todoItems).toHaveLength(2);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Deploy App')).toBeInTheDocument();
  });

  it('filters todos correctly based on state.filter === "COMPLETED"', () => {
    (useTodoContext as Mock).mockReturnValue({
      state: {
        todos: [
          { id: '1', text: 'Learn React', completed: false },
          { id: '2', text: 'Write Tests', completed: true },
          { id: '3', text: 'Deploy App', completed: false },
        ],
        filter: 'COMPLETED',
      },
      dispatch: mockDispatch,
    });

    render(<TodoList />);
    const todoItems = screen.getAllByRole('listitem');
    expect(todoItems).toHaveLength(1);
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
  });
});
