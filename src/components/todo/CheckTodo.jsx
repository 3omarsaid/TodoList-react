import { Checkbox } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";

export default function CheckTodo({ id, completed }) {
  let { dispatch } = useContext(DataContext);
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
