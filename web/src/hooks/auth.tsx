import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface AuthState {
  token: string;
  user: object;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  singOut(): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Proffy:token');
    const user = localStorage.getItem('@Proffy:user');

    if (token && user) {
      return {
        token,
        user: JSON.parse(user),
      }
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password, rememberMe }) => {
    const response = await api.post('sessions',{
      email,
      password,
      rememberMe,
    });

    const { token, user } = response.data;

    localStorage.setItem('@Proffy:token', token);
    localStorage.setItem('@Proffy:user', JSON.stringify(user));


    setData({ token, user });
  },[]);

  const singOut = useCallback(() => {
    localStorage.removeItem('@Proffy:token');
    localStorage.removeItem('@Proffy:user');

    setData({} as AuthState);
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, singOut }} >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within as AuthProvider');
  }

  return context;
}