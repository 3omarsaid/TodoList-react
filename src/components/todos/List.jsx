import { useContext, useMemo } from "react";
import ToDo from "../todo/ToDo";
import { DataContext } from "../../contexts/DataContext";
import { UiContext } from "../../contexts/UiContext";
import FormEdit from "./FormEdit";
export default function List() {
  let { filter } = useContext(UiContext);
  let { todos } = useContext(DataContext);
    console.log(todos);
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
