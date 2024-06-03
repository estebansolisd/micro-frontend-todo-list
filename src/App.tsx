import "@/App.css";
import { TodoProvider, useTodoContext } from "@/context/TodoContext";
import TodoCreation from "@/components/TodoCreation";
import TodoList from "@/components/TodoList";
import TodoFilter from "./components/TodoFilter";
import { useMemo } from "react";

function App() {
  const { state, dispatch } = useTodoContext();

  const handleToggleTodo = (id: string) => {
    dispatch({ type: "TOGGLE_TODO", id });
  };

  const handleRemoveTodo = (id: string) => {
    dispatch({ type: "REMOVE_TODO", id });
  };

  const filteredTodos = useMemo(
    () =>
      state.todos.filter((todo) => {
        if (state.filter === "ALL") return true;
        if (state.filter === "ACTIVE") return !todo.completed;
        if (state.filter === "COMPLETED") return todo.completed;
      }),
    [state.todos, state.filter]
  );


  return (
    <>
      <h1 className="font-bold text-xl">Todo List</h1>
      <TodoCreation />
      <TodoFilter />
      <TodoList
        todos={filteredTodos}
        onRemoveTodo={handleRemoveTodo}
        onToggleTodo={handleToggleTodo}
      />
    </>
  );
}

export default App;
