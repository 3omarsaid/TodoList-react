import { useContext } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import { useUi } from "../../../contexts/UiContext";
import { useTodosStore } from "../../../stores/todosStore";

export function Navigation() {
  let { filter, setFilter } = useTodosStore();

  return (
    <BottomNavigation
      className="w-full  flex items-center !bg-white/15 !border !border-white/20 !p-8 rounded-2xl mb-3 !hover:bg-white/5 transition"
      value={filter}
      onChange={(event, newValue) => {
        setFilter(newValue);
      }}
    >
      <BottomNavigationAction
        label="Unfinished"
        value="unfinished"
        icon={<RemoveDoneIcon className="text-white" />}
      />
      <BottomNavigationAction
        className="text-white"
        label="Finished"
        value="finished"
        icon={<DoneAllIcon className="text-white" />}
      />
      <BottomNavigationAction
        label="All"
        value="all"
        icon={<AllInboxIcon className="text-white" />}
      />
    </BottomNavigation>
  );
}
