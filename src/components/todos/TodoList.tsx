import { Card, Container } from "@mui/material";
import Header from "./header/Header";
import List from "./List";
import AddBar from "./footer/AddBar";
import Toast from "./Toast";
export default function ToDoList() {
  return (
    <>
      <Container >
        <div id="d" className="w-full mx-auto max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-10 shadow-2xl">
          <Header />
          <List />
          <AddBar />
          <Toast />
        </div>
      </Container>
    </>
  );
}
