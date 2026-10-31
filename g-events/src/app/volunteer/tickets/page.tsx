'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/DashboardShell';
import { TicketList } from '@/components/TicketList';
import { TicketDetail } from '@/components/TicketDetail';
import { Plus } from 'lucide-react';
import { getTicketsForRole, getTicketUpdates, DEMO_TICKETS } from '@/lib/demo-data';
import type { Ticket, TicketCategory, TicketStatus } from '@/lib/types';

const VOLUNTEER_USER_ID = 'a1b2c3d4-0002-4000-8000-000000000002';

export default function VolunteerTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>(() => getTicketsForRole('volunteer', VOLUNTEER_USER_ID));
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  const selectedTicket = tickets.find((t) => t.id === selectedTicketId) || null;
  const updates = selectedTicketId ? getTicketUpdates(selectedTicketId) : [];

  const handleStatusChange = (ticketId: string, newStatus: TicketStatus, note: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              status: newStatus,
              updated_at: new Date().toISOString(),
              resolution_note: newStatus === 'Resolved' ? note : t.resolution_note,
            }
          : t
      )
    );
    setSelectedTicketId(null);
  };

  return (
    <DashboardShell role="volunteer" title="My Tickets">
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#17192D', margin: 0 }}>
            Tickets Assigned to You
          </h1>
          <p style={{ fontSize: 13, color: '#8E93AD', margin: '2px 0 0' }}>
            {tickets.length} ticket{tickets.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <TicketList
        tickets={tickets}
        onTicketClick={(id) => setSelectedTicketId(id)}
        emptyMessage="No tickets assigned to you yet."
      />

      {selectedTicket && (
        <TicketDetail
          ticket={selectedTicket}
          updates={updates}
          onClose={() => setSelectedTicketId(null)}
          currentRole="volunteer"
          canChangeStatus
          onStatusChange={handleStatusChange}
        />
      )}
    </DashboardShell>
  );
}
