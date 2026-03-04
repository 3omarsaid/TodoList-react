import { FormEvent, useEffect, useState } from "react";
import {
  DialogTitle,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { useCategoriesStore } from "../../stores/categoriesStore";
import { useUiStore } from "../../stores/uiStore";
import { useAuth } from "../../contexts/AuthContext";

export default function CategoryModal() {
  const { addCategory, editCategory, getCategoryName } = useCategoriesStore();
  const { categoryModal, handleCategoryClose, showToast } = useUiStore();
  const [nameInput, setNameInput] = useState("");
  const auth = useAuth();

  useEffect(() => {
    if (categoryModal.isOpen && categoryModal.categoryId) {
      setNameInput(getCategoryName(categoryModal.categoryId));
    } else {
      setNameInput("");
    }
  }, [categoryModal]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!auth?.user) return;

    let newCategoryId: string | undefined = undefined;

    if (categoryModal.categoryId) {
      await editCategory(categoryModal.categoryId, nameInput, auth.user.uid);
      showToast("Category updated");
    } else {
      newCategoryId = await addCategory(nameInput, auth.user.uid);
      showToast("Category added");
    }
    handleCategoryClose(newCategoryId);
    setNameInput("");
  };

  return (
    <Dialog
      open={categoryModal.isOpen}
      onClose={() => {
        setNameInput("");
        handleCategoryClose();
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
      <DialogTitle sx={{ color: "white" }}>
        {categoryModal.categoryId ? "Edit Category" : "Add Category"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} id="Category-form">
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Category Name"
            type="text"
            fullWidth
            variant="filled"
            onChange={(e) => setNameInput(e.target.value)}
            value={nameInput}
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
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleCategoryClose()}
          sx={{ color: "rgba(255,255,255,0.7)" }}
        >
          Cancel
        </Button>
        <Button type="submit" form="Category-form" sx={{ color: "white" }}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
