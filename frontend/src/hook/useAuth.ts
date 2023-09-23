import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('AuthContext must be used within a AuthProvider');

  return context;
};