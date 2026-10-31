import {
  ChallengeContent,
  DemoSession,
  EventMember,
  GEvent,
  Profile,
  ScheduleItem,
  Ticket,
  TicketUpdate,
  UserRole,
} from './types';

// =============================================================================
// DEMO PROFILES
// =============================================================================
export const DEMO_PROFILES: Profile[] = [
  {
    id: 'a1b2c3d4-0001-4000-8000-000000000001',
    display_name: 'Aarav Sharma',
    email: 'demo.participant@gatik.events',
    institution_name: 'Gatik Academy',
    is_demo: true,
    created_at: '2025-10-31T08:00:00+05:30',
  },
  {
    id: 'a1b2c3d4-0002-4000-8000-000000000002',
    display_name: 'Priya Patel',
    email: 'demo.volunteer@gatik.events',
    institution_name: 'Gatik Academy',
    is_demo: true,
    created_at: '2025-10-31T08:00:00+05:30',
  },
  {
    id: 'a1b2c3d4-0003-4000-8000-000000000003',
    display_name: 'Rahul Verma',
    email: 'demo.coordinator@gatik.events',
    institution_name: 'Gatik Academy',
    is_demo: true,
    created_at: '2025-10-31T08:00:00+05:30',
  },
  {
    id: 'a1b2c3d4-0004-4000-8000-000000000004',
    display_name: 'Dr. Sunita Iyer',
    email: 'demo.principal@gatik.events',
    institution_name: 'Gatik Academy',
    is_demo: true,
    created_at: '2025-10-31T08:00:00+05:30',
  },
  {
    id: 'a1b2c3d4-0005-4000-8000-000000000005',
    display_name: 'Meera Joshi',
    email: 'meera@demo.gatik.events',
    institution_name: 'Gatik Academy',
    is_demo: true,
    created_at: '2025-10-31T08:00:00+05:30',
  },
  {
    id: 'a1b2c3d4-0006-4000-8000-000000000006',
    display_name: 'Karan Singh',
    email: 'karan@demo.gatik.events',
    institution_name: 'Gatik Academy',
    is_demo: true,
    created_at: '2025-10-31T08:00:00+05:30',
  },
  {
    id: 'a1b2c3d4-0007-4000-8000-000000000007',
    display_name: 'Ananya Gupta',
    email: 'ananya@demo.gatik.events',
    institution_name: 'Gatik Academy',
    is_demo: true,
    created_at: '2025-10-31T08:00:00+05:30',
  },
];

// Map role to profile ID for quick lookup
export const DEMO_ROLE_PROFILE_IDS: Record<UserRole, string> = {
  participant: 'a1b2c3d4-0001-4000-8000-000000000001',
  volunteer: 'a1b2c3d4-0002-4000-8000-000000000002',
  coordinator: 'a1b2c3d4-0003-4000-8000-000000000003',
  principal: 'a1b2c3d4-0004-4000-8000-000000000004',
};

// =============================================================================
// DEMO EVENT
// =============================================================================
export const DEMO_EVENT: GEvent = {
  id: 'e1e2e3e4-0001-4000-8000-000000000001',
  slug: 'gatik-xplorer-hackathon',
  name: 'Gatik Xplorer Hackathon',
  description:
    'A campus innovation hackathon where student teams design and build a Campus Activity Platform. Two days of coding, workshops, mentoring, and presentations.',
  event_type: 'hackathon',
  starts_at: '2025-10-31T08:30:00+05:30',
  ends_at: '2025-11-01T15:00:00+05:30',
  timezone: 'Asia/Kolkata',
  status: 'active',
  created_by: 'a1b2c3d4-0004-4000-8000-000000000004',
  created_at: '2025-10-31T08:00:00+05:30',
  updated_at: '2025-10-31T08:00:00+05:30',
};

