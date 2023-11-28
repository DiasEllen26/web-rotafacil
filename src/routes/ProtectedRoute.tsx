// import { ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface IProtectedRoute {
	isAuthenticated: boolean;
	redirectPath: string;
	// children: ReactNode
}

export default function RequireAuth() {
	const { isAuthenticated } = useAuth();
	const location = useLocation();

	return (
			isAuthenticated ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />
	)
}
