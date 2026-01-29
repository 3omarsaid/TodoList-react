import { Dispatch } from "react";
import { Todo } from "../types";

type Type = "add" | "edit" | "toggleComplete" | "delete";
type payloadReducerProps = { id: number; title?: string };
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
    if (payload.title) {
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
  }
}
