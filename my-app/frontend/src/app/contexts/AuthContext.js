/**
 * @fileoverview Contexto de autenticação da aplicação.
 * Gerencia o estado global de autenticação e dados do usuário.
 */

'use client';

import React, { createContext, useState, useEffect } from 'react';

/**
 * @typedef {Object} AuthContextType
 * @property {Object|null} user - Dados do usuário logado
 * @property {boolean} isAuthenticated - Estado de autenticação
 * @property {Function} login - Função para realizar login
 * @property {Function} logout - Função para realizar logout
 */

/**
 * Contexto de autenticação.
 * @type {React.Context<AuthContextType>}
 */
export const AuthContext = createContext({});

/**
 * Provedor do contexto de autenticação.
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Componentes filhos
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Ao iniciar, verifica se há uma sessão ativa
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedAuth = localStorage.getItem('isAuthenticated');
    
    if (storedUser && storedAuth) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }

    // Adicionar listener para mudanças no localStorage
    const handleStorageChange = (e) => {
      if (e.key === 'user') {
        const newUser = e.newValue ? JSON.parse(e.newValue) : null;
        setUser(newUser);
        setIsAuthenticated(!!newUser);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isAuthenticated', 'true');
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
