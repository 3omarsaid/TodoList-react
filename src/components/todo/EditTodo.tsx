import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useUiStore } from "../../stores/uiStore";
export default function EditTodo({ id }: { id: string }) {
  let { handleClickOpen } = useUiStore();

  return (
    <>
      <IconButton
        aria-label="edit"
        sx={{
          color: "white",
        }}
        onClick={() => {
          handleClickOpen(id);
        }}
      >
        <EditIcon />
      </IconButton>
    </>
  );
}
