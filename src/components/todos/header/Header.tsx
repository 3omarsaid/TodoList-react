import { Navigation } from "./Navigation";
import { Typography, Select, MenuItem, IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCategoriesStore } from "../../../stores/categoriesStore";
import { useUiStore } from "../../../stores/uiStore";
import { useAuth } from "../../../contexts/AuthContext";
import TaskBar from "./TaskBar";

export default function Header() {
  const {
    categories,
    activeCategoryFilter,
    setCategoryFilter,
    removeCategory,
  } = useCategoriesStore();
  const { handleCategoryClickOpen, showToast } = useUiStore();
  const auth = useAuth();

  const isCustomCategorySelected =
    activeCategoryFilter !== "all" && activeCategoryFilter !== "";

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <TaskBar />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Select
            value={activeCategoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            size="small"
            sx={{
              color: "white",
              backgroundColor: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: "8px",
              ".MuiSelect-icon": { color: "white" },
              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          >
            <MenuItem value="all">All Categories</MenuItem>
            {categories.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>

          {isCustomCategorySelected && (
            <>
              <IconButton
                size="small"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&:hover": {
                    color: "white",
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
                onClick={() => handleCategoryClickOpen(activeCategoryFilter)}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: "#ef4444",
                  "&:hover": {
                    color: "#f87171",
                    backgroundColor: "rgba(239,68,68,0.1)",
                  },
                }}
                onClick={async () => {
                  if (
                    auth?.user &&
                    confirm("Are you sure you want to delete this category?")
                  ) {
                    await removeCategory(activeCategoryFilter, auth.user.uid);
                    setCategoryFilter("all");
                    showToast("Category deleted");
                  }
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </>
          )}
        </Box>
      </Box>

      <Navigation />
    </>
  );
}
