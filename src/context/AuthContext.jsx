import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') return null;
    try {
      const saved = localStorage.getItem('rakka-user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('rakka-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('rakka-user');
    }
  }, [user]);

  const login = (email, password) => {
    const newUser = { id: 'u1', name: email.split('@')[0], email, avatar: null };
    setUser(newUser);
    return newUser;
  };

  const register = (name, email, password) => {
    const newUser = { id: 'u1', name, email, avatar: null };
    setUser(newUser);
    return newUser;
  };

  const logout = () => setUser(null);

  const updateProfile = (updates) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : prev));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
