// import { ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RequireAuth() {
	const { isAuthenticated } = useAuth();
	const location = useLocation();

	return (
			isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
	)
}
