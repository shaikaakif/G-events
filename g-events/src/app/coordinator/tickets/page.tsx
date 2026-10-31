'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/DashboardShell';
import { TicketList } from '@/components/TicketList';
import { TicketDetail } from '@/components/TicketDetail';
import { getTicketsForRole, getTicketUpdates } from '@/lib/demo-data';
import type { Ticket, TicketStatus } from '@/lib/types';

const COORDINATOR_USER_ID = 'a1b2c3d4-0003-4000-8000-000000000003';

export default function CoordinatorTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>(() => getTicketsForRole('coordinator', COORDINATOR_USER_ID));
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  const selectedTicket = tickets.find((t) => t.id === selectedTicketId) || null;
  const updates = selectedTicketId ? getTicketUpdates(selectedTicketId) : [];

  const handleStatusChange = (ticketId: string, newStatus: TicketStatus, note: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? { ...t, status: newStatus, updated_at: new Date().toISOString() }
          : t
      )
    );
    setSelectedTicketId(null);
  };

  const openCount = tickets.filter((t) => t.status !== 'Resolved' && t.status !== 'Closed').length;

  return (
    <DashboardShell role="coordinator" title="All Tickets">
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#17192D', margin: 0 }}>
            All Event Tickets
          </h1>
          <p style={{ fontSize: 13, color: '#8E93AD', margin: '2px 0 0' }}>
            {tickets.length} total · {openCount} open
          </p>
        </div>
      </div>

      <TicketList
        tickets={tickets}
        onTicketClick={(id) => setSelectedTicketId(id)}
        emptyMessage="No tickets in this event yet."
      />

      {selectedTicket && (
        <TicketDetail
          ticket={selectedTicket}
          updates={updates}
          onClose={() => setSelectedTicketId(null)}
          currentRole="coordinator"
          canChangeStatus
          onStatusChange={handleStatusChange}
        />
      )}
    </DashboardShell>
  );
}
