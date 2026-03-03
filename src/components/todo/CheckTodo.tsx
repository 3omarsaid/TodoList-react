import { Checkbox } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useTodosStore } from "../../stores/todosStore";
import { useAuth } from "../../contexts/AuthContext";
interface checkTodoProps {
  id: string;
  completed: boolean;
}
export default function CheckTodo({ id, completed }:checkTodoProps) {
  let { toggleComblete } = useTodosStore();
  let auth = useAuth();
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
        if (!auth?.user) return;
        toggleComblete(id,auth.user.uid)
      }}
    />
  );
}
