'use client';

import React, { useState, useEffect } from 'react';
import { DashboardShell } from '@/components/DashboardShell';
import { Calendar, Ticket as TicketIcon, User, Zap, Clock, ChevronRight, Plus } from 'lucide-react';
import { DEMO_EVENT, DEMO_SCHEDULE, getDemoProfile, getTicketsForRole } from '@/lib/demo-data';
import Link from 'next/link';
import { CreateTicketModal } from '@/components/CreateTicketModal';
import type { Ticket, TicketCategory, TicketStatus } from '@/lib/types';

const VOLUNTEER_USER_ID = 'a1b2c3d4-0002-4000-8000-000000000002';
const COORDINATOR_USER_ID = 'a1b2c3d4-0003-4000-8000-000000000003';

export default function VolunteerDashboard() {
  const [session, setSession] = useState<{ displayName: string; userId: string } | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>(() => getTicketsForRole('volunteer', VOLUNTEER_USER_ID));
  const [showRequest, setShowRequest] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem('g-events-demo-session');
    if (stored) {
      try { setSession(JSON.parse(stored)); } catch { /* handled by DashboardShell */ }
    }
  }, []);

  const profile = getDemoProfile('volunteer');
  const membershipResponsibilities =
    'Technical support desk, helping participants with setup and tooling issues';
  const openTickets = tickets.filter(
    (t) => t.status !== 'Resolved' && t.status !== 'Closed'
  );
  const nextScheduleItem = DEMO_SCHEDULE.find((s) => !s.is_break);

  const handleRequestSubmit = (data: { category: TicketCategory; subject: string; description: string }) => {
    const newTicket: Ticket = {
      id: `ticket-${Date.now()}`,
      event_id: DEMO_EVENT.id,
      created_by: VOLUNTEER_USER_ID,
      creator_role: 'volunteer',
      category: data.category,
      subject: data.subject,
      description: data.description,
      assigned_to: COORDINATOR_USER_ID,
      assigned_role: 'coordinator',
      status: 'Open',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      creator_name: profile.display_name,
      assignee_name: 'Rahul Verma',
    };
    setTickets((prev) => [newTicket, ...prev]);
    setShowRequest(false);
  };

  return (
    <DashboardShell role="volunteer" title="Volunteer Desk">
      {/* Welcome */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#17192D', marginBottom: 4 }}>
          Welcome{session ? `, ${session.displayName.split(' ')[0]}` : ''} 👋
        </h1>
        <p style={{ fontSize: 14, color: '#5A5F7A', margin: 0 }}>
          You&apos;re on volunteer duty for the Gatik Xplorer Hackathon
        </p>
      </div>

      {/* Responsibilities card */}
      <div className="g-card" style={{ marginBottom: 16, borderLeft: '4px solid #A8E84A' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <Zap size={18} color="#A8E84A" />
          <span style={{ fontSize: 16, fontWeight: 700, color: '#17192D' }}>Your Responsibilities</span>
        </div>
        <p style={{ fontSize: 13, color: '#5A5F7A', margin: '0 0 10px', lineHeight: 1.5 }}>
          {membershipResponsibilities}
        </p>
        <span style={{
          fontSize: 12, fontWeight: 600, color: '#065F46',
          background: '#D1FAE5', padding: '3px 10px', borderRadius: 6,
        }}>
          Volunteer
        </span>
      </div>

      {/* Next Up */}
      {nextScheduleItem && (
        <Link href="/volunteer/schedule" style={{ textDecoration: 'none' }}>
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
        <Link href="/volunteer/schedule" style={{ textDecoration: 'none' }}>
          <div className="g-card" style={{ textAlign: 'center', padding: '16px 8px', cursor: 'pointer' }}>
            <Calendar size={24} color="#3155F5" style={{ margin: '0 auto 6px' }} />
            <div style={{ fontSize: 12, fontWeight: 600, color: '#17192D' }}>Schedule</div>
          </div>
        </Link>
        <Link href="/volunteer/tickets" style={{ textDecoration: 'none' }}>
          <div className="g-card" style={{ textAlign: 'center', padding: '16px 8px', cursor: 'pointer', position: 'relative' }}>
            <TicketIcon size={24} color="#FF6748" style={{ margin: '0 auto 6px' }} />
            <div style={{ fontSize: 12, fontWeight: 600, color: '#17192D' }}>My Tickets</div>
            {openTickets.length > 0 && (
              <span style={{
                position: 'absolute', top: 8, right: 8,
                width: 18, height: 18, borderRadius: '50%',
                background: '#FF6748', color: 'white',
                fontSize: 11, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {openTickets.length}
              </span>
            )}
          </div>
        </Link>
        <button
          onClick={() => setShowRequest(true)}
          className="g-btn g-btn-outline g-btn-sm"
          style={{ width: '100%', padding: '14px 8px' }}
        >
          <Plus size={16} /> Request Help
        </button>
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
            Tickets Assigned to You
          </h2>
          <Link href="/volunteer/tickets" style={{
            fontSize: 13, fontWeight: 600, color: '#3155F5',
            textDecoration: 'none',
          }}>
            View all →
          </Link>
        </div>
        {openTickets.length === 0 ? (
          <div className="g-card" style={{ textAlign: 'center', padding: 24 }}>
            <p style={{ fontSize: 14, color: '#8E93AD', margin: 0 }}>
              No tickets assigned yet. You&apos;ll receive support requests here.
            </p>
          </div>
        ) : (
          openTickets.slice(0, 2).map((ticket) => (
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

      {showRequest && (
        <CreateTicketModal
          onClose={() => setShowRequest(false)}
          onSubmit={handleRequestSubmit}
          creatorRole="volunteer"
        />
      )}
    </DashboardShell>
  );
}
