import { useMemo } from "react";
import ToDo from "../todo/ToDo";
import { useUi } from "../../contexts/UiContext";
import FormEdit from "./FormEdit";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { useTodosStore } from "../../stores/todosStore";
export default function List() {
  let { reorder, getFilteredTodos } = useTodosStore();
  let filteredList = getFilteredTodos();
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    reorder(
      Number(filteredList[result.source.index].id),
      Number(filteredList[result.destination.index].id),
    );
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todos-list">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="no-scrollbar"
            style={{
              width: "100%",
              height: "400px",
              overflowY: "auto",
            }}
          >
            {filteredList.map((todo, index) => (
              <Draggable
                key={todo.id.toString()}
                draggableId={todo.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      marginBottom: "8px",
                    }}
                  >
                    <ToDo key={todo.id} task={todo} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <FormEdit />
    </DragDropContext>
  );
}
