import React from 'react';
import { useTodoContext } from '@/context/TodoContext';

const TodoFilter: React.FC = () => {
  const { state, dispatch } = useTodoContext();

  return (
    <div className="flex justify-center space-x-2 mt-4">
      <button
        onClick={() => dispatch({ type: 'SET_FILTER', filter: 'ALL' })}
        className={`px-4 py-2 rounded-md ${state.filter === 'ALL' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        All
      </button>
      <button
        onClick={() => dispatch({ type: 'SET_FILTER', filter: 'UNCOMPLETED' })}
        className={`px-4 py-2 rounded-md ${state.filter === 'UNCOMPLETED' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        Uncompleted
      </button>
      <button
        onClick={() => dispatch({ type: 'SET_FILTER', filter: 'COMPLETED' })}
        className={`px-4 py-2 rounded-md ${state.filter === 'COMPLETED' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        Completed
      </button>
    </div>
  );
};

export default TodoFilter;
