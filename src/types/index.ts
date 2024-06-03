export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: string) => void;
  onRemoveTodo: (id: string) => void;
}
