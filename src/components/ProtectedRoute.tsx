// src/routes/ProtectedRoute.tsx
import { useStudiesStore } from "@/context/UserContext";
import { Navigate, Outlet } from "react-router";

export const ProtectedRoute = () => {
  const { author } = useStudiesStore();

  if (!author) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
