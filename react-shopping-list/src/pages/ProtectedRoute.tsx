import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../store";
import { selectLoggedIn } from "../features/auth/auth-slice";

export function ProtectedRoute() {
    const loggedIn = useAppSelector(selectLoggedIn);

    if (!loggedIn) {
        return <Navigate to="/login"/>;
    }

    return <Outlet />
}