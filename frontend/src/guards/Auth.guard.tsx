import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hook/useAuth"

export const AuthGuard = () => {
  const { isLoading, isAuthenticated } = useAuth();

  if(isLoading) return <h1>Loading...</h1>
  const hasToken = isAuthenticated && !isLoading ? <Outlet /> : <Navigate replace to='/api/login' />

  return hasToken;
}