// =============================================================================
// DEMO MEMBERS
// =============================================================================
export const DEMO_MEMBERS: EventMember[] = [
  {
    id: 'm1m2m3m4-0001-4000-8000-000000000001',
    event_id: 'e1e2e3e4-0001-4000-8000-000000000001',
    user_id: 'a1b2c3d4-0001-4000-8000-000000000001',
    role: 'participant',
    display_name: 'Aarav Sharma',
    is_demo: true,
    created_at: '2025-10-31T08:00:00+05:30',
  },
  {
    id: 'm1m2m3m4-0002-4000-8000-000000000002',
    event_id: 'e1e2e3e4-0001-4000-8000-000000000001',
    user_id: 'a1b2c3d4-0002-4000-8000-000000000002',
    role: 'volunteer',
    display_name: 'Priya Patel',
    responsibilities:
      'Technical support desk, helping participants with setup and tooling issues',
    is_demo: true,
    created_at: '2025-10-31T08:00:00+05:30',
  },
  {
    id: 'm1m2m3m4-0003-4000-8000-000000000003',
    event_id: 'e1e2e3e4-0001-4000-8000-000000000001',
    user_id: 'a1b2c3d4-0003-4000-8000-000000000003',
    role: 'coordinator',
    display_name: 'Rahul Verma',
    responsibilities:
      'Overall event coordination, volunteer management, logistics',
    is_demo: true,
    created_at: '2025-10-31T08:00:00+05:30',
  },
  {
    id: 'm1m2m3m4-0004-4000-8000-000000000004',
    event_id: 'e1e2e3e4-0001-4000-8000-000000000001',
    user_id: 'a1b2c3d4-0004-4000-8000-000000000004',
    role: 'principal',
    display_name: 'Dr. Sunita Iyer',
    responsibilities: 'Event administrator and principal oversight',
    is_demo: true,
    created_at: '2025-10-31T08:00:00+05:30',
  },
  {
    id: 'm1m2m3m4-0005-4000-8000-000000000005',
    event_id: 'e1e2e3e4-0001-4000-8000-000000000001',
    user_id: 'a1b2c3d4-0005-4000-8000-000000000005',
    role: 'participant',
    display_name: 'Meera Joshi',
    is_demo: true,
    created_at: '2025-10-31T08:00:00+05:30',
  },
  {
    id: 'm1m2m3m4-0006-4000-8000-000000000006',
    event_id: 'e1e2e3e4-0001-4000-8000-000000000001',
    user_id: 'a1b2c3d4-0006-4000-8000-000000000006',
    role: 'participant',
    display_name: 'Karan Singh',
    is_demo: true,
    created_at: '2025-10-31T08:00:00+05:30',
  },
  {
    id: 'm1m2m3m4-0007-4000-8000-000000000007',
    event_id: 'e1e2e3e4-0001-4000-8000-000000000001',
    user_id: 'a1b2c3d4-0007-4000-8000-000000000007',
    role: 'participant',
    display_name: 'Ananya Gupta',
    is_demo: true,
    created_at: '2025-10-31T08:00:00+05:30',
  },
];

