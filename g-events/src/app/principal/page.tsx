'use client';

import React, { useState, useEffect } from 'react';
import { DashboardShell } from '@/components/DashboardShell';
import { Calendar, User, Zap, Clock, ChevronRight, ClipboardList, Settings } from 'lucide-react';
import { DEMO_EVENT, DEMO_SCHEDULE, getDemoProfile, getTicketsForRole } from '@/lib/demo-data';
import Link from 'next/link';
import type { Ticket } from '@/lib/types';

const PRINCIPAL_USER_ID = 'a1b2c3d4-0004-4000-8000-000000000004';

export default function PrincipalDashboard() {
  const [session, setSession] = useState<{ displayName: string; userId: string } | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>(() => getTicketsForRole('principal', PRINCIPAL_USER_ID));

  useEffect(() => {
    const stored = sessionStorage.getItem('g-events-demo-session');
    if (stored) {
      try { setSession(JSON.parse(stored)); } catch { /* handled by DashboardShell */ }
    }
  }, []);

  const profile = getDemoProfile('principal');
  const openTickets = tickets.filter(
    (t) => t.status !== 'Resolved' && t.status !== 'Closed'
  );
  const unresolvedCount = openTickets.length;
  const nextScheduleItem = DEMO_SCHEDULE.find((s) => !s.is_break);

  return (
    <DashboardShell role="principal" title="Event Command Center">
      {/* Welcome */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#17192D', marginBottom: 4 }}>
          Welcome{session ? `, ${session.displayName.split(' ')[0]}` : ''} 👋
        </h1>
        <p style={{ fontSize: 14, color: '#5A5F7A', margin: 0 }}>
          Event oversight for the Gatik Xplorer Hackathon
        </p>
      </div>

      {/* Overview cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
        <div className="g-card" style={{ display: 'flex', flexDirection: 'column', gap: 8, borderLeft: '4px solid #8657E8' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#8E93AD', textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Unresolved Tickets
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: '#8657E8' }}>{unresolvedCount}</div>
        </div>
        <div className="g-card" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#8E93AD', textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Event Status
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#17192D' }}>
            {DEMO_EVENT.status.charAt(0).toUpperCase() + DEMO_EVENT.status.slice(1)}
          </div>
        </div>
      </div>

      {/* Next Up */}
      {nextScheduleItem && (
        <Link href="/principal/schedule" style={{ textDecoration: 'none' }}>
          <div className="g-card" style={{
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            cursor: 'pointer',
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: '#FFD44718',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Clock size={20} color="#92400E" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#8E93AD', marginBottom: 2 }}>
                NEXT UP
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#17192D' }}>
                {nextScheduleItem.title}
              </div>
              <div style={{ fontSize: 12, color: '#5A5F7A' }}>
                {nextScheduleItem.time_label} · {nextScheduleItem.day_label}
              </div>
            </div>
            <ChevronRight size={18} color="#8E93AD" />
          </div>
        </Link>
      )}

      {/* Quick Actions */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 10,
        marginBottom: 20,
      }}>
        <Link href="/principal/tickets" style={{ textDecoration: 'none' }}>
          <div className="g-card" style={{ textAlign: 'center', padding: '16px 8px', cursor: 'pointer', position: 'relative' }}>
            <ClipboardList size={24} color="#8657E8" style={{ margin: '0 auto 6px' }} />
            <div style={{ fontSize: 12, fontWeight: 600, color: '#17192D' }}>All Tickets</div>
            {unresolvedCount > 0 && (
              <span style={{
                position: 'absolute', top: 8, right: 8,
                width: 18, height: 18, borderRadius: '50%',
                background: '#FF6748', color: 'white',
                fontSize: 11, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {unresolvedCount}
              </span>
            )}
          </div>
        </Link>
        <Link href="/principal/events" style={{ textDecoration: 'none' }}>
          <div className="g-card" style={{ textAlign: 'center', padding: '16px 8px', cursor: 'pointer' }}>
            <Settings size={24} color="#3155F5" style={{ margin: '0 auto 6px' }} />
            <div style={{ fontSize: 12, fontWeight: 600, color: '#17192D' }}>Events</div>
          </div>
        </Link>
        <Link href="/principal/members" style={{ textDecoration: 'none' }}>
          <div className="g-card" style={{ textAlign: 'center', padding: '16px 8px', cursor: 'pointer' }}>
            <User size={24} color="#3155F5" style={{ margin: '0 auto 6px' }} />
            <div style={{ fontSize: 12, fontWeight: 600, color: '#17192D' }}>People</div>
          </div>
        </Link>
      </div>

      {/* Tickets needing attention */}
      <div style={{ marginBottom: 8 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#17192D', margin: 0 }}>
            Tickets Requiring Attention
          </h2>
          <Link href="/principal/tickets" style={{
            fontSize: 13, fontWeight: 600, color: '#3155F5',
            textDecoration: 'none',
          }}>
            View all →
          </Link>
        </div>
        {openTickets.length === 0 ? (
          <div className="g-card" style={{ textAlign: 'center', padding: 24 }}>
            <p style={{ fontSize: 14, color: '#8E93AD', margin: 0 }}>
              All tickets are resolved or closed.
            </p>
          </div>
        ) : (
          openTickets.slice(0, 3).map((ticket) => (
            <div key={ticket.id} className="g-card" style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#17192D', marginBottom: 4 }}>
                    {ticket.subject}
                  </div>
                  <div style={{ fontSize: 12, color: '#8E93AD' }}>
                    {ticket.category} · {ticket.creator_name}
                  </div>
                </div>
                <span className={`status-badge status-${ticket.status.toLowerCase().replace(' ', '-')}`}>
                  {ticket.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardShell>
  );
}
