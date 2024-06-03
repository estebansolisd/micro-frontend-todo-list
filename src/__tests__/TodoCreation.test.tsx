import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock, afterEach } from 'vitest';
import TodoCreation from '@/components/TodoCreation';
import { useTodoContext } from '@/context/TodoContext';

vi.mock('@/context/TodoContext', () => {
  return {
    useTodoContext: vi.fn(),
  };
});

describe('TodoCreation', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    (useTodoContext as Mock).mockReturnValue({ dispatch: mockDispatch });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the input and button', () => {
    render(<TodoCreation />);
    expect(screen.getByPlaceholderText(/add a new todo/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add todo/i })).toBeInTheDocument();
  });

  it('allows users to type into the input', () => {
    render(<TodoCreation />);
    const input = screen.getByPlaceholderText(/add a new todo/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Hello World' } });
    expect(input.value).toBe('Hello World');
  });

  it('dispatches ADD_TODO action and clears input on form submit', () => {
    render(<TodoCreation />);
    const input = screen.getByPlaceholderText(/add a new todo/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Hello World' } });
    const form = screen.getByRole('form');
    fireEvent.submit(form);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'ADD_TODO', text: 'Hello World' });
    expect(input.value).toBe('');
  });

  it('does not dispatch ADD_TODO action if input is empty',() => {
    render(<TodoCreation />);
    const form = screen.getByRole('form');
    fireEvent.submit(form);
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
