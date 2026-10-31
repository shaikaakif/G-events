'use client';

import React, { useState, useEffect } from 'react';
import type { Ticket, TicketStatus, TicketUpdate, UserRole } from '@/lib/types';
import { X, Clock, User, Shield, CheckCircle, MessageSquare } from 'lucide-react';

interface TicketDetailProps {
  ticket: Ticket;
  updates: TicketUpdate[];
  onClose: () => void;
  onStatusChange?: (ticketId: string, newStatus: TicketStatus, note: string) => void;
  currentRole: UserRole;
  canChangeStatus?: boolean;
}

const STATUS_CLASS_MAP: Record<TicketStatus, string> = {
  'Open': 'status-open',
  'Acknowledged': 'status-acknowledged',
  'In Progress': 'status-in-progress',
  'Escalated': 'status-escalated',
  'Resolved': 'status-resolved',
  'Closed': 'status-closed',
};

function getValidNextStatuses(currentStatus: TicketStatus, role: UserRole): TicketStatus[] {
  const allStatuses: TicketStatus[] = [
    'Open',
    'Acknowledged',
    'In Progress',
    'Escalated',
    'Resolved',
    'Closed',
  ];

  if (role === 'principal') {
    return allStatuses.filter((s) => s !== currentStatus);
  }

  if (role === 'volunteer') {
    switch (currentStatus) {
      case 'Open':
        return ['Acknowledged', 'Escalated'];
      case 'Acknowledged':
        return ['In Progress', 'Escalated'];
      case 'In Progress':
        return ['Resolved', 'Escalated'];
      default:
        return [];
    }
  }

  if (role === 'coordinator') {
    switch (currentStatus) {
      case 'Open':
        return ['Acknowledged', 'Escalated'];
      case 'Acknowledged':
        return ['In Progress', 'Escalated'];
      case 'In Progress':
        return ['Resolved', 'Escalated'];
      case 'Escalated':
        return ['In Progress', 'Resolved'];
      case 'Resolved':
        return ['Closed'];
      default:
        return [];
    }
  }

  return [];
}

function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return d.toLocaleString('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateString;
  }
}

