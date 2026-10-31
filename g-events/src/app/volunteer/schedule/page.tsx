'use client';

import React from 'react';
import { DashboardShell } from '@/components/DashboardShell';
import { ScheduleView } from '@/components/ScheduleView';

export default function VolunteerSchedulePage() {
  return (
    <DashboardShell role="volunteer" title="Schedule">
      <h1 style={{ fontSize: 20, fontWeight: 700, color: '#17192D', marginBottom: 4 }}>
        Event Schedule
      </h1>
      <p style={{ fontSize: 13, color: '#5A5F7A', marginBottom: 20 }}>
        Gatik Xplorer Hackathon · 31 Oct – 1 Nov
      </p>
      <ScheduleView />
    </DashboardShell>
  );
}
