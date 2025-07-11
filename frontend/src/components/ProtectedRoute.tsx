import { useEffect, useState } from "react";
import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import api from "../api";

interface ProtectedRouteProps {
  children: ReactElement;
  adminOnly?: boolean;
}

export default function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const [allowed, setAllowed] = useState<null | boolean>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        // Call backend to verify session and get user info
        const res = await api.get("/auth/me", { withCredentials: true });

        if (!adminOnly || res.data.role === "admin") {
          setAllowed(true);
        } else {
          setAllowed(false);
        }
      } catch (error) {
        console.error("Error in ProtectedRoute checkUser:", error);
        setAllowed(false);
      }
    };

    checkSession();
  }, [adminOnly]);

  if (allowed === null) return <p>Loading...</p>;
  if (!allowed) return <Navigate to="/login" replace />;
  return children;
}
