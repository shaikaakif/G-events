'use client';

import React from 'react';
import { DashboardShell } from '@/components/DashboardShell';
import { ChallengeView } from '@/components/ChallengeView';

export default function ParticipantChallengePage() {
  return (
    <DashboardShell role="participant" title="Challenge">
      <ChallengeView />
    </DashboardShell>
  );
}
