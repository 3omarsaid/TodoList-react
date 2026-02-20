import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useUi } from "../../contexts/UiContext";
import { Slide } from "@mui/material";
import { useUiStore } from "../../stores/uiStore";

export default function Toast() {
  let { toast, closeToast } = useUiStore();

  return (
    <div>
      <Snackbar
        open={toast.isOpen}
        autoHideDuration={6000}
        onClose={closeToast}
        slots={{
          transition: Slide,
        }}
        slotProps={{
          transition: { direction: "up" },
        }}
      >
        <Alert
          onClose={closeToast}
          severity={toast.message.includes("added") ? "success" : "info"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
