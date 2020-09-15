import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';

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
  isLoading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): Promise<void>;
  updateUser(user: User): Promise<void>;
  setLoading(isLoading: boolean): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@Proffy:token',
        '@Proffy: user',
      ]);

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;

        setData({token: token[1], user: JSON.parse(user[1]) });
      }

      setIsLoading(false);
    }
    loadStorageData();
  }, [])

  const signIn = useCallback(async ({ email, password, rememberMe }) => {
    const response = await api.post('sessions',{
      email,
      password,
      rememberMe,
    });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@Proffy:token', token],
      ['@Proffy:user', JSON.stringify(user)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });

    setIsLoading(false);
  },[]);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@Proffy:token', '@Proffy:user']);

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(async (user: User) => {
    await AsyncStorage.setItem('@Proffy:user', JSON.stringify(user));

    setData({
      token: data.token,
      user,
    });
  }, [data.token])

  const setLoading = useCallback((isLoading: boolean) => {
    setIsLoading(isLoading);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, updateUser, isLoading, setLoading }} >
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