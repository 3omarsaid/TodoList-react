import { useMemo } from "react";
import ToDo from "../todo/ToDo";
import { useData } from "../../contexts/DataContext";
import { useUi } from "../../contexts/UiContext";
import FormEdit from "./FormEdit";
export default function List() {
  let { filter } = useUi();
  let { todos } = useData();
  let filteredList = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === "finished") return todo.completed;
      if (filter === "unfinished") return !todo.completed;
      if (filter === "all") return true;
    });
  }, [todos, filter]);
  return (
    <>
      <div
        className="no-scrollbar"
        style={{ width: "100%", height: "400px", overflowY: "auto" }}
      >
        {filteredList.map((task) => (
          <ToDo key={task.id} task={task} />
        ))}
      </div>
      <FormEdit />
    </>
  );
}
