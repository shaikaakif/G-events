'use client';

import React, { useState, useEffect } from 'react';
import { DashboardShell } from '@/components/DashboardShell';
import { DEMO_EVENT, DEMO_MEMBERS, getDemoProfile } from '@/lib/demo-data';
import { User, Building2, Mail, Zap } from 'lucide-react';

export default function PrincipalMembersPage() {
  const [session, setSession] = useState<{ displayName: string; role: string; userId: string } | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('g-events-demo-session');
    if (stored) {
      try { setSession(JSON.parse(stored)); } catch {}
    }
  }, []);

  const profile = getDemoProfile('principal');

  const roleLabel: Record<string, string> = {
    participant: 'Participant',
    volunteer: 'Volunteer',
    coordinator: 'Activity Coordinator',
    principal: 'Principal',
  };

  const roleColor: Record<string, string> = {
    participant: '#3155F5',
    volunteer: '#A8E84A',
    coordinator: '#FFD447',
    principal: '#8657E8',
  };

  return (
    <DashboardShell role="principal" title="People">
      <div style={{ marginBottom: 16 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#17192D', margin: 0 }}>
          Event Staff & Participants
        </h1>
        <p style={{ fontSize: 13, color: '#8E93AD', margin: '4px 0 0' }}>
          {DEMO_MEMBERS.length} people assigned to {DEMO_EVENT.name}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {DEMO_MEMBERS.map((member) => {
          return (
            <div
              key={member.id}
              className="g-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: `${roleColor[member.role]}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <User size={20} color={roleColor[member.role]} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#17192D' }}>
                    {member.display_name}
                  </div>
                  <div style={{ fontSize: 12, color: '#8E93AD' }}>
                    {roleLabel[member.role]}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  fontSize: 11, fontWeight: 600, color: roleColor[member.role],
                  background: `${roleColor[member.role]}18`,
                  padding: '3px 10px', borderRadius: 6,
                }}>
                  {roleLabel[member.role]}
                </span>
                <span className="demo-badge" style={{ fontSize: 10 }}>Demo</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="g-card" style={{ marginTop: 16 }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, color: '#8E93AD', marginBottom: 12 }}>
          Signed-in Administrator
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <Zap size={16} color="#8657E8" />
          <span style={{ fontSize: 14, fontWeight: 600, color: '#17192D' }}>{profile.display_name}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Mail size={16} color="#5A5F7A" />
          <span style={{ fontSize: 13, color: '#5A5F7A' }}>{profile.email}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Building2 size={16} color="#5A5F7A" />
          <span style={{ fontSize: 13, color: '#5A5F7A' }}>{profile.institution_name}</span>
        </div>
      </div>
    </DashboardShell>
  );
}
