export default function todosReducer(todos, { type, payload }) {
  if (type == "add") {
    let newTodo = { id: Date.now(), title: payload.title, completed: false };
    todos.push(newTodo);
  } else if (type == "edit") {
    let todo = todos.find((t) => t.id == payload.id);
    todo.title = payload.title;
  } else if (type == "toggleComplete") {
    let todo = todos.find((t) => t.id == payload.id);
    todo.completed = !todo.completed;
  } else if (type == "delete") {
    let todoIDX = todos.findIndex((t) => t.id == payload.id);
    todos.splice(todoIDX, 1);
  }
}
