'use client';

import React from 'react';
import type { Ticket, TicketStatus } from '@/lib/types';
import { Ticket as TicketIcon, Clock, User, ArrowRight } from 'lucide-react';

const STATUS_CLASS_MAP: Record<TicketStatus, string> = {
  'Open': 'status-open',
  'Acknowledged': 'status-acknowledged',
  'In Progress': 'status-in-progress',
  'Escalated': 'status-escalated',
  'Resolved': 'status-resolved',
  'Closed': 'status-closed',
};

function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    if (isNaN(diffMs)) return dateString;

    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 60) return 'just now';
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin === 1) return '1 minute ago';
    if (diffMin < 60) return `${diffMin} minutes ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours === 1) return '1 hour ago';
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
  } catch {
    return dateString;
  }
}

export function TicketList({ tickets, onTicketClick, emptyMessage }: TicketListProps) {
  if (tickets.length === 0) {
    return (
      <div className="empty-state">
        <TicketIcon size={44} style={{ color: '#9CA3AF', margin: '0 auto 12px', display: 'block' }} />
        <p>{emptyMessage || 'No tickets found'}</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {tickets.map((ticket) => {
        const statusClass = STATUS_CLASS_MAP[ticket.status] || 'status-open';
        const isClickable = Boolean(onTicketClick);

        return (
          <div
            key={ticket.id}
            className="g-card"
            role={isClickable ? 'button' : undefined}
            tabIndex={isClickable ? 0 : undefined}
            onClick={() => onTicketClick?.(ticket.id)}
            onKeyDown={(e) => {
              if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                onTicketClick?.(ticket.id);
              }
            }}
            style={{
              cursor: isClickable ? 'pointer' : 'default',
              padding: '14px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              transition: 'border-color 0.15s ease, box-shadow 0.15s ease, transform 0.1s ease',
            }}
          >
            {/* Top row: Category & Status */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
            }}>
              <span style={{
                fontSize: 11,
                fontWeight: 600,
                color: '#6B7280',
                background: 'var(--surface-alt)',
                padding: '2px 8px',
                borderRadius: 6,
                letterSpacing: 0.2,
              }}>
                {ticket.category}
              </span>
              <span className={`status-badge ${statusClass}`}>
                {ticket.status}
              </span>
            </div>

            {/* Middle: Subject */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: 8,
            }}>
              <h3 style={{
                fontSize: 15,
                fontWeight: 600,
                color: '#141A16',
                margin: 0,
                lineHeight: 1.35,
              }}>
                {ticket.subject}
              </h3>
              {isClickable && (
                <ArrowRight
                  size={16}
                  color="#9CA3AF"
                  style={{ flexShrink: 0, marginTop: 2 }}
                />
              )}
            </div>

            {/* Description excerpt */}
            {ticket.description && (
              <p style={{
                fontSize: 13,
                color: '#6B7280',
                lineHeight: 1.45,
                margin: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}>
                {ticket.description}
              </p>
            )}

            {/* Footer row: Creator, Relative Time, Assignee */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 8,
              marginTop: 4,
              paddingTop: 8,
              borderTop: '1px solid #A7F3A0',
              fontSize: 12,
              color: '#9CA3AF',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {ticket.creator_name && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <User size={13} />
                    <span style={{ color: '#6B7280', fontWeight: 500 }}>{ticket.creator_name}</span>
                  </span>
                )}
                {ticket.creator_name && <span>·</span>}
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <Clock size={13} />
                  <span>{formatRelativeTime(ticket.created_at)}</span>
                </span>
              </div>

              {ticket.assignee_name && (
                <span style={{ fontSize: 11, color: '#6B7280', fontWeight: 500 }}>
                  Assigned: <strong style={{ color: '#141A16' }}>{ticket.assignee_name}</strong>
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}