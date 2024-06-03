import React from 'react';
import { useTodoContext } from '@/context/TodoContext';

const TodoList: React.FC = () => {
  const { state, dispatch } = useTodoContext();

  return (
    <ul className="mt-4 space-y-2">
      {state.todos.map((todo) => (
        <li 
          key={todo.id} 
          className="flex justify-between items-center p-3 bg-white shadow-md rounded-md"
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => dispatch({ type: 'TOGGLE_TODO', id: todo.id })}
          />
          <span
            className={`flex-1 cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
            onClick={() => dispatch({ type: 'TOGGLE_TODO', id: todo.id })}
          >
            {todo.text}
          </span>
          <button 
            onClick={() => dispatch({ type: 'REMOVE_TODO', id: todo.id })}
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
