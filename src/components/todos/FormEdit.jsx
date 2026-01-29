import { useContext } from "react";
import {
  DialogTitle,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { DataContext } from "../../contexts/DataContext";
import { UiContext } from "../../contexts/UiContext";

export default function FormEdit() {
  let { dispatch } = useContext(DataContext);
  let { modal, modalActions } = useContext(UiContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const title = formJson.title;
    dispatch({ type: "edit", payload: { id: modal.todoID, title } });
    modalActions.handleClose();
  };

  return (
    <Dialog open={modal.isOpen} onClose={modalActions.handleClose}>
      <DialogTitle>Edit Todo Form</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} id="Edit-form">
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Todo Title"
            type="text"
            fullWidth
            variant="filled"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={modalActions.handleClose}>Cancel</Button>
        <Button type="submit" form="Edit-form">
          submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
