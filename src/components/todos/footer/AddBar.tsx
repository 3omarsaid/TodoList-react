import { TextField, Button, Card, Container } from "@mui/material";
import { useState } from "react";
import { useTodosStore } from "../../../stores/todosStore";
import { useUiStore } from "../../../stores/uiStore";

export default function AddBar() {
  let { showToast } = useUiStore();
  let { handleClickOpen } = useUiStore();

  return (
    <Container maxWidth="sm" fixed className="relative">
      {/* <Card
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
              addTodo(titleInput);
              setTitleInput("");
              showToast();
            }
          }}
        />
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={(e) => {
            e.preventDefault();

            if (titleInput) {
              addTodo(titleInput);
              showToast();
              setTitleInput("");
            } else {
              alert("cann't add todo with empty title");
            }
          }}
        >
          +
        </Button>
      </Card> */}
      <button
        className="absolute right-5 bottom-5 w-14 h-14 flex justify-center items-center rounded-full 
  bg-gradient-to-tr from-purple-600 to-blue-500 text-white text-2xl font-light shadow-lg 
  transition-all duration-300 ease-in-out
  
  hover:scale-110 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:brightness-110
  
  active:scale-95
  
  focus:outline-none focus:ring-1 focus:ring-purple-500/50"
        onClick={(e) => {
          e.preventDefault();
          handleClickOpen();
        }}
      >
        <span className="mb-1">+</span>
      </button>
    </Container>
  );
}
