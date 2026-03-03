import { createContext, useContext } from "react";
import { User } from "firebase/auth";

export const AuthContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
} | null>(null);

export const useAuth = () => useContext(AuthContext);
