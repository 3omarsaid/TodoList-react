import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useUi } from "../../contexts/UiContext";
import { Slide } from "@mui/material";

export default function Toast() {
  let { toastIsOpen, toastActions } = useUi();

  return (
    <div>
      <Snackbar
        open={toastIsOpen}
        autoHideDuration={6000}
        onClose={toastActions.closeToast}
        slots={{
          transition: Slide,
        }}
        slotProps={{
          transition: { direction: "up" },
        }}
      >
        <Alert
          onClose={toastActions.closeToast}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Todo Added
        </Alert>
      </Snackbar>
    </div>
  );
}
