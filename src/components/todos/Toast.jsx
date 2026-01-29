import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { UiContext } from "../../contexts/UiContext";
import { useContext } from "react";
import { Slide } from "@mui/material";

export default function Toast() {
  let { toastIsOpen, toastActions } = useContext(UiContext);

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
