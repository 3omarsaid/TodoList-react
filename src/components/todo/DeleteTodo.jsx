import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";

export default function DeleteTodo({ id }) {
  let { dispatch } = useContext(DataContext);
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