// =============================================================================
// DEMO SCHEDULE
// =============================================================================
export const DEMO_SCHEDULE: ScheduleItem[] = [
  // Day 1 — 31 October (14 items)
  {
    id: 's1s2s3s4-0001-4000-8000-000000000001',
    event_id: 'e1e2e3e4-0001-4000-8000-000000000001',
    day_label: 'Day 1 — 31 October',
    title: 'Reporting time for students',
    time_label: '8:30–8:45 AM',
    is_break: false,
    display_order: 1,
    created_at: '2025-10-31T08:00:00+05:30',
  },
  {
    id: 's1s2s3s4-0002-4000-8000-000000000002',
    event_id: 'e1e2e3e4-0001-4000-8000-000000000001',
    day_label: 'Day 1 — 31 October',
    title: 'Registration and escorting to the room',
    time_label: '9:00–9:30 AM',
    is_break: false,
    display_order: 2,
    created_at: '2025-10-31T08:00:00+05:30',
  },
  {
    id: 's1s2s3s4-0003-4000-8000-000000000003',
    event_id: 'e1e2e3e4-0001-4000-8000-000000000001',
    day_label: 'Day 1 — 31 October',
    title: 'Guest arrival',
    time_label: '9:30 AM',
    is_break: false,
    display_order: 3,
    created_at: '2025-10-31T08:00:00+05:30',
  },
  {
    id: 's1s2s3s4-0004-4000-8000-000000000004',
    event_id: 'e1e2e3e4-0001-4000-8000-000000000001',
    day_label: 'Day 1 — 31 October',
    title: 'Ceremony starts',
    time_label: '9:50 AM',
    is_break: false,
    display_order: 4,
    created_at: '2025-10-31T08:00:00+05:30',
  },
  {
    id: 's1s2s3s4-0005-4000-8000-000000000005',
    event_id: 'e1e2e3e4-0001-4000-8000-000000000001',
    day_label: 'Day 1 — 31 October',
    title: 'Break for 15 minutes',
    time_label: '10:30 AM',
    is_break: true,
    display_order: 5,
    created_at: '2025-10-31T08:00:00+05:30',
  },
  {
    id: 's1s2s3s4-0006-4000-8000-000000000006',
    event_id: 'e1e2e3e4-0001-4000-8000-000000000001',
    day_label: 'Day 1 — 31 October',
    title: 'Workshop',
    time_label: '10:45–11:45 AM',
    is_break: false,
    display_order: 6,
    created_at: '2025-10-31T08:00:00+05:30',
  },
  {
    id: 's1s2s3s4-0007-4000-8000-000000000007',
    event_id: 'e1e2e3e4-0001-4000-8000-000000000001',
    day_label: 'Day 1 — 31 October',
    title: 'Coding begins',
    time_label: '11:45 AM',
    is_break: false,
    display_order: 7,
    created_at: '2025-10-31T08:00:00+05:30',
  },
  {
    id: 's1s2s3s4-0008-4000-8000-000000000008',
    event_id: 'e1e2e3e4-0001-4000-8000-000000000001',
    day_label: 'Day 1 — 31 October',
    title: 'Lunch break (45 minutes)',
    time_label: '1:15–2:00 PM',
    is_break: true,
    display_order: 8,
    created_at: '2025-10-31T08:00:00+05:30',
  },
  {
    id: 's1s2s3s4-0009-4000-8000-000000000009',
    event_id: 'e1e2e3e4-0001-4000-8000-000000000001',
    day_label: 'Day 1 — 31 October',
    title: 'Coding continues',
    time_label: '2:00–3:00 PM',
    is_break: false,
    display_order: 9,
    created_at: '2025-10-31T08:00:00+05:30',
  },
  {
    id: 's1s2s3s4-0010-4000-8000-000000000010',
    event_id: 'e1e2e3e4-0001-4000-8000-000000000001',
    day_label: 'Day 1 — 31 October',
    title: 'Break for 20 minutes',
    time_label: '3:00–3:20 PM',
    is_break: true,
    display_order: 10,
    created_at: '2025-10-31T08:00:00+05:30',
  },
  {
    id: 's1s2s3s4-0011-4000-8000-000000000011',
    event_id: 'e1e2e3e4-0001-4000-8000-000000000001',
    day_label: 'Day 1 — 31 October',
    title: 'Coding continues',
    time_label: '3:20–6:30 PM',
    is_break: false,
    display_order: 11,
    created_at: '2025-10-31T08:00:00+05:30',
  },
  {
    id: 's1s2s3s4-0012-4000-8000-000000000012',
    event_id: 'e1e2e3e4-0001-4000-8000-000000000001',
    day_label: 'Day 1 — 31 October',
    title: 'Dinner break, band and flashmob',
    time_label: '6:30–8:30 PM',
    is_break: true,
    display_order: 12,
    created_at: '2025-10-31T08:00:00+05:30',
  },
  {
    id: 's1s2s3s4-0013-4000-8000-000000000013',
    event_id: 'e1e2e3e4-0001-4000-8000-000000000001',
    day_label: 'Day 1 — 31 October',
    title: 'Rooms with beds and materials for rest',
    time_label: 'Night',
    is_break: true,
    display_order: 13,
    created_at: '2025-10-31T08:00:00+05:30',
  },
  {
    id: 's1s2s3s4-0014-4000-8000-000000000014',
    event_id: 'e1e2e3e4-0001-4000-8000-000000000001',
    day_label: 'Day 1 — 31 October',
    title: 'Midnight snacks, tea, and coffee provided',
    time_label: 'Around 2:30–3:00 AM',
    is_break: true,
    display_order: 14,
    created_at: '2025-10-31T08:00:00+05:30',
  },

  // Day 2 — 1 November (8 items)
  {
    id: 's1s2s3s4-0015-4000-8000-000000000015',
    event_id: 'e1e2e3e4-0001-4000-8000-000000000001',
    day_label: 'Day 2 — 1 November',
    title: 'Breakfast',
    time_label: '7:30–8:00 AM',
    is_break: true,
    display_order: 15,
    created_at: '2025-10-31T08:00:00+05:30',
  },
  {
    id: 's1s2s3s4-0016-4000-8000-000000000016',
    event_id: 'e1e2e3e4-0001-4000-8000-000000000001',
    day_label: 'Day 2 — 1 November',
    title: 'Presentation should be ready',
    time_label: '8:00–9:30 AM',
    is_break: false,
    display_order: 16,
    created_at: '2025-10-31T08:00:00+05:30',
  },
  {
    id: 's1s2s3s4-0017-4000-8000-000000000017',
    event_id: 'e1e2e3e4-0001-4000-8000-000000000001',
    day_label: 'Day 2 — 1 November',
    title: 'Ceremony and guest addressing',
    time_label: '9:30–10:00 AM',
    is_break: false,
    display_order: 17,
    created_at: '2025-10-31T08:00:00+05:30',
  },
  {
    id: 's1s2s3s4-0018-4000-8000-000000000018',
    event_id: 'e1e2e3e4-0001-4000-8000-000000000001',
    day_label: 'Day 2 — 1 November',
    title: 'Participants should be at the auditorium with their presentation',
    time_label: '10:00 AM',
    is_break: false,
    display_order: 18,
    created_at: '2025-10-31T08:00:00+05:30',
  },
  {
    id: 's1s2s3s4-0019-4000-8000-000000000019',
    event_id: 'e1e2e3e4-0001-4000-8000-000000000001',
    day_label: 'Day 2 — 1 November',
    title: 'Addressing judges and judging starts',
    time_label: '10:30 AM',
    is_break: false,
    display_order: 19,
    created_at: '2025-10-31T08:00:00+05:30',
  },
  {
    id: 's1s2s3s4-0020-4000-8000-000000000020',
    event_id: 'e1e2e3e4-0001-4000-8000-000000000001',
    day_label: 'Day 2 — 1 November',
    title: 'Snacks will be provided',
    time_label: 'During judging (approximately 2–3 hours)',
    is_break: true,
    display_order: 20,
    created_at: '2025-10-31T08:00:00+05:30',
  },
  {
    id: 's1s2s3s4-0021-4000-8000-000000000021',
    event_id: 'e1e2e3e4-0001-4000-8000-000000000001',
    day_label: 'Day 2 — 1 November',
    title: 'Closing ceremony',
    time_label: '12:30 PM',
    is_break: false,
    display_order: 21,
    created_at: '2025-10-31T08:00:00+05:30',
  },
  {
    id: 's1s2s3s4-0022-4000-8000-000000000022',
    event_id: 'e1e2e3e4-0001-4000-8000-000000000001',
    day_label: 'Day 2 — 1 November',
    title: 'Felicitation and award ceremony; closure and dispersal after lunch',
    time_label: 'After closing ceremony',
    is_break: false,
    display_order: 22,
    created_at: '2025-10-31T08:00:00+05:30',
  },
];

