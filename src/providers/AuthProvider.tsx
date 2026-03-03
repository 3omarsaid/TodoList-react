import React, { useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import { AuthContext } from "../contexts/AuthContext";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext value={{ user, setUser, loading }}>{children}</AuthContext>
  );
}

export default AuthProvider;
