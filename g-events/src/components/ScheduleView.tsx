'use client';

import React from 'react';
import { DEMO_SCHEDULE } from '@/lib/demo-data';
import { Coffee } from 'lucide-react';

export function ScheduleView() {
  // Group by day_label
  const days = DEMO_SCHEDULE.reduce<Record<string, typeof DEMO_SCHEDULE>>((acc, item) => {
    if (!acc[item.day_label]) acc[item.day_label] = [];
    acc[item.day_label].push(item);
    return acc;
  }, {});

  return (
    <div>
      {Object.entries(days).map(([dayLabel, items]) => (
        <div key={dayLabel} style={{ marginBottom: 28 }}>
          <h2 style={{
            fontSize: 16,
            fontWeight: 700,
            color: '#17192D',
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <span style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: '#3155F518',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 13,
              fontWeight: 700,
              color: '#3155F5',
            }}>
              {dayLabel.includes('1 —') ? 'D1' : 'D2'}
            </span>
            {dayLabel}
          </h2>
          <div className="timeline">
            {items.map((item) => (
              <div
                key={item.id}
                className={`timeline-item ${item.is_break ? 'is-break' : ''}`}
              >
                <div className="timeline-time">{item.time_label}</div>
                <div className="timeline-title">
                  {item.is_break && (
                    <Coffee size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
                  )}
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
