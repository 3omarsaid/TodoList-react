import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Stack,
} from "@mui/material";
import CheckTodo from "./CheckTodo";
import EditTodo from "./EditTodo";
import DeleteTodo from "./DeleteTodo";

export default function ToDo({ task }) {
  return (
    <Card
      sx={{
        minWidth: "100%",
        direction: "rtl",
        bgcolor: "darkblue",
        color: "white",
        my: "10px",
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <CardContent>
          <Typography variant="h5">{task.title}</Typography>
          {task.description && (
            <Typography variant="body1">{task.description}</Typography>
          )}
        </CardContent>
        <CardActions>
          <CheckTodo id={task.id} completed={task.completed} />
          <EditTodo id={task.id} />
          <DeleteTodo id={task.id} />
        </CardActions>
      </Stack>
    </Card>
  );
}
