import { Checkbox } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useTodosStore } from "../../stores/todosStore";
interface checkTodoProps {
  id: number;
  completed: boolean;
}
export default function CheckTodo({ id, completed }:checkTodoProps) {
  let { toggleComblete } = useTodosStore();
  return (
    <Checkbox
      icon={<CheckCircleOutlineIcon />}
      checkedIcon={<CheckCircleIcon />}
      sx={{
        "&.Mui-checked": { color: "purple" },
        color: "white",
      }}
      checked={completed}
      onChange={() => {
        toggleComblete(id)
      }}
    />
  );
}
