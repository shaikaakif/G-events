'use client';

import React, { useState, useEffect } from 'react';
import type { TicketCategory, UserRole } from '@/lib/types';
import { X, PlusCircle } from 'lucide-react';

interface CreateTicketModalProps {
  onClose: () => void;
  onSubmit: (data: { category: TicketCategory; subject: string; description: string }) => void;
  creatorRole: UserRole;
}

const ROLE_CATEGORIES: Record<UserRole, TicketCategory[]> = {
  participant: ['Participant Help', 'Venue / Schedule Issue', 'Other'],
  volunteer: ['Volunteer Support', 'Additional Volunteers', 'Resources / Materials', 'Other'],
  coordinator: ['Additional Volunteers', 'Resources / Materials', 'Venue / Schedule Issue', 'Other'],
  principal: [
    'Participant Help',
    'Volunteer Support',
    'Additional Volunteers',
    'Resources / Materials',
    'Venue / Schedule Issue',
    'Other',
  ],
};

export function CreateTicketModal({ onClose, onSubmit, creatorRole }: CreateTicketModalProps) {
  const availableCategories = ROLE_CATEGORIES[creatorRole] || ROLE_CATEGORIES.participant;

  const [category, setCategory] = useState<TicketCategory>(availableCategories[0]);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ category?: string; subject?: string; description?: string }>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { category?: string; subject?: string; description?: string } = {};

    if (!category) {
      newErrors.category = 'Please select a category';
    }
    if (!subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      category,
      subject: subject.trim(),
      description: description.trim(),
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: 16,
          borderBottom: '1px solid #ECEEF4',
          marginBottom: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: '#3155F518',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <PlusCircle size={18} color="#3155F5" />
            </div>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#17192D', margin: 0 }}>
                Raise a Ticket
              </h2>
              <p style={{ fontSize: 12, color: '#8E93AD', margin: 0 }}>
                Get help or submit an operational request
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="g-btn g-btn-ghost g-btn-sm"
            style={{ padding: 6, color: '#8E93AD' }}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Category */}
          <div style={{ marginBottom: 14 }}>
            <label className="g-label" htmlFor="ticket-category">
              Category <span style={{ color: '#FF6748' }}>*</span>
            </label>
            <select
              id="ticket-category"
              className="g-select"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value as TicketCategory);
                if (errors.category) {
                  setErrors((prev) => ({ ...prev, category: undefined }));
                }
              }}
              style={{
                borderColor: errors.category ? '#FF6748' : undefined,
              }}
            >
              {availableCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <span style={{ color: '#FF6748', fontSize: 12, marginTop: 4, display: 'block' }}>
                {errors.category}
              </span>
            )}
          </div>

          {/* Subject */}
          <div style={{ marginBottom: 14 }}>
            <label className="g-label" htmlFor="ticket-subject">
              Subject <span style={{ color: '#FF6748' }}>*</span>
            </label>
            <input
              id="ticket-subject"
              type="text"
              className="g-input"
              placeholder="Brief summary of the issue or request"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                if (errors.subject) {
                  setErrors((prev) => ({ ...prev, subject: undefined }));
                }
              }}
              style={{
                borderColor: errors.subject ? '#FF6748' : undefined,
              }}
            />
            {errors.subject && (
              <span style={{ color: '#FF6748', fontSize: 12, marginTop: 4, display: 'block' }}>
                {errors.subject}
              </span>
            )}
          </div>

          {/* Description */}
          <div style={{ marginBottom: 20 }}>
            <label className="g-label" htmlFor="ticket-description">
              Description <span style={{ color: '#FF6748' }}>*</span>
            </label>
            <textarea
              id="ticket-description"
              className="g-textarea"
              rows={4}
              placeholder="Provide specific details (room number, error message, materials needed)..."
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description) {
                  setErrors((prev) => ({ ...prev, description: undefined }));
                }
              }}
              style={{
                minHeight: 100,
                borderColor: errors.description ? '#FF6748' : undefined,
              }}
            />
            {errors.description && (
              <span style={{ color: '#FF6748', fontSize: 12, marginTop: 4, display: 'block' }}>
                {errors.description}
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 10,
          }}>
            <button
              type="button"
              onClick={onClose}
              className="g-btn g-btn-ghost"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="g-btn g-btn-primary"
            >
              Submit Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
