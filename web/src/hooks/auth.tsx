import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface AuthState {
  token: string;
  user: User;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  avatar_url: string;
  whatsapp: string;
  bio: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Proffy:token');
    const user = localStorage.getItem('@Proffy:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
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

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  },[]);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Proffy:token');
    localStorage.removeItem('@Proffy:user');

    setData({} as AuthState);
  }, [])

  const updateUser = useCallback((user: User) => {
    localStorage.setItem('@Proffy:user', JSON.stringify(user));

    setData({
      token: data.token,
      user,
    });
  }, [data.token])

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, updateUser }} >
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