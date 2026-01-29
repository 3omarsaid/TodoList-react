import { TextField, Button, Card, Container } from "@mui/material";
import { useContext, useState } from "react";
import { DataContext } from "../../../contexts/DataContext";
import { UiContext } from "../../../contexts/UiContext";

export default function AddBar() {
  let [titleInput, setTitleInput] = useState("");
  let { dispatch } = useContext(DataContext);
  let { toastActions } = useContext(UiContext);
  return (
    <Container maxWidth="sm" disableGutters fixed>
      <Card
        sx={{
          bgcolor: "AccentColor",
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          gap: 2,
          pt: "10px",
        }}
      >
        <TextField
          label="Todo Title"
          variant="filled"
          color="primary"
          fullWidth
          size="medium"
          sx={{ mt: "6px" }}
          onChange={(e) => setTitleInput(e.target.value)}
          value={titleInput}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              dispatch({ type: "add", payload: { title: titleInput } });
              setTitleInput("");
              toastActions.showToast();
            }
          }}
        />
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={(e) => {
            e.preventDefault();

            if (titleInput) {
              dispatch({ type: "add", payload: { title: titleInput } });
              toastActions.showToast();
              setTitleInput("");
            } else {
              alert("cann't add todo with empty title");
            }
          }}
        >
          Add Todo
        </Button>
      </Card>
    </Container>
  );
}
