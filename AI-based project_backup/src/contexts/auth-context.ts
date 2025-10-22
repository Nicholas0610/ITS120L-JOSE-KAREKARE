import { createContext } from 'react';

export type User = {
  email: string;
  userType: 'customer' | 'admin' | 'delivery';
  name?: string;
};

export type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
