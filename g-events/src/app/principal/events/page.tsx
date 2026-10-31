'use client';

import React, { useState, useEffect } from 'react';
import { DashboardShell } from '@/components/DashboardShell';
import { Calendar, Zap, Settings, Plus, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { DEMO_EVENT } from '@/lib/demo-data';
import type { GEvent } from '@/lib/types';

export default function PrincipalEventsPage() {
  const [session, setSession] = useState<{ displayName: string; role: string; userId: string } | null>(null);
  const [events, setEvents] = useState<GEvent[]>([DEMO_EVENT]);

  useEffect(() => {
    const stored = sessionStorage.getItem('g-events-demo-session');
    if (stored) {
      try { setSession(JSON.parse(stored)); } catch {}
    }
  }, []);

  return (
    <DashboardShell role="principal" title="Events">
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#17192D', margin: 0 }}>
            Events
          </h1>
          <p style={{ fontSize: 13, color: '#8E93AD', margin: '2px 0 0' }}>
            Manage and publish campus activities
          </p>
        </div>
        <Link href="/principal/events/new" style={{ textDecoration: 'none' }}>
          <button className="g-btn g-btn-primary g-btn-sm">
            <Plus size={16} /> Create Event
          </button>
        </Link>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {events.map((event) => (
          <div key={event.id} className="g-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <Zap size={18} color="#3155F5" />
                <span style={{ fontSize: 16, fontWeight: 700, color: '#17192D' }}>{event.name}</span>
              </div>
              <p style={{ fontSize: 13, color: '#5A5F7A', margin: '0 0 8px', lineHeight: 1.45, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {event.description || 'No description provided.'}
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: 11, fontWeight: 600, color: '#3155F5',
                  background: '#3155F510', padding: '2px 10px', borderRadius: 6,
                }}>
                  {event.event_type}
                </span>
                <span style={{
                  fontSize: 11, fontWeight: 600, color: '#065F46',
                  background: '#D1FAE5', padding: '2px 10px', borderRadius: 6,
                }}>
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </span>
                <span style={{
                  fontSize: 11, fontWeight: 600, color: '#8E93AD',
                  background: '#F0F2F7', padding: '2px 10px', borderRadius: 6,
                }}>
                  {event.slug}
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Link href={`/principal/schedule`} style={{ textDecoration: 'none' }}>
                <button className="g-btn g-btn-ghost g-btn-sm" style={{ padding: '6px 10px' }}>
                  <Calendar size={16} /> Schedule
                </button>
              </Link>
              <ChevronRight size={16} color="#8E93AD" />
            </div>
          </div>
        ))}
      </div>

      <div className="g-card" style={{ marginTop: 20, padding: 16, background: '#F0F2F7' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: '#17192D', margin: '0 0 8px' }}>
          Default Demo Event
        </h3>
        <p style={{ fontSize: 13, color: '#5A5F7A', margin: 0 }}>
          {DEMO_EVENT.name} is pre-configured as the active demo event for the hackathon presentation.
        </p>
      </div>
    </DashboardShell>
  );
}
