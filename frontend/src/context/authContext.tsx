import Cookies from 'js-cookie';
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginUserRequest,
  registerUserRequest,
  verifyTokenRequest
} from "../service/auth.service";

interface AuthContextProps {
  children: React.ReactNode;
}

interface Contact {
  id: string;
  username: string;
  email: string;
  alias:string;
  _id:string;
}

export interface User {
  id: string;
  email: string;
  alias:string;
  username?: string;
  contacts?: Contact[];
  conversations?: [];
}

interface Auth {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (user: User) => void;
  signUp: (user: User) => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<Auth | null>(null);

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const navigate = useNavigate();

  const signIn = async (user: User) => {
    try {
      const res = await loginUserRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
      navigate('/home');
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const signUp = async (user: User) => {
    try {
      const res = await registerUserRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
      navigate('/home');
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const verifyToken = async () => {
    const cookie = Cookies.get('chatToken');

    if (cookie) {
      try {
        const response = await verifyTokenRequest();
        if (response) {
          setIsAuthenticated(true);
          setUser(response.data);
          setIsLoading(false);
          return;
        }
      } catch (error) {
        setIsAuthenticated(false)
        setUser(null)
        setIsLoading(false)
      }
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      signIn,
      signUp,
      setUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}