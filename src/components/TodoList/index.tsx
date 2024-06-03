import React, { useMemo } from "react";
import { Todo, TodoListProps } from "@/types";

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onRemoveTodo,
  onToggleTodo,
}) => {
  return (
    <ul className="mt-4 space-y-2">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex justify-between items-center p-3 bg-white shadow-md rounded-md"
        >
          <input
            id={todo.id}
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggleTodo(todo.id)}
          />
          <label
            htmlFor={todo.id}
            className={`flex-1 cursor-pointer ${
              todo.completed ? "line-through text-gray-500" : ""
            }`}
            onClick={() => onToggleTodo(todo.id)}
          >
            {todo.text}
          </label>
          <button
            onClick={() => onRemoveTodo(todo.id)}
            className="ml-4 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
