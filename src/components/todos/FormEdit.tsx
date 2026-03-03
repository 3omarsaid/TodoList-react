import { FormEvent, useContext, useState, useEffect } from "react";
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
import { useAuth } from "../../contexts/AuthContext";

export default function FormEdit() {
  let { editTodo, addTodo, getTodoTitle } = useTodosStore();
  let { modal, handleClose, showToast } = useUiStore();
  let [titleInput, setTitleInput] = useState("");
  let auth = useAuth();
  useEffect(() => {
    if (modal.isOpen && modal.todoID) {
      setTitleInput(getTodoTitle(modal.todoID));
    }
  }, [modal]);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (modal.todoID) {
      if (!auth?.user) return;
      await editTodo(modal.todoID, titleInput, auth?.user?.uid);
      showToast("todo updated");
    } else {
      if (!auth?.user) return;
      await addTodo(titleInput, auth?.user?.uid);
      showToast("todo added");
    }
    handleClose();
    setTitleInput("");
  };

  return (
    <Dialog
      open={modal.isOpen}
      onClose={() => {
        setTitleInput("");
        handleClose();
      }}
    >
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
            onChange={(e) => setTitleInput(e.target.value)}
            value={titleInput}
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
