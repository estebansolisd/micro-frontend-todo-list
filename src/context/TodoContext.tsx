import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { v4 } from "uuid";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

type TodoState = {
  todos: Todo[];
  filter: "ALL" | "UNCOMPLETED" | "COMPLETED"
};

type Filter = "ALL" | "UNCOMPLETED" | "COMPLETED";

type Action =
  | { type: "ADD_TODO"; text: string }
  | { type: "TOGGLE_TODO"; id: string }
  | { type: "REMOVE_TODO"; id: string }
  | { type: "SET_TODOS"; todos: Todo[] }
  | { type: "SET_FILTER"; filter: Filter };

const initialState: TodoState = {
  todos: [],
  filter: "ALL",
};

const TodoContext = createContext<
  { state: TodoState; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

function todoReducer(state: TodoState, action: Action): TodoState {
  switch (action.type) {
    case "ADD_TODO":
      const newTodo = { id: v4(), text: action.text, completed: false };
      return { ...state, todos: [...state.todos, newTodo] };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    case "SET_TODOS":
      return { ...state, todos: action.todos };
    case "SET_FILTER":
      return { ...state, filter: action.filter };
    default:
      return state;
  }
}

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    dispatch({ type: "SET_TODOS", todos: savedTodos });
  }, []);

  useEffect(() => {
    if (state.todos.length) {
        localStorage.setItem("todos", JSON.stringify(state.todos));
    }
  }, [state.todos]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};
