'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  gender: string;
};

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  login: (userData: Omit<User, 'id'>) => void;
  logout: () => void;
  register: (userData: Omit<User, 'id'>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Генерируем ID (для прототипа)
let nextId = 1;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Восстановление сессии при загрузке
  useEffect(() => {
    const savedUser = localStorage.getItem('demplatform_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
      } catch (e) {
        localStorage.removeItem('demplatform_user');
      }
    }
  }, []);

  const login = (userData: Omit<User, 'id'>) => {
    const restoredUser = user && user.email === userData.email ? user : null;

    if (restoredUser || (user && user.email === userData.email && user.firstName === userData.firstName)) {
      setUser({ ...restoredUser, ...userData, id: restoredUser?.id || nextId++ });
      localStorage.setItem('demplatform_user', JSON.stringify({ ...restoredUser, ...userData, id: restoredUser?.id || nextId++ }));
    } else {
      // Для прототипа: "логиним", если email совпадает (без пароля)
      const fakeCheck = localStorage.getItem('demplatform_user');
      if (fakeCheck) {
        const saved = JSON.parse(fakeCheck);
        if (saved.email === userData.email) {
          setUser(saved);
        }
      }
    }
  };

  const register = (userData: Omit<User, 'id'>) => {
    const newUser: User = { ...userData, id: nextId++ };
    setUser(newUser);
    localStorage.setItem('demplatform_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('demplatform_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
