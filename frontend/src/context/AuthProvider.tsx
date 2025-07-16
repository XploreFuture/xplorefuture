import { useEffect, useState } from "react";
import type {  ReactNode } from "react";

import { AuthContext } from "./AuthContext";
import type { User } from "firebase/auth";
import { observeAuthState } from "../utils/authUtils";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false); // Track auth init done

  useEffect(() => {
    const unsubscribe = observeAuthState((user) => {
      setUser(user);
      setAuthReady(true);  // Mark that auth is initialized
    });
    return () => unsubscribe();
  }, []);

  if (!authReady) {
    // You can show a loader here while Firebase auth initializes
    return <p>Kya Bat Hai</p>;
  }

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};
