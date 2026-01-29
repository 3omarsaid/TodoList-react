import { useContext } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import { UiContext } from "../../../contexts/UiContext";

export function Navigation() {
  let { filter, setFilter } = useContext(UiContext);

  return (
    <BottomNavigation
      sx={{ width: 500 }}
      value={filter}
      onChange={(event, newValue) => {
        setFilter(newValue);
      }}
    >
      <BottomNavigationAction
        label="Unfinished"
        value="unfinished"
        icon={<RemoveDoneIcon />}
      />
      <BottomNavigationAction
        label="Finished"
        value="finished"
        icon={<DoneAllIcon />}
      />
      <BottomNavigationAction label="All" value="all" icon={<AllInboxIcon />} />
    </BottomNavigation>
  );
}
