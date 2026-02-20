import { FormEvent, useContext } from "react";
import {
  DialogTitle,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { useTodosStore } from "../../stores/todosStore";
import { useUiStore } from "../../stores/uiStore";

export default function FormEdit() {
  let { editTodo, addTodo, getTodoTitle } = useTodosStore();
  let { modal, handleClose, showToast } = useUiStore();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (formData.entries()) {
      const formJson = Object.fromEntries(formData.entries());
      const title = formJson.title;
      if (modal.todoID) {
        editTodo(modal.todoID, title as string);
        showToast("todo updated");
      } else {
        addTodo(title as string);
        showToast("todo added");
      }
      handleClose();
    }
  };

  return (
    <Dialog open={modal.isOpen} onClose={handleClose}>
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
            value={modal.todoID ? getTodoTitle(modal.todoID) : ""}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" form="Edit-form">
          submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
