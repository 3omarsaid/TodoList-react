import { FormEvent, useContext, useState, useEffect } from "react";
import {
  DialogTitle,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useTodosStore } from "../../stores/todosStore";
import { useCategoriesStore } from "../../stores/categoriesStore";
import { useUiStore } from "../../stores/uiStore";
import { useAuth } from "../../contexts/AuthContext";

export default function FormEdit() {
  let { editTodo, addTodo, getTodoTitle, todos } = useTodosStore();
  let { categories, getCategoryName } = useCategoriesStore();
  let {
    modal,
    handleClose,
    showToast,
    handleCategoryClickOpen,
    lastCreatedCategoryId,
  } = useUiStore();
  let [titleInput, setTitleInput] = useState("");
  let [selectedCategory, setSelectedCategory] = useState<string>("");
  let auth = useAuth();

  useEffect(() => {
    if (lastCreatedCategoryId && modal.isOpen) {
      setSelectedCategory(lastCreatedCategoryId);
    }
  }, [lastCreatedCategoryId]);
  useEffect(() => {
    if (modal.isOpen && modal.todoID) {
      setTitleInput(getTodoTitle(modal.todoID));
      const todo = todos.find((t) => t.id === modal.todoID);
      setSelectedCategory(todo?.categoryId || "");
    } else {
      setSelectedCategory("");
    }
  }, [modal]);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (modal.todoID) {
      if (!auth?.user) return;
      await editTodo(
        modal.todoID,
        titleInput,
        auth?.user?.uid,
        selectedCategory,
      );
      showToast("todo updated");
    } else {
      if (!auth?.user) return;
      await addTodo(titleInput, auth?.user?.uid, selectedCategory);
      showToast("todo added");
    }
    handleClose();
    setTitleInput("");
    setSelectedCategory("");
  };
  return (
    <Dialog
      open={modal.isOpen}
      onClose={() => {
        setTitleInput("");
        setSelectedCategory("");
        handleClose();
      }}
      PaperProps={{
        style: {
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          color: "white",
          borderRadius: "16px",
        },
      }}
    >
      <DialogTitle sx={{ color: "white" }}>Edit Todo Form</DialogTitle>
      <DialogContent>
        <form
          onSubmit={handleSubmit}
          id="Edit-form"
          className="flex flex-col gap-4"
        >
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
            sx={{
              "& .MuiInputBase-input": { color: "white" },
              "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
              "& .MuiFilledInput-root": {
                backgroundColor: "rgba(255,255,255,0.05)",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                "&.Mui-focused": { backgroundColor: "rgba(255,255,255,0.15)" },
              },
            }}
          />
          <FormControl
            fullWidth
            variant="filled"
            sx={{
              "& .MuiInputBase-root": {
                color: "white",
                backgroundColor: "rgba(255,255,255,0.05)",
              },
              "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
              "& .MuiFilledInput-root:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
              },
              "& .MuiSelect-icon": { color: "white" },
            }}
          >
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={selectedCategory}
              onChange={(e) => {
                if (e.target.value === "ADD_NEW") {
                  handleCategoryClickOpen();
                } else {
                  setSelectedCategory(e.target.value);
                }
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "white",
                    "& .MuiMenuItem-root:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.2)",
                    },
                    "& .Mui-selected": {
                      bgcolor: "rgba(255, 255, 255, 0.3) !important",
                    },
                  },
                },
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {categories.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
              <MenuItem
                value="ADD_NEW"
                sx={{ fontWeight: "bold", color: "primary.main" }}
              >
                + Add New Category
              </MenuItem>
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: "rgba(255,255,255,0.7)" }}>
          Cancel
        </Button>
        <Button type="submit" form="Edit-form" sx={{ color: "white" }}>
          submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
