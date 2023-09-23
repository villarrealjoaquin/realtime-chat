import { createContext, useState } from "react";
import { loginUserRequest, registerUserRequest } from "../service/auth.service";

interface AuthContextProps {
  children: React.ReactNode;
}

export interface Values {
  id: string;
  email: string;
  password: string;
  username?: string;
}

interface Auth {
  user: Values | null;
  isAuthenticated: boolean;
  loginUser: (user: Values) => void;
  registerUser: (user: Values) => void;
}

export const AuthContext = createContext<Auth | null>(null);

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<Values | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginUser = async (user: Values) => {
    try {
      const res = await loginUserRequest(user);
      setUser(res.data);
      console.log(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  };

  const registerUser = async (user: Values) => {
    try {
      const res = await registerUserRequest(user);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      loginUser,
      registerUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}