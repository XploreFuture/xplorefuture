// src/context/AuthContext.tsx
import { createContext } from "react";
import type { User } from "firebase/auth"; // ✅ Type-only import

// Create the context with a default value
export const AuthContext = createContext<{ user: User | null }>({ user: null });
