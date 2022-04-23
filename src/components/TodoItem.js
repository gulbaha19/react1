import { Button, Checkbox, styled } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";

const Title = styled("span")``;
export function TodoItem({ todo, onTodoChange }) {
  const dispatch = useDispatch();
  const created = useMemo(() => {
    return new Date(todo.created).toLocaleTimeString();
  }, [todo.created]);

  const handleRemoveClick = useCallback(() => {
    dispatch({ type: "todos/remove", payload: todo.created });
  }, [todo.created, dispatch]);
  const List = styled("li")`
    display: ${(props) => (props.done ? "none" : " ")};
  `;

  return (
    <div style={{ display: "flex", border: "2px solid red" }}>
      <ul>
        <List done={todo.done}>
          <Checkbox checked={todo.done} onChange={() => onTodoChange(todo.created, !todo.done)} />
          <Title>{todo.text}</Title>
          <br />
          {created}
          <Button size="small" onClick={handleRemoveClick}>
            Delete
          </Button>
        </List>
      </ul>

      <ul style={{ "margin-left": "200px" }}>
        <List done={!todo.done}>
          <Checkbox checked={todo.done} onChange={() => onTodoChange(todo.created, !todo.done)} />
          <Title>{todo.text}</Title>
          <br />
          {created}
          <Button size="small" onClick={handleRemoveClick}>
            Delete
          </Button>
        </List>
      </ul>
    </div>
  );
}
