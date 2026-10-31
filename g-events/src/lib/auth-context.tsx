'use client';
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { DemoSession, UserRole } from './types';
import { getDemoSession } from './demo-data';

interface AuthContextType {
  session: DemoSession | null;
  isDemo: boolean;
  loginAsDemo: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  isDemo: false,
  loginAsDemo: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<DemoSession | null>(() => {
    if (typeof window === 'undefined') return null;
    const stored = sessionStorage.getItem('g-events-demo-session');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
    return null;
  });

  const loginAsDemo = useCallback((role: UserRole) => {
    const demoSession = getDemoSession(role);
    setSession(demoSession);
    sessionStorage.setItem('g-events-demo-session', JSON.stringify(demoSession));
  }, []);

  const logout = useCallback(() => {
    setSession(null);
    sessionStorage.removeItem('g-events-demo-session');
  }, []);

  return (
    <AuthContext.Provider value={{ session, isDemo: !!session, loginAsDemo, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
