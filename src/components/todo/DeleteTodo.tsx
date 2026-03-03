import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTodosStore } from "../../stores/todosStore";
import { useAuth } from "../../contexts/AuthContext";

export default function DeleteTodo({ id }: { id: string }) {
  let { removeTodo } = useTodosStore();
  let auth = useAuth();
  return (
    <IconButton
      aria-label="delete"
      sx={{
        color: "red",
      }}
      onClick={() => {
        if (!auth?.user) return;
        removeTodo(id,auth.user.uid);
      }}
    >
      <DeleteIcon />
    </IconButton>
  );
}
