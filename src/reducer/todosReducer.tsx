import { Dispatch } from "react";
import { Todo } from "../types";

type Type = "add" | "edit" | "toggleComplete" | "delete" | "reorder";
type payloadReducerProps = {
  id?: number;
  title?: string;
  sourceID?: number;
  destID?: number;
};
interface TodoActions {
  type: Type;
  payload: payloadReducerProps;
}
export interface TodosComponentProps {
  todos: Todo[];
  dispatch: Dispatch<TodoActions>;
}
export default function todosReducer(
  todos: Todo[],
  { type, payload }: TodoActions,
): void {
  if (type === "add") {
    if (payload.title && payload.id) {
      let newTodo: Todo = {
        id: payload.id,
        title: payload.title,
        completed: false,
      };
      todos.push(newTodo);
    }
  } else if (type === "edit") {
    let todo = todos.find((t) => t.id == payload.id);
    if (todo && payload.title) {
      todo.title = payload.title;
    }
  } else if (type == "toggleComplete") {
    let todo = todos.find((t) => t.id == payload.id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  } else if (type === "delete") {
    let todoIDX = todos.findIndex((t) => t.id == payload.id);
    if (todoIDX !== -1) {
      todos.splice(todoIDX, 1);
    }
  } else if (type === "reorder") {
    let { sourceID, destID } = payload;
    let sourceIDX = todos.findIndex((t) => t.id === sourceID);
    let destIDX = todos.findIndex((t) => t.id === destID);
    if (sourceIDX === -1 && destIDX === -1) return;
    let [removed] = todos.splice(sourceIDX, 1);
    todos.splice(destIDX, 0, removed);
  }
}