// =============================================================================
// DEMO TICKETS
// =============================================================================
export const DEMO_TICKETS: Ticket[] = [
  {
    id: 't1t2t3t4-0001-4000-8000-000000000001',
    event_id: 'e1e2e3e4-0001-4000-8000-000000000001',
    created_by: 'a1b2c3d4-0001-4000-8000-000000000001',
    creator_role: 'participant',
    category: 'Participant Help',
    subject: 'Need help with project setup',
    description:
      'I am unable to install the required Node.js dependencies. The npm install command is failing with permission errors on my laptop.',
    assigned_to: 'a1b2c3d4-0002-4000-8000-000000000002',
    assigned_role: 'volunteer',
    status: 'In Progress',
    created_at: '2025-10-31T09:15:00+05:30',
    updated_at: '2025-10-31T09:30:00+05:30',
    creator_name: 'Aarav Sharma',
    assignee_name: 'Priya Patel',
  },
  {
    id: 't1t2t3t4-0002-4000-8000-000000000002',
    event_id: 'e1e2e3e4-0001-4000-8000-000000000001',
    created_by: 'a1b2c3d4-0002-4000-8000-000000000002',
    creator_role: 'volunteer',
    category: 'Additional Volunteers',
    subject: 'Need extra volunteer for Hall B',
    description:
      'Hall B has more participants than expected. We need one more volunteer to help with technical setup assistance.',
    assigned_to: 'a1b2c3d4-0003-4000-8000-000000000003',
    assigned_role: 'coordinator',
    status: 'Acknowledged',
    created_at: '2025-10-31T10:00:00+05:30',
    updated_at: '2025-10-31T10:15:00+05:30',
    creator_name: 'Priya Patel',
    assignee_name: 'Rahul Verma',
  },
  {
    id: 't1t2t3t4-0003-4000-8000-000000000003',
    event_id: 'e1e2e3e4-0001-4000-8000-000000000001',
    created_by: 'a1b2c3d4-0003-4000-8000-000000000003',
    creator_role: 'coordinator',
    category: 'Resources / Materials',
    subject: 'Additional extension boards needed',
    description:
      'Multiple teams have reported shortage of power outlets. We need at least 5 additional extension boards for the coding hall.',
    assigned_to: 'a1b2c3d4-0004-4000-8000-000000000004',
    assigned_role: 'principal',
    status: 'Escalated',
    created_at: '2025-10-31T11:00:00+05:30',
    updated_at: '2025-10-31T11:20:00+05:30',
    creator_name: 'Rahul Verma',
    assignee_name: 'Dr. Sunita Iyer',
  },
  {
    id: 't1t2t3t4-0004-4000-8000-000000000004',
    event_id: 'e1e2e3e4-0001-4000-8000-000000000001',
    created_by: 'a1b2c3d4-0005-4000-8000-000000000005',
    creator_role: 'participant',
    category: 'Venue / Schedule Issue',
    subject: 'Wi-Fi connectivity issue in Room 204',
    description:
      'Our team in Room 204 is experiencing intermittent Wi-Fi drops. We cannot push code to our repository.',
    assigned_to: 'a1b2c3d4-0002-4000-8000-000000000002',
    assigned_role: 'volunteer',
    status: 'Resolved',
    resolution_note: 'IT team has reset the access point. Connectivity restored.',
    created_at: '2025-10-31T11:30:00+05:30',
    updated_at: '2025-10-31T12:05:00+05:30',
    creator_name: 'Meera Joshi',
    assignee_name: 'Priya Patel',
  },
];

