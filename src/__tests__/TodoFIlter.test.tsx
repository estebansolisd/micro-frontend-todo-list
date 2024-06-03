import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import TodoFilter from '@/components/TodoFilter';
import { useTodoContext } from '@/context/TodoContext';

vi.mock('@/context/TodoContext', () => {
  return {
    useTodoContext: vi.fn(),
  };
});

describe('TodoFilter', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    (useTodoContext as Mock).mockReturnValue({
      state: { filter: 'ALL' },
      dispatch: mockDispatch,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the filter buttons', () => {
    render(<TodoFilter />);
    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /active/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /completed/i })).toBeInTheDocument();
  });

  it('highlights the "All" button when the filter is "ALL"', () => {
    (useTodoContext as Mock).mockReturnValue({
      state: { filter: 'ALL' },
      dispatch: mockDispatch,
    });
    render(<TodoFilter />);
    expect(screen.getByRole('button', { name: /all/i })).toHaveClass('bg-blue-500 text-white');
    expect(screen.getByRole('button', { name: /active/i })).toHaveClass('bg-gray-200');
    expect(screen.getByRole('button', { name: /completed/i })).toHaveClass('bg-gray-200');
  });

  it('highlights the "Active" button when the filter is "ACTIVE"', () => {
    (useTodoContext as Mock).mockReturnValue({
      state: { filter: 'ACTIVE' },
      dispatch: mockDispatch,
    });
    render(<TodoFilter />);
    expect(screen.getByRole('button', { name: /all/i })).toHaveClass('bg-gray-200');
    expect(screen.getByRole('button', { name: /active/i })).toHaveClass('bg-blue-500 text-white');
    expect(screen.getByRole('button', { name: /completed/i })).toHaveClass('bg-gray-200');
  });

  it('highlights the "Completed" button when the filter is "COMPLETED"', () => {
    (useTodoContext as Mock).mockReturnValue({
      state: { filter: 'COMPLETED' },
      dispatch: mockDispatch,
    });
    render(<TodoFilter />);
    expect(screen.getByRole('button', { name: /all/i })).toHaveClass('bg-gray-200');
    expect(screen.getByRole('button', { name: /active/i })).toHaveClass('bg-gray-200');
    expect(screen.getByRole('button', { name: /completed/i })).toHaveClass('bg-blue-500 text-white');
  });

  it('dispatches the correct filter actions when buttons are clicked', () => {
    render(<TodoFilter />);
    
    fireEvent.click(screen.getByRole('button', { name: /all/i }));
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_FILTER', filter: 'ALL' });
    
    fireEvent.click(screen.getByRole('button', { name: /active/i }));
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_FILTER', filter: 'ACTIVE' });
    
    fireEvent.click(screen.getByRole('button', { name: /completed/i }));
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_FILTER', filter: 'COMPLETED' });
  });
});
