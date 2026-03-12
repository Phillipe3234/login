import React, { createContext, useState, useContext } from 'react';
import { logAction } from '../auditLogger';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email) => {
    setUser({ email, role: 'admin' });
    await logAction(email, "LOGIN_REALIZADO");
  };

  const logout = async () => {
    if (user) await logAction(user.email, "LOGOUT_REALIZADO");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);