import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useData } from "../../contexts/DataContext";

export default function DeleteTodo({ id }: { id: number }) {
  let { dispatch } = useData();
  return (
    <IconButton
      aria-label="delete"
      sx={{
        color: "red",
      }}
      onClick={() => {
        dispatch({ type: "delete", payload: { id } });
      }}
    >
      <DeleteIcon />
    </IconButton>
  );
}
