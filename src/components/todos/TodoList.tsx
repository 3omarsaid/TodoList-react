import { Card, Container } from "@mui/material";
import Header from "./header/Header";
import List from "./List";
import DataProvider from "../../providers/DataProvider";
import UiProvider from "../../providers/UiProvider";
import AddBar from "./footer/AddBar";
import Toast from "./Toast";
export default function ToDoList() {
  return (
    <>
      <DataProvider>
        <UiProvider>
          <Container maxWidth="sm">
            <Card
              sx={{
                bgcolor: "AccentColor",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: "10px",
              }}
            >
              <Header />
              <List />
              <AddBar />
              <Toast />
            </Card>
          </Container>
        </UiProvider>
      </DataProvider>
    </>
  );
}
