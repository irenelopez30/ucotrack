"use client";
import React, { useState, createContext, useContext, ReactNode, useEffect } from 'react';

interface AuthState {
  token: string;
}

interface AuthContextType {
  authState: AuthState;
  setUserAuthInfo: (data: { token: string }) => void;
  isUserAuthenticated: () => boolean;
}

const defaultAuthState: AuthState = { token: '' };

const AuthContext = createContext<AuthContextType>({
  authState: defaultAuthState,
  setUserAuthInfo: () => {},
  isUserAuthenticated: () => false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(defaultAuthState);

  useEffect(() => {
    // Cargar el token desde localStorage cuando la aplicación se monta
    const token = localStorage.getItem('token');
    if (token) {
      setAuthState({ token });
    }
  }, []);

  const setUserAuthInfo = (data: { token: string }) => {
    const token = data.token;
    localStorage.setItem('token', token);
    setAuthState({ token });
  };

  const isUserAuthenticated = () => !!authState.token;

  return (
    <AuthContext.Provider value={{ authState, setUserAuthInfo, isUserAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
