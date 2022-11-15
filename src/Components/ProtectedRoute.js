import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";
import { Loading } from "./Loading";

export function ProtectedRoute({children}) {
    const {loading, isLogged} = useAuth();
    if(loading) return <Loading/>
    if(!isLogged){
        return <Navigate to={'/Login'}/>
    }else{
        return <>{children}</>
    }
}