'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/DashboardShell';
import { TicketList } from '@/components/TicketList';
import { TicketDetail } from '@/components/TicketDetail';
import { CreateTicketModal } from '@/components/CreateTicketModal';
import { Plus } from 'lucide-react';
import { getTicketsForRole, getTicketUpdates, DEMO_TICKETS } from '@/lib/demo-data';
import type { Ticket, TicketCategory, TicketStatus } from '@/lib/types';

export default function ParticipantTicketsPage() {
  const userId = 'a1b2c3d4-0001-4000-8000-000000000001';
  const [tickets, setTickets] = useState<Ticket[]>(() => getTicketsForRole('participant', userId));
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const selectedTicket = tickets.find(t => t.id === selectedTicketId) || null;
  const updates = selectedTicketId ? getTicketUpdates(selectedTicketId) : [];

  const handleCreateTicket = (data: { category: TicketCategory; subject: string; description: string }) => {
    const newTicket: Ticket = {
      id: `ticket-${Date.now()}`,
      event_id: 'e1e2e3e4-0001-4000-8000-000000000001',
      created_by: userId,
      creator_role: 'participant',
      category: data.category,
      subject: data.subject,
      description: data.description,
      status: 'Open' as TicketStatus,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      creator_name: 'Aarav Sharma',
    };
    setTickets(prev => [newTicket, ...prev]);
    setShowCreate(false);
  };

  return (
    <DashboardShell role="participant" title="My Tickets">
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#17192D', margin: 0 }}>
            My Tickets
          </h1>
          <p style={{ fontSize: 13, color: '#8E93AD', margin: '2px 0 0' }}>
            {tickets.length} ticket{tickets.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          className="g-btn g-btn-primary g-btn-sm"
          onClick={() => setShowCreate(true)}
        >
          <Plus size={16} />
          Raise Ticket
        </button>
      </div>

      <TicketList
        tickets={tickets}
        onTicketClick={(id) => setSelectedTicketId(id)}
        emptyMessage="No tickets yet. Raise one if you need help!"
      />

      {selectedTicket && (
        <TicketDetail
          ticket={selectedTicket}
          updates={updates}
          onClose={() => setSelectedTicketId(null)}
          currentRole="participant"
          canChangeStatus={false}
        />
      )}

      {showCreate && (
        <CreateTicketModal
          onClose={() => setShowCreate(false)}
          onSubmit={handleCreateTicket}
          creatorRole="participant"
        />
      )}
    </DashboardShell>
  );
}
