import React, { useState } from 'react';
import { useTodoContext } from '@/context/TodoContext';

const TodoCreation: React.FC = () => {
  const [text, setText] = useState('');
  const { dispatch } = useTodoContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch({ type: 'ADD_TODO', text });
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 mt-4" role="form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo"
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button 
        type="submit" 
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add Todo
      </button>
    </form>
  );
};

export default TodoCreation;
