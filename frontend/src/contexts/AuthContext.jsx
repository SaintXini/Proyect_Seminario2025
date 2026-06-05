import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import * as API from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar si hay usuario guardado al cargar
  useEffect(() => {
    const savedUser = API.getCurrentUser();
    if (savedUser) {
      setUser(savedUser);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const register = useCallback(async (userData) => {
    try {
      const response = await API.register(userData);
      return response;
    } catch (error) {
      throw error;
    }
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const response = await API.login({ email, password });
      setUser(response.user);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    API.logout();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const isAdmin = user?.role === 'admin';
  const isClient = user?.role === 'client';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        isAdmin,
        isClient,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};
