import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useContext } from "react";
import { UiContext } from "../../contexts/UiContext";
export default function EditTodo({ id }) {
  let { modalActions } = useContext(UiContext);
  return (
    <>
      <IconButton
        aria-label="edit"
        sx={{
          color: "white",
        }}
        onClick={() => {
          modalActions.handleClickOpen(id);
        }}
      >
        <EditIcon />
      </IconButton>
    </>
  );
}
