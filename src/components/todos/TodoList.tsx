import { Card, Container } from "@mui/material";
import Header from "./header/Header";
import List from "./List";
export default function ToDoList() {
  return (
    <>
      <Container >
        <div id="d" className="w-full h-[calc(100vh-10vh)] overflow-hidden mx-auto max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-5 shadow-2xl">
          <Header />
          <List />
        </div>
      </Container>
    </>
  );
}
