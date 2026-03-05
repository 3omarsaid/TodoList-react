import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router";
import { handleSignOut } from "../../../utils/Auth";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";

export default function LongMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ color: "white" }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              width: "20ch",
              bgcolor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              "& .MuiMenuItem-root:hover": {
                bgcolor: "rgba(255, 255, 255, 0.2)",
              },
              "& .Mui-selected": {
                bgcolor: "rgba(255, 255, 255, 0.3) !important",
              },
            },
          },
          list: {
            "aria-labelledby": "long-button",
          },
        }}
      >
        <MenuItem
          className="flex items-center gap-2"
          value="Dashboard"
          sx={{ fontWeight: "bold", color: "yellow" }}
          onClick={(e) => {
            e.preventDefault();
            navigate("/dashboard");
          }}
        >
          <DashboardIcon />
          Dashboard
        </MenuItem>
        <MenuItem
          value="logout"
          className="flex items-center gap-2"
          sx={{ fontWeight: "bold", color: "red" }}
          onClick={(e) => {
            e.preventDefault();
            handleSignOut(navigate);
          }}
        >
          <LogoutIcon />
          logout
        </MenuItem>
      </Menu>
    </div>
  );
}