export function TicketDetail({
  ticket,
  updates,
  onClose,
  onStatusChange,
  currentRole,
  canChangeStatus = false,
}: TicketDetailProps) {
  const validNextStatuses = getValidNextStatuses(ticket.status, currentRole);
  const [selectedStatus, setSelectedStatus] = useState<TicketStatus>(
    validNextStatuses[0] || ticket.status
  );
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (validNextStatuses.length > 0) {
      setSelectedStatus(validNextStatuses[0]);
    }
  }, [ticket.status, currentRole]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleStatusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onStatusChange || !selectedStatus) return;

    setIsSubmitting(true);
    onStatusChange(ticket.id, selectedStatus, note.trim());
    setNote('');
    setIsSubmitting(false);
  };

  const statusClass = STATUS_CLASS_MAP[ticket.status] || 'status-open';

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Top Header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 12,
          paddingBottom: 16,
          borderBottom: '1px solid var(--border)',
          marginBottom: 16,
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{
                fontSize: 11,
                fontWeight: 600,
                color: 'var(--text-muted)',
                background: 'var(--surface-alt)',
                padding: '2px 8px',
                borderRadius: 6,
              }}>
                {ticket.category}
              </span>
              <span className={`status-badge ${statusClass}`}>
                {ticket.status}
              </span>
            </div>
            <h2 style={{
              fontSize: 18,
              fontWeight: 700,
              color: var(--foreground),
              margin: 0,
              lineHeight: 1.3,
            }}>
              {ticket.subject}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="g-btn g-btn-ghost g-btn-sm"
            style={{ padding: 6, color: 'var(--text-muted)' }}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Metadata Details */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 12,
          background: 'var(--surface-card)',
          border: '1px solid var(--border)',
          borderRadius: 10,
          padding: '12px 14px',
          marginBottom: 16,
          fontSize: 13,
        }}>
          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: 11, display: 'block', marginBottom: 2 }}>
              Reported By
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: var(--foreground), fontWeight: 600 }}>
              <User size={14} color="var(--foreground)" />
              <span>{ticket.creator_name || 'Participant'}</span>
            </div>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'capitalize' }}>
              ({ticket.creator_role})
            </span>
          </div>

          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: 11, display: 'block', marginBottom: 2 }}>
              Assigned To
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: var(--foreground), fontWeight: 600 }}>
              <Shield size={14} color="var(--foreground)" />
              <span>{ticket.assignee_name || (ticket.assigned_role ? `Role: ${ticket.assigned_role}` : 'Unassigned')}</span>
            </div>
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: 11, display: 'block', marginBottom: 2 }}>
              Reported At
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)' }}>
              <Clock size={14} />
              <span>{formatDate(ticket.created_at)}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: 20 }}>
          <label className="g-label" style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Description
          </label>
          <div style={{
            background: 'var(--surface-card)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '12px 14px',
            fontSize: 14,
            lineHeight: 1.55,
            color: var(--foreground),
            whiteSpace: 'pre-wrap',
          }}>
            {ticket.description}
          </div>
        </div>

        {/* Resolution note callout if exists */}
        {ticket.resolution_note && (
          <div style={{
            background: 'var(--success)10',
            border: '1px solid var(--success)',
            borderRadius: 10,
            padding: '12px 14px',
            marginBottom: 20,
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              color: 'var(--success)',
              fontWeight: 600,
              fontSize: 13,
              marginBottom: 4,
            }}>
              <CheckCircle size={15} />
              Resolution Note
            </div>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--success)', lineHeight: 1.45 }}>
              {ticket.resolution_note}
            </p>
          </div>
        )}

        {/* Status Change Form */}
        {canChangeStatus && Boolean(onStatusChange) && validNextStatuses.length > 0 && (
          <form
            onSubmit={handleStatusSubmit}
            style={{
              background: 'var(--surface-card)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              padding: 16,
              marginBottom: 24,
            }}
          >
            <h3 style={{
              fontSize: 14,
              fontWeight: 700,
              color: var(--foreground),
              margin: '0 0 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              <Shield size={16} color="var(--primary)" />
              Update Ticket Status
            </h3>

            <div style={{ marginBottom: 12 }}>
              <label className="g-label" htmlFor="ticket-status-select">
                Next Status
              </label>
              <select
                id="ticket-status-select"
                className="g-select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as TicketStatus)}
              >
                {validNextStatuses.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))
              </select>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label className="g-label" htmlFor="ticket-note-input">
                Update Note (Optional)
              </textarea>
              <textarea
                id="ticket-note-input"
                className="g-textarea"
                rows={2}
                placeholder="Add a comment or explanation for this status update..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                style={{ minHeight: 70 }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !selectedStatus}
              className="g-btn g-btn-primary g-btn-block"
            >
              Update Status
            </button>
          </form>
        )}

        {/* Ticket Update History */}
        <div>
          <h3 style={{
            fontSize: 14,
            fontWeight: 700,
            color: var(--foreground),
            margin: '0 0 12px',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
            <MessageSquare size={16} color="var(--text-muted)" />
            Activity History
          </h3>

          {updates.length === 0 ? (
            <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0, fontStyle: 'italic' }}>
              No status updates recorded yet.
            </p>
          ) : (
            <div className="timeline" style={{ paddingLeft: 20 }}>
              {updates.map((update) => (
                <div key={update.id} className="timeline-item" style={{ paddingBottom: 14 }}>
                  <div className="timeline-time" style={{ fontSize: 11 }}>
                    {formatDate(update.created_at)}
                  </div>
                  <div className="timeline-title" style={{ fontSize: 13 }}>
                    <span style={{ fontWeight: 600, color: var(--foreground) }}>
                      {update.actor_name || 'Staff Member'}
                    </span>
                    {update.new_status && (
                      <span style={{ color: '#6B7280' }}>
                        {' '}changed status
                        {update.old_status && ` from ${update.old_status}`} to{' '}
                        <strong style={{ color: '#141A16' }}>{update.new_status}</strong>
                      </span>
                    )}
                  </div>
                  {update.note && (
                    <div style={{
                      marginTop: 4,
                      fontSize: 12,
                      color: 'var(--text-muted)',
                      background: 'var(--surface-alt)',
                      padding: '6px 10px',
                      borderRadius: 6,
                    }}>
                      {update.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}