// =============================================================================
// DEMO TICKET UPDATES (AUDIT TRAIL)
// =============================================================================
export const DEMO_TICKET_UPDATES: TicketUpdate[] = [
  {
    id: 'u1u2u3u4-0001-4000-8000-000000000001',
    ticket_id: 't1t2t3t4-0001-4000-8000-000000000001',
    actor_id: 'a1b2c3d4-0002-4000-8000-000000000002',
    old_status: 'Open',
    new_status: 'Acknowledged',
    note: 'I will come to your desk to help.',
    created_at: '2025-10-31T09:20:00+05:30',
    actor_name: 'Priya Patel',
  },
  {
    id: 'u1u2u3u4-0002-4000-8000-000000000002',
    ticket_id: 't1t2t3t4-0001-4000-8000-000000000001',
    actor_id: 'a1b2c3d4-0002-4000-8000-000000000002',
    old_status: 'Acknowledged',
    new_status: 'In Progress',
    note: 'Working on fixing the npm permissions issue.',
    created_at: '2025-10-31T09:30:00+05:30',
    actor_name: 'Priya Patel',
  },
  {
    id: 'u1u2u3u4-0003-4000-8000-000000000003',
    ticket_id: 't1t2t3t4-0002-4000-8000-000000000002',
    actor_id: 'a1b2c3d4-0003-4000-8000-000000000003',
    old_status: 'Open',
    new_status: 'Acknowledged',
    note: 'Noted. Will check volunteer availability.',
    created_at: '2025-10-31T10:15:00+05:30',
    actor_name: 'Rahul Verma',
  },
  {
    id: 'u1u2u3u4-0004-4000-8000-000000000004',
    ticket_id: 't1t2t3t4-0003-4000-8000-000000000003',
    actor_id: 'a1b2c3d4-0003-4000-8000-000000000003',
    old_status: 'Open',
    new_status: 'Escalated',
    note: 'Escalating to principal for resource procurement approval.',
    created_at: '2025-10-31T11:20:00+05:30',
    actor_name: 'Rahul Verma',
  },
  {
    id: 'u1u2u3u4-0005-4000-8000-000000000005',
    ticket_id: 't1t2t3t4-0004-4000-8000-000000000004',
    actor_id: 'a1b2c3d4-0002-4000-8000-000000000002',
    old_status: 'Open',
    new_status: 'Acknowledged',
    note: 'Checking with IT support.',
    created_at: '2025-10-31T11:35:00+05:30',
    actor_name: 'Priya Patel',
  },
  {
    id: 'u1u2u3u4-0006-4000-8000-000000000006',
    ticket_id: 't1t2t3t4-0004-4000-8000-000000000004',
    actor_id: 'a1b2c3d4-0002-4000-8000-000000000002',
    old_status: 'Acknowledged',
    new_status: 'In Progress',
    note: 'IT team is resetting the access point.',
    created_at: '2025-10-31T11:45:00+05:30',
    actor_name: 'Priya Patel',
  },
  {
    id: 'u1u2u3u4-0007-4000-8000-000000000007',
    ticket_id: 't1t2t3t4-0004-4000-8000-000000000004',
    actor_id: 'a1b2c3d4-0002-4000-8000-000000000002',
    old_status: 'In Progress',
    new_status: 'Resolved',
    note: 'IT team has reset the access point. Connectivity restored.',
    created_at: '2025-10-31T12:05:00+05:30',
    actor_name: 'Priya Patel',
  },
];

