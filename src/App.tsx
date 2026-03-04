import "./App.css";
import { Routes, Route } from "react-router";
import Login from "./components/auth/AuthPage";
import TodoPage from "./components/todos/todosPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import AuthPage from "./components/auth/AuthPage";
import Dashboard from "./components/todos/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <TodoPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
