import React, { useEffect } from "react";
import ToDoList from "./TodoList";
import AddBar from "./footer/AddBar";
import Toast from "./Toast";
import CategoryModal from "./CategoryModal";
import { useTodosStore } from "../../stores/todosStore";
import { useCategoriesStore } from "../../stores/categoriesStore";
import { useAuth } from "../../contexts/AuthContext";

const todosPage = () => {
  const fetchTodos = useTodosStore((state) => state.fetchTodos);
  const fetchCategories = useCategoriesStore((state) => state.fetchCategories);
  const auth = useAuth();
  useEffect(() => {
    if (!auth?.user) return;
    fetchTodos(auth.user.uid);
    fetchCategories(auth.user.uid);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#5B117D] via-[#190C4E] to-[#3C2989] flex items-center justify-center">
      <ToDoList />
      <AddBar />
      <Toast />
      <CategoryModal />
    </div>
  );
};

export default todosPage;
