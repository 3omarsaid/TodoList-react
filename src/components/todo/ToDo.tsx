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
import { Todo } from "../../types";
export default function ToDo({ task }: { task: Todo }) {
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
