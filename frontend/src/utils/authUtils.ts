// src/utils/authUtils.ts
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../firebase"; // Your firebase initialization

export function observeAuthState(setUser: (user: User | null) => void) {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setUser(user);
  });
  return unsubscribe; // Caller should clean up with this
}
