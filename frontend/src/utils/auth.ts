import {
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    onAuthStateChanged,
  } from "firebase/auth";
  import type { User } from "firebase/auth"; // ✅ Type-only import
  
  import { auth } from "../firebase";
  import api from "../api";
  
  // Login + Session
  export async function login(email: string, password: string) {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCred.user.getIdToken();
    await api.post("/auth/sessionLogin", { idToken: token });
  }
  
  // Logout
  export async function logout() {
    await api.post("/auth/Logout");
    await signOut(auth);
  }
  
  // Forgot Password
  export function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }
  
  // Auth Observer
  export function observeAuthState(cb: (user: User | null) => void) {
    return onAuthStateChanged(auth, cb);
  }
  