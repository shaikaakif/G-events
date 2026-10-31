'use client';

import React, { useState, useEffect } from 'react';
import { DashboardShell } from '@/components/DashboardShell';
import { getDemoProfile, DEMO_EVENT, DEMO_MEMBERS } from '@/lib/demo-data';
import { User, Building2, Mail, Award, Calendar } from 'lucide-react';

export default function CoordinatorProfilePage() {
  const [session, setSession] = useState<{ displayName: string; role: string; userId: string } | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('g-events-demo-session');
    if (stored) {
      try { setSession(JSON.parse(stored)); } catch {}
    }
  }, []);

  const profile = getDemoProfile('coordinator');
  const membership = DEMO_MEMBERS.find((m) => m.user_id === 'a1b2c3d4-0003-4000-8000-000000000003');

  return (
    <DashboardShell role="coordinator" title="Profile">
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: 'linear-gradient(135deg, #FFD447, #8657E8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 12px',
        }}>
          <User size={32} color="white" />
        </div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#17192D', margin: '0 0 4px' }}>
          {profile.display_name}
        </h1>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
          <span className="demo-badge">Demo</span>
          <span style={{
            fontSize: 12, fontWeight: 600, color: '#4C1D95',
            background: '#F3E8FF', padding: '2px 10px', borderRadius: 999,
          }}>
            Activity Coordinator
          </span>
        </div>
      </div>

      <div className="g-card" style={{ marginBottom: 12 }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, color: '#8E93AD', marginBottom: 12 }}>
          Personal Information
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Mail size={16} color="#5A5F7A" />
            <span style={{ fontSize: 14, color: '#17192D' }}>{profile.email}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Building2 size={16} color="#5A5F7A" />
            <span style={{ fontSize: 14, color: '#17192D' }}>{profile.institution_name}</span>
          </div>
        </div>
      </div>

      <div className="g-card" style={{ marginBottom: 12 }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, color: '#8E93AD', marginBottom: 12 }}>
          Assigned Responsibilities
        </h2>
        <p style={{ fontSize: 14, color: '#17192D', margin: 0, lineHeight: 1.5 }}>
          {membership?.responsibilities || 'Overall event coordination, volunteer management, logistics.'}
        </p>
      </div>

      <div className="g-card" style={{ marginBottom: 12 }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, color: '#8E93AD', marginBottom: 12 }}>
          Event Coordination
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <Award size={16} color="#3155F5" />
          <span style={{ fontSize: 14, fontWeight: 600, color: '#17192D' }}>{DEMO_EVENT.name}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Calendar size={16} color="#5A5F7A" />
          <span style={{ fontSize: 13, color: '#5A5F7A' }}>
            31 October – 1 November · {DEMO_EVENT.timezone}
          </span>
        </div>
      </div>
    </DashboardShell>
  );
}
