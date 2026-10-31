'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, Users, ChevronRight, Eye, EyeOff } from 'lucide-react';

type DemoRole = 'participant' | 'volunteer' | 'coordinator' | 'principal';

const DEMO_ROLES: { role: DemoRole; label: string; desc: string; color: string }[] = [
  { role: 'participant', label: 'Demo Participant', desc: 'Aarav Sharma — Student', color: '#10B981' },
  { role: 'volunteer', label: 'Demo Volunteer', desc: 'Priya Patel — Tech Support', color: '#D1FAE5' },
  { role: 'coordinator', label: 'Demo Activity Coordinator', desc: 'Rahul Verma — Event Ops', color: '#B7DFA7' },
  { role: 'principal', label: 'Demo Principal', desc: 'Dr. Sunita Iyer — Administrator', color: '#C4B5FD' },
];

export default function SignInPage() {
  const router = useRouter();
  const [showDemo, setShowDemo] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

  const handleDemoLogin = (role: DemoRole) => {
    setLoading(role);
    // Store demo session
    const sessions: Record<DemoRole, { userId: string; name: string }> = {
      participant: { userId: 'a1b2c3d4-0001-4000-8000-000000000001', name: 'Aarav Sharma' },
      volunteer: { userId: 'a1b2c3d4-0002-4000-8000-000000000002', name: 'Priya Patel' },
      coordinator: { userId: 'a1b2c3d4-0003-4000-8000-000000000003', name: 'Rahul Verma' },
      principal: { userId: 'a1b2c3d4-0004-4000-8000-000000000004', name: 'Dr. Sunita Iyer' },
    };

    const session = {
      userId: sessions[role].userId,
      role,
      displayName: sessions[role].name,
      isDemo: true,
      eventId: 'e1e2e3e4-0001-4000-8000-000000000001',
    };

    sessionStorage.setItem('g-events-demo-session', JSON.stringify(session));

    setTimeout(() => {
      router.push(`/${role}`);
    }, 300);
  };

  return (
    <div style={{
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 20px',
      background: 'var(--background)',
    }}>
      {/* Pixel accent bar */}
      <div className="pixel-border-top" style={{ width: '100%', maxWidth: 400, marginBottom: 0 }} />

      <div style={{
        width: '100%',
        maxMax: 400,
        background: 'var(--card)',
        borderRadius: '0 0 16px 16px',
        padding: '32px 24px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      }}>
        {/* Logo / Brand */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Zap size={22} color="white" strokeWidth={2.5} />
            </div>
            <span style={{
              fontSize: 24,
              fontWeight: 800,
              color: var(--foreground),
              letterSpacing: '-0.5px',
            }}>
              G-Events
            </span>
          </div>
          <p style={{
            fontSize: 14,
            color: var(--text-muted),
            margin: 0,
          }}>
            Your campus activities, all in one place.
          </p>
        </div>

        {/* Sign in form */}
        {!showDemo && (
          <>
            <div style={{ marginBottom: 14 }}>
              <label className="g-label" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="g-input w-full"
                placeholder="you@school.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label className="g-label" htmlFor="password">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="g-input w-full"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  style={{ paddingRight: 42 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              className="g-btn g-btn-primary g-btn-block g-btn-lg w-full"
              onClick={() => {
                // Real auth would go here
                alert('Real authentication requires Supabase configuration. Use demo credentials for now.');
              }}
              style={{ marginBottom: 16, width: '100%' }}
            >
              Sign in
            </button>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              margin: '16px 0',
            }}>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>or</span>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            </div>

            <button
              className="g-btn g-btn-outline g-btn-block w-full"
              onClick={() => setShowDemo(true)}
              style={{ marginBottom: 0, width: '100%' }}
            >
              <Users size={18} className="mr-2" />
              Continue with demo credentials
            </button>
          </>
        )}

        {/* Demo role selection */}
        {showDemo && (
          <>
            <div style={{ marginBottom: 16 }}>
              <p style={{
                fontSize: 14,
                fontWeight: 600,
                color: var(--foreground),
                marginBottom: 4,
              }}>
                Select a demo role
              </p>
              <p style={{
                fontSize: 13,
                color: 'var(--text-muted)',
                margin: 0,
              }}>
                Explore G-Events as any role — no credentials needed.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {DEMO_ROLES.map(({ role, label, desc, color }) => (
                <button
                  key={role}
                  onClick={() => handleDemoLogin(role)}
                  disabled={loading !== null}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 14px',
                    borderRadius: 10,
                    border: '1.5px solid var(--border)',
                    background: loading === role ? 'var(--surface-alt)' : 'var(--card)',
                    cursor: loading ? 'wait' : 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                    marginBottom: 4,
                    width: '100%',
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = color;
                      (e.currentTarget as HTMLButtonElement).style.background = `${color}08`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
                      (e.currentTarget as HTMLButtonElement).style.background = 'var(--card)';
                    }
                  }}
                >
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: `${color}18`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <div style={{
                      width: 10,
                      height: 10,
                      borderRadius: 3,
                      background: color,
                    }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: var(--foreground),
                    }}>
                      {label}
                    </div>
                    <div style={{
                      fontSize: 12,
                      color: 'var(--text-muted)',
                      marginTop: 1,
                    }}>
                      {desc}
                    </div>
                  </div>
                  {loading === role ? (
                    <div className="spinner" style={{ width: 18, height: 18 }} />
                  ) : (
                    <ChevronRight size={18} color="var(--text-muted)" />
                  )}
                </button>
              ))}
            </div>

            <button
              className="g-btn g-btn-ghost g-btn-block g-btn-sm"
              onClick={() => setShowDemo(false)}
              style={{ marginTop: 14, width: '100%' }}
            >
              ← Back to sign in
            </button>
          </>
        )}
      </div>

      {/* Footer */}
      <p style={{
        marginTop: 20,
        fontSize: 12,
        color: 'var(--text-muted)',
        textAlign: 'center',
      }}>
        Gatik Events · Hackathon MVP
      </p>
    </div>
  );
}