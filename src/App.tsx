import "@/App.css";
import { TodoProvider } from "@/context/TodoContext";
import TodoCreation from "@/components/TodoCreation";
import TodoList from "@/components/TodoList";

function App() {
  return (
    <TodoProvider>
      <div>
        <h1 className="font-bold text-xl">Todo List</h1>
        <TodoCreation />
        <TodoList />
      </div>
    </TodoProvider>
  );
}

export default App;
