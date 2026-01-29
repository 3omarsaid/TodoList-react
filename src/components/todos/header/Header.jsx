import { Navigation } from "./Navigation";
import { Typography } from "@mui/material";
export default function Header() {
  return (
    <>
      <Typography variant="h3" style={{ zIndex: 2 }}>
        My ToDo's
      </Typography>
      <hr
        style={{
          width: "100%",
          marginTop: "-20px",
          marginBottom: "20px",
          zIndex: 1,
        }}
      />
      <Navigation />
    </>
  );
}
