import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useUi } from "../../contexts/UiContext";
export default function EditTodo({ id }: { id: number }) {
  let { modalActions } = useUi();
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
