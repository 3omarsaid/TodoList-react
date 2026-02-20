import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTodosStore } from "../../stores/todosStore";

export default function DeleteTodo({ id }: { id: number }) {
  let { removeTodo } = useTodosStore();
  return (
    <IconButton
      aria-label="delete"
      sx={{
        color: "red",
      }}
      onClick={() => {
        removeTodo(id);
      }}
    >
      <DeleteIcon />
    </IconButton>
  );
}
