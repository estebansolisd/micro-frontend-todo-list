import { render, fireEvent, screen } from '@testing-library/react';
import TodoList from '@/components/TodoList';
import '@testing-library/jest-dom';
import { vi } from "vitest";

describe('<TodoList />', () => {
  const todos = [
    { id: '1', text: 'Write microfrontend', completed: false },
    { id: '2', text: 'Write Songs !', completed: true },
  ];

  const onToggleTodoMock = vi.fn();
  const onRemoveTodoMock = vi.fn();

  beforeEach(() => {
    render(
      <TodoList
        todos={todos}
        onToggleTodo={onToggleTodoMock}
        onRemoveTodo={onRemoveTodoMock}
      />
    );
  });

  it('renders todos correctly', () => {
    todos.forEach(todo => {
      const todoTextElement = screen.getByText(todo.text);
      expect(todoTextElement).toBeInTheDocument();
    });
  });

  it('calls onToggleTodo when checkbox is clicked', () => {
    const checkbox = screen.getByLabelText('Write microfrontend');
    fireEvent.click(checkbox);
    expect(onToggleTodoMock).toHaveBeenCalledWith('1');
  });

  it('calls onRemoveTodo when remove button is clicked', () => {
    const [removeButton] = screen.getAllByText('Remove');
    fireEvent.click(removeButton);
    expect(onRemoveTodoMock).toHaveBeenCalledWith('1');
  });

  it('toggles todo completion when todo text is clicked', () => {
    const todoText  = screen.getByText('Write Songs !');
    fireEvent.click(todoText);
    expect(onToggleTodoMock).toHaveBeenCalledWith('2');
  });
});
