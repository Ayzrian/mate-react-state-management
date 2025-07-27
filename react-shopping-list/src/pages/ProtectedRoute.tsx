import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router";

export function ProtectedRoute() {
    const { loggedIn } = useContext(AuthContext);

    if (!loggedIn) {
        return <Navigate to="/login"/>;
    }

    return <Outlet />
}