// =============================================================================
// CHALLENGE STATEMENT TEXT
// =============================================================================
export const CHALLENGE_STATEMENT_TEXT = `## Hackathon Challenge: Campus Activity Platform

### The Challenge

Schools and colleges regularly organize activities such as sports events, cultural programs, science exhibitions, environmental drives, workshops, competitions, and student-club activities. These activities bring students and staff together, but coordinating them requires more than simply announcing an event.

Organizers must plan activities, publish schedules, inform and register participants, allocate venues, form teams or groups, arrange equipment and materials, and keep everyone updated.

Consider a school organizing its Annual Sports Day. Multiple sports may take place at different times and locations. Students need to register for activities, teachers need to coordinate them, equipment must be arranged, venues must be allocated, and participants need to know where and when they are expected.

Today, this information is often scattered across notice boards, messaging apps, spreadsheets, forms, and conversations. This can make coordination difficult for students, staff, and organizers.

### Your Challenge

Design and build an extensible digital platform that helps schools and colleges organize activities and programs by bringing students, staff, volunteers, and activity coordinators together in one place.

Consider activities such as:
- Sports days
- Science exhibitions
- Cultural festivals
- Environmental drives
- Workshops
- Inter-school competitions
- Student-club activities

Each activity may have its own schedule, locations, participants, teams, materials, equipment, and coordination requirements.

**You decide how the platform should solve this problem.**

Understanding users, defining their journeys, designing the experience, creating the underlying data model, selecting appropriate technology, and designing the solution are all part of the challenge.

### Minimum Expected Outcome

Your team should deliver a working **Minimum Viable Product (MVP)**: the simplest working version of the application that demonstrates the main idea and essential features, without needing to implement every possible future feature.

If the complete application cannot be implemented, a well-designed UI mock-up or interactive prototype is acceptable, provided it clearly demonstrates how users would use the proposed application.

At minimum, demonstrate an end-to-end scenario in which:

1. An activity or program can be created and published.
2. Students and/or staff can discover activities and register or participate.
3. Important details such as schedule, location, participants, and basic activity requirements can be managed.
4. The organizer can coordinate and track the activity through completion.
5. The solution is demonstrated using a realistic school or college scenario.

You are not expected to build every possible feature. **Smart prioritization is important.**

### Think Beyond the MVP

During the final presentation, explain:
- What you included in the MVP and why.
- What you deliberately left for later.
- How the solution can support different types of activities and future requirements.
- Your vision and roadmap for evolving the solution.`;

