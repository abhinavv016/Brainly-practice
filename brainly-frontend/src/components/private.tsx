import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface privateRouteProps{
    children : ReactNode;
}
export function PrivateRoute({children}: privateRouteProps){
    const token = localStorage.getItem("token");
    if(!token){
        return <Navigate to="/signin" replace/>
    }
    return <>{children}</>;
};