'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BottomNav } from '@/components/BottomNav';
import { LogOut, Zap } from 'lucide-react';
import type { UserRole } from '@/lib/types';

interface DashboardShellProps {
  role: UserRole;
  title: string;
  children: React.ReactNode;
  showBackButton?: boolean;
}

interface StoredSession {
  userId: string;
  role: UserRole;
  displayName: string;
  isDemo: boolean;
  eventId: string;
}

export function DashboardShell({ role, title, children, showBackButton }: DashboardShellProps) {
  const router = useRouter();
  const [session, setSession] = useState<StoredSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem('g-events-demo-session');
    if (!stored) {
      router.replace('/');
      return;
    }
    try {
      const parsed = JSON.parse(stored) as StoredSession;
      if (parsed.role !== role) {
        router.replace(`/${parsed.role}`);
        return;
      }
      setSession(parsed);
    } catch {
      router.replace('/');
      return;
    }
    setLoading(false);
  }, [role, router]);

  const handleLogout = () => {
    sessionStorage.removeItem('g-events-demo-session');
    router.replace('/');
  };

  if (loading || !session) {
    return (
      <div className="app-shell" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100dvh',
      }}>
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="app-shell">
      {/* Top Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        borderBottom: '1px solid var(--border)',
        background: var(--card),
        position: 'sticky',
        top: 0,
        zIndex: 40,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {showBackButton && (
            <button
              onClick={() => router.back()}
              className="g-btn g-btn-ghost g-btn-sm"
              style={{ padding: '4px 8px' }}
            >
              ←
            </button>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Zap size={18} color="var(--primary)" />
            <span style={{ fontSize: 15, fontWeight: 700, color: var(--foreground) }}>{title}</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="demo-badge">Demo</span>
          <button
            onClick={handleLogout}
            className="g-btn g-btn-ghost g-btn-sm"
            style={{ padding: '6px' }}
            aria-label="Sign out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="page-content" style={{ paddingTop: 16, paddingBottom: 16 }}>
        {children}
      </div>

      {/* Bottom Nav */}
      <BottomNav role={role} />
    </div>
  );
}