export const DEMO_CHALLENGE: ChallengeContent = {
  id: 'c1c2c3c4-0001-4000-8000-000000000001',
  event_id: 'e1e2e3e4-0001-4000-8000-000000000001',
  title: 'Campus Activity Platform',
  body: CHALLENGE_STATEMENT_TEXT,
  updated_at: '2025-10-31T08:30:00+05:30',
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Returns the demo profile corresponding to the given role.
 */
export function getDemoProfile(role: UserRole): Profile {
  const profileId = DEMO_ROLE_PROFILE_IDS[role];
  const profile = DEMO_PROFILES.find((p) => p.id === profileId);
  if (!profile) {
    throw new Error(`No demo profile found for role: ${role}`);
  }
  return profile;
}

/**
 * Returns a complete demo session object for the specified role.
 */
export function getDemoSession(role: UserRole): DemoSession {
  const profile = getDemoProfile(role);
  const membership = DEMO_MEMBERS.find(
    (m) => m.role === role && m.user_id === profile.id
  );
  if (!membership) {
    throw new Error(`No demo membership found for role: ${role}`);
  }

  return {
    userId: profile.id,
    role,
    profile,
    eventId: DEMO_EVENT.id,
    membership,
  };
}

/**
 * Returns tickets visible to or manageable by a user with a given role.
 */
export function getTicketsForRole(role: UserRole, userId: string): Ticket[] {
  switch (role) {
    case 'participant':
      return DEMO_TICKETS.filter((t) => t.created_by === userId);
    case 'volunteer':
      // Volunteers see tickets assigned to them, created by them, or unassigned participant help tickets
      return DEMO_TICKETS.filter(
        (t) =>
          t.assigned_to === userId ||
          t.created_by === userId ||
          (!t.assigned_to && t.category === 'Participant Help')
      );
    case 'coordinator':
    case 'principal':
      // Coordinators and principals oversee all tickets in the event
      return DEMO_TICKETS;
    default:
      return [];
  }
}

/**
 * Returns audit trail updates for a given ticket ID.
 */
export function getTicketUpdates(ticketId: string): TicketUpdate[] {
  return DEMO_TICKET_UPDATES.filter((u) => u.ticket_id === ticketId);
}

/**
 * Returns all event members with the volunteer role.
 */
export function getAllVolunteers(): EventMember[] {
  return DEMO_MEMBERS.filter((m) => m.role === 'volunteer');
}

/**
 * Returns all event members.
 */
export function getAllMembers(): EventMember[] {
  return DEMO_MEMBERS;
}
