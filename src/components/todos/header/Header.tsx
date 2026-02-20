import { Navigation } from "./Navigation";
import { Typography } from "@mui/material";
export default function Header() {
  return (
    <>
      <Typography variant="h3" style={{ zIndex: 2, marginBottom: 5 }}>
        Daily todos
      </Typography>

      <Navigation />
    </>
  );
}
