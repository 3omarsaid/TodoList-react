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
    <div className="flex items-center bg-black/20 border border-white/15 p-4 rounded-2xl mb-3 hover:bg-white/5 transition">
      <Stack
        direction="column"
        justifyContent="space-between"
        style={{ overflow: "hidden" }}
        sx={{
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        <CardContent sx={{ minWidth: 0, flex: 1, m: 0, p: 0 }} className="flex items-center">
          <CheckTodo id={task.id} completed={task.completed} />
          <Typography
            variant="h5"
            sx={{
              flex: 1,
              whiteSpace: "normal",
              wordBreak: "break-word",
              overflowWrap: "anywhere",
              marginLeft:3
            }}
          >
            {task.title}
          </Typography>
        </CardContent>

        <CardActions sx={{ flexShrink: 0, m: 0, p: 0 }}>
          <EditTodo id={task.id} />
          <DeleteTodo id={task.id} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="body1" sx={{}}>
              {new Date(task.id).toLocaleTimeString()}
            </Typography>
          </div>
        </CardActions>
      </Stack>
    </div>
  );
}
