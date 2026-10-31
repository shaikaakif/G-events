'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/DashboardShell';
import { Calendar, FileText, Ticket, ChevronRight, Zap, Clock } from 'lucide-react';
import { DEMO_EVENT, DEMO_SCHEDULE, getTicketsForRole } from '@/lib/demo-data';
import Link from 'next/link';

export default function ParticipantDashboard() {
  const router = useRouter();
  const [session, setSession] = useState<{ displayName: string; userId: string } | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('g-events-demo-session');
    if (stored) {
      try {
        setSession(JSON.parse(stored));
      } catch { /* handled by DashboardShell */ }
    }
  }, []);

  const myTickets = getTicketsForRole('participant', 'a1b2c3d4-0001-4000-8000-000000000001');
  const nextScheduleItem = DEMO_SCHEDULE.find(s => !s.is_break);

  return (
    <DashboardShell role="participant" title="G-Events">
      {/* Welcome */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#17192D', marginBottom: 4 }}>
          Welcome{session ? `, ${session.displayName.split(' ')[0]}` : ''} 👋
        </h1>
        <p style={{ fontSize: 14, color: '#5A5F7A', margin: 0 }}>
          You&apos;re participating in the Gatik Xplorer Hackathon
        </p>
      </div>

      {/* Event Card */}
      <div className="g-card" style={{ marginBottom: 16, borderLeft: '4px solid #3155F5' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <Zap size={18} color="#3155F5" />
          <span style={{ fontSize: 16, fontWeight: 700, color: '#17192D' }}>{DEMO_EVENT.name}</span>
        </div>
        <p style={{ fontSize: 13, color: '#5A5F7A', margin: '0 0 10px', lineHeight: 1.5 }}>
          {DEMO_EVENT.description}
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <span style={{
            fontSize: 12, fontWeight: 600, color: '#3155F5',
            background: '#3155F510', padding: '3px 10px', borderRadius: 6,
          }}>
            {DEMO_EVENT.event_type}
          </span>
          <span style={{
            fontSize: 12, fontWeight: 600, color: '#065F46',
            background: '#D1FAE5', padding: '3px 10px', borderRadius: 6,
          }}>
            {DEMO_EVENT.status}
          </span>
        </div>
      </div>

      {/* Next Up */}
      {nextScheduleItem && (
        <Link href="/participant/schedule" style={{ textDecoration: 'none' }}>
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
        <Link href="/participant/schedule" style={{ textDecoration: 'none' }}>
          <div className="g-card" style={{
            textAlign: 'center',
            padding: '16px 8px',
            cursor: 'pointer',
          }}>
            <Calendar size={24} color="#3155F5" style={{ margin: '0 auto 6px' }} />
            <div style={{ fontSize: 12, fontWeight: 600, color: '#17192D' }}>Schedule</div>
          </div>
        </Link>
        <Link href="/participant/challenge" style={{ textDecoration: 'none' }}>
          <div className="g-card" style={{
            textAlign: 'center',
            padding: '16px 8px',
            cursor: 'pointer',
          }}>
            <FileText size={24} color="#8657E8" style={{ margin: '0 auto 6px' }} />
            <div style={{ fontSize: 12, fontWeight: 600, color: '#17192D' }}>Challenge</div>
          </div>
        </Link>
        <Link href="/participant/tickets" style={{ textDecoration: 'none' }}>
          <div className="g-card" style={{
            textAlign: 'center',
            padding: '16px 8px',
            cursor: 'pointer',
            position: 'relative',
          }}>
            <Ticket size={24} color="#FF6748" style={{ margin: '0 auto 6px' }} />
            <div style={{ fontSize: 12, fontWeight: 600, color: '#17192D' }}>My Tickets</div>
            {myTickets.length > 0 && (
              <span style={{
                position: 'absolute', top: 8, right: 8,
                width: 18, height: 18, borderRadius: '50%',
                background: '#FF6748', color: 'white',
                fontSize: 11, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {myTickets.length}
              </span>
            )}
          </div>
        </Link>
      </div>

      {/* My Tickets Preview */}
      <div style={{ marginBottom: 8 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#17192D', margin: 0 }}>
            My Tickets
          </h2>
          <Link href="/participant/tickets" style={{
            fontSize: 13, fontWeight: 600, color: '#3155F5',
            textDecoration: 'none',
          }}>
            View all →
          </Link>
        </div>
        {myTickets.length === 0 ? (
          <div className="g-card" style={{ textAlign: 'center', padding: 24 }}>
            <p style={{ fontSize: 14, color: '#8E93AD', margin: 0 }}>
              No tickets yet. Need help? Raise a ticket!
            </p>
          </div>
        ) : (
          myTickets.slice(0, 2).map(ticket => (
            <div key={ticket.id} className="g-card" style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#17192D', marginBottom: 4 }}>
                    {ticket.subject}
                  </div>
                  <div style={{ fontSize: 12, color: '#8E93AD' }}>
                    {ticket.category}
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
