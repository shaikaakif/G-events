'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/DashboardShell';
import Link from 'next/link';
import { Zap, ArrowLeft } from 'lucide-react';
import type { GEvent, EventStatus } from '@/lib/types';

const STATUS_OPTIONS: EventStatus[] = ['draft', 'published', 'active', 'completed', 'cancelled'];

export default function CreateEventPage() {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('gatik-xplorer-hackathon');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState('hackathon');
  const [status, setStatus] = useState<EventStatus>('draft');
  const [startsAt, setStartsAt] = useState('');
  const [endsAt, setEndsAt] = useState('');
  const [errors, setErrors] = useState<{ name?: string; slug?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; slug?: string } = {};
    if (!name.trim()) newErrors.name = 'Event name is required';
    if (!slug.trim()) newErrors.slug = 'Slug is required';
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setSubmitting(true);
    // In a real Supabase deployment this would INSERT into the events table.
    // For the MVP demo the event is created in local state and shown in the events list.
    const newEvent: GEvent = {
      id: `evt-${Date.now()}`,
      slug: slug.trim(),
      name: name.trim(),
      description: description.trim() || undefined,
      event_type: eventType,
      starts_at: startsAt || undefined,
      ends_at: endsAt || undefined,
      timezone: 'Asia/Kolkata',
      status,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    // Stored in session so it persists during the demo session only.
    sessionStorage.setItem('g-events-last-created-event', JSON.stringify(newEvent));
    setSubmitting(false);
  };

  return (
    <DashboardShell role="principal" title="Create Event">
      <Link href="/principal/events" style={{ textDecoration: 'none', marginBottom: 16, display: 'inline-flex', alignItems: 'center', gap: 6, color: '#3155F5', fontWeight: 600, fontSize: 13 }}>
        <ArrowLeft size={16} /> Back to Events
      </Link>

      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#17192D', marginBottom: 4 }}>
          Create Event
        </h1>
        <p style={{ fontSize: 13, color: '#5A5F7A', margin: 0 }}>
          Fill in the basics. Schedule can be managed after the event is created.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label className="g-label" htmlFor="event-name">Event Name <span style={{ color: '#FF6748' }}>*</span></label>
          <input
            id="event-name"
            className="g-input"
            placeholder="e.g. Gatik Xplorer Hackathon"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ borderColor: errors.name ? '#FF6748' : undefined }}
          />
          {errors.name && <span style={{ color: '#FF6748', fontSize: 12, marginTop: 4, display: 'block' }}>{errors.name}</span>}
        </div>

        <div>
          <label className="g-label" htmlFor="event-slug">Slug <span style={{ color: '#FF6748' }}>*</span></label>
          <input
            id="event-slug"
            className="g-input"
            placeholder="e.g. gatik-xplorer-hackathon"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            style={{ borderColor: errors.slug ? '#FF6748' : undefined }}
          />
          {errors.slug && <span style={{ color: '#FF6748', fontSize: 12, marginTop: 4, display: 'block' }}>{errors.slug}</span>}
        </div>

        <div>
          <label className="g-label" htmlFor="event-description">Description</label>
          <textarea
            id="event-description"
            className="g-textarea"
            rows={3}
            placeholder="Describe the event..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="g-label" htmlFor="event-type">Event Type</label>
          <select id="event-type" className="g-select" value={eventType} onChange={(e) => setEventType(e.target.value as string)}>
            <option value="hackathon">Hackathon</option>
            <option value="workshop">Workshop</option>
            <option value="competition">Competition</option>
            <option value="exhibition">Exhibition</option>
            <option value="festival">Festival</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="g-label" htmlFor="event-status">Status</label>
          <select id="event-status" className="g-select" value={status} onChange={(e) => setStatus(e.target.value as EventStatus)}>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label className="g-label" htmlFor="event-starts-at">Starts At</label>
            <input
              id="event-starts-at"
              type="datetime-local"
              className="g-input"
              value={startsAt}
              onChange={(e) => setStartsAt(e.target.value)}
            />
          </div>
          <div>
            <label className="g-label" htmlFor="event-ends-at">Ends At</label>
            <input
              id="event-ends-at"
              type="datetime-local"
              className="g-input"
              value={endsAt}
              onChange={(e) => setEndsAt(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="g-btn g-btn-primary g-btn-lg"
        >
          {submitting ? 'Creating...' : 'Create Event'}
        </button>

        <p style={{ fontSize: 12, color: '#8E93AD', marginTop: 12, marginBottom: 0 }}>
          Note: With Supabase credentials configured in .env, this would persist to the events table.
          For the demo it is stored in the session so you can see it appear in the events list.
        </p>
      </form>
    </DashboardShell>
  );
}
