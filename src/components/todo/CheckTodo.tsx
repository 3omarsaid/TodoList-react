import { Checkbox } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {  useData } from "../../contexts/DataContext";

export default function CheckTodo({ id, completed }:{id:number;completed:boolean}) {
  let { dispatch } = useData();
  return (
    <Checkbox
      icon={<CheckCircleOutlineIcon />}
      checkedIcon={<CheckCircleIcon />}
      sx={{
        "&.Mui-checked": { color: "green" },
        color: "white",
      }}
      checked={completed}
      onChange={() => {
        dispatch({ type: "toggleComplete", payload: { id } });
      }}
    />
  );
}
