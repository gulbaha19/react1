import { TodoItem } from "./TodoItem";
import { useMemo } from "react";

export function TodoList({ todos, onTodoChange }) {
  const sortedTodos = useMemo(() => {
    const s = [...todos];
    return s.sort((a, b) => a.done - b.done);
  }, [todos]);
  return (
    <div style={{ border: "2px solid red", width: "500px" }}>
      {sortedTodos.map((todo) => (
        <TodoItem key={todo.created} todo={todo} onTodoChange={onTodoChange} />
      ))}
    </div>
  );
}
