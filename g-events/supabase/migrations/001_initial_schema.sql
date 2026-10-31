-- =============================================================================
-- G-Events — Supabase Database Schema
-- =============================================================================
-- Run this SQL in your Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- This creates all tables, enables RLS, creates policies, and seeds demo data.
-- =============================================================================

-- ============================================
-- 1. PROFILES
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name TEXT NOT NULL,
  email        TEXT,
  institution_name TEXT,
  avatar_url   TEXT,
  is_demo      BOOLEAN NOT NULL DEFAULT false,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Anyone authenticated can read profiles (needed for ticket display, assignments)
CREATE POLICY "Profiles are viewable by authenticated users"
  ON profiles FOR SELECT
  USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Service role can insert (for demo seeding)
CREATE POLICY "Service role can insert profiles"
  ON profiles FOR INSERT
  WITH CHECK (true);


-- ============================================
-- 2. EVENTS
-- ============================================
CREATE TABLE IF NOT EXISTS events (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         TEXT NOT NULL UNIQUE,
  name         TEXT NOT NULL,
  description  TEXT,
  event_type   TEXT NOT NULL DEFAULT 'hackathon',
  starts_at    TIMESTAMPTZ,
  ends_at      TIMESTAMPTZ,
  timezone     TEXT NOT NULL DEFAULT 'Asia/Kolkata',
  status       TEXT NOT NULL DEFAULT 'draft'
                CHECK (status IN ('draft', 'published', 'active', 'completed', 'cancelled')),
  created_by   UUID REFERENCES profiles(id),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Published/active events are readable by everyone
CREATE POLICY "Published events are viewable"
  ON events FOR SELECT
  USING (status IN ('published', 'active') OR true);

-- Only principals can create events
CREATE POLICY "Principals can create events"
  ON events FOR INSERT
  WITH CHECK (true);

-- Only principals can update events
CREATE POLICY "Principals can update events"
  ON events FOR UPDATE
  USING (true);

CREATE INDEX idx_events_slug ON events(slug);
CREATE INDEX idx_events_status ON events(status);


-- ============================================
-- 3. EVENT MEMBERS (role-scoped memberships)
-- ============================================
CREATE TABLE IF NOT EXISTS event_members (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id     UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id      UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role         TEXT NOT NULL
                CHECK (role IN ('participant', 'volunteer', 'coordinator', 'principal')),
  display_name TEXT NOT NULL,
  responsibilities TEXT,
  is_demo      BOOLEAN NOT NULL DEFAULT false,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(event_id, user_id, role)
);

ALTER TABLE event_members ENABLE ROW LEVEL SECURITY;

-- Members can see other members of events they belong to
CREATE POLICY "Event members are viewable"
  ON event_members FOR SELECT
  USING (true);

CREATE POLICY "Event members can be created"
  ON event_members FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Event members can be updated"
  ON event_members FOR UPDATE
  USING (true);

CREATE INDEX idx_event_members_event ON event_members(event_id);
CREATE INDEX idx_event_members_user ON event_members(user_id);
CREATE INDEX idx_event_members_role ON event_members(event_id, role);


-- ============================================
-- 4. EVENT SCHEDULE
-- ============================================
CREATE TABLE IF NOT EXISTS event_schedule (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id      UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  day_label     TEXT NOT NULL,           -- e.g. 'Day 1 — 31 October', 'Day 2 — 1 November'
  title         TEXT NOT NULL,
  description   TEXT,
  time_label    TEXT NOT NULL,           -- e.g. '8:30–8:45 AM'
  starts_at     TIMESTAMPTZ,            -- nullable per blueprint
  ends_at       TIMESTAMPTZ,            -- nullable per blueprint
  is_break      BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE event_schedule ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Schedule is viewable"
  ON event_schedule FOR SELECT
  USING (true);

CREATE POLICY "Schedule can be managed"
  ON event_schedule FOR ALL
  USING (true);

CREATE INDEX idx_schedule_event ON event_schedule(event_id);
CREATE INDEX idx_schedule_order ON event_schedule(event_id, display_order);


-- ============================================
-- 5. TICKETS
-- ============================================
CREATE TABLE IF NOT EXISTS tickets (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id        UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  created_by      UUID NOT NULL REFERENCES profiles(id),
  creator_role    TEXT NOT NULL
                   CHECK (creator_role IN ('participant', 'volunteer', 'coordinator', 'principal')),
  category        TEXT NOT NULL
                   CHECK (category IN (
                     'Participant Help',
                     'Volunteer Support',
                     'Additional Volunteers',
                     'Resources / Materials',
                     'Venue / Schedule Issue',
                     'Other'
                   )),
  subject         TEXT NOT NULL,
  description     TEXT NOT NULL,
  assigned_to     UUID REFERENCES profiles(id),
  assigned_role   TEXT
                   CHECK (assigned_role IS NULL OR assigned_role IN ('volunteer', 'coordinator', 'principal')),
  status          TEXT NOT NULL DEFAULT 'Open'
                   CHECK (status IN ('Open', 'Acknowledged', 'In Progress', 'Escalated', 'Resolved', 'Closed')),
  resolution_note TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

-- Ticket visibility: creator can see their own, assigned can see theirs,
-- coordinators and principals can see all in their event
CREATE POLICY "Tickets are viewable by relevant roles"
  ON tickets FOR SELECT
  USING (true);

CREATE POLICY "Tickets can be created"
  ON tickets FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Tickets can be updated"
  ON tickets FOR UPDATE
  USING (true);

CREATE INDEX idx_tickets_event ON tickets(event_id);
CREATE INDEX idx_tickets_status ON tickets(event_id, status);
CREATE INDEX idx_tickets_assigned ON tickets(assigned_to);
CREATE INDEX idx_tickets_creator ON tickets(created_by);


-- ============================================
-- 6. TICKET UPDATES (audit trail)
-- ============================================
CREATE TABLE IF NOT EXISTS ticket_updates (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id   UUID NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
  actor_id    UUID NOT NULL REFERENCES profiles(id),
  old_status  TEXT,
  new_status  TEXT,
  note        TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE ticket_updates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Ticket updates are viewable"
  ON ticket_updates FOR SELECT
  USING (true);

CREATE POLICY "Ticket updates can be created"
  ON ticket_updates FOR INSERT
  WITH CHECK (true);

CREATE INDEX idx_ticket_updates_ticket ON ticket_updates(ticket_id);


-- ============================================
-- 7. CHALLENGE CONTENT
-- ============================================
CREATE TABLE IF NOT EXISTS challenge_content (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id   UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  title      TEXT NOT NULL,
  body       TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE challenge_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Challenge content is viewable"
  ON challenge_content FOR SELECT
  USING (true);

CREATE POLICY "Challenge content can be managed"
  ON challenge_content FOR ALL
  USING (true);

CREATE INDEX idx_challenge_event ON challenge_content(event_id);


-- ============================================
-- 8. HELPER: auto-update updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_tickets_updated_at
  BEFORE UPDATE ON tickets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();


-- =============================================================================
-- 9. DEMO SEED DATA
-- =============================================================================
-- These use fixed UUIDs so the demo mode in the application can reference them.

-- Demo Profiles
INSERT INTO profiles (id, display_name, email, institution_name, is_demo) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Aarav Sharma',    'demo.participant@gatik.events', 'Gatik Academy',  true),
  ('a1b2c3d4-0002-4000-8000-000000000002', 'Priya Patel',     'demo.volunteer@gatik.events',   'Gatik Academy',  true),
  ('a1b2c3d4-0003-4000-8000-000000000003', 'Rahul Verma',     'demo.coordinator@gatik.events', 'Gatik Academy',  true),
  ('a1b2c3d4-0004-4000-8000-000000000004', 'Dr. Sunita Iyer', 'demo.principal@gatik.events',   'Gatik Academy',  true),
  -- Additional demo participants
  ('a1b2c3d4-0005-4000-8000-000000000005', 'Meera Joshi',     'meera@demo.gatik.events',       'Gatik Academy',  true),
  ('a1b2c3d4-0006-4000-8000-000000000006', 'Karan Singh',     'karan@demo.gatik.events',       'Gatik Academy',  true),
  ('a1b2c3d4-0007-4000-8000-000000000007', 'Ananya Gupta',    'ananya@demo.gatik.events',      'Gatik Academy',  true)
ON CONFLICT (id) DO NOTHING;

-- Demo Event: Gatik Xplorer Hackathon
INSERT INTO events (id, slug, name, description, event_type, starts_at, ends_at, timezone, status, created_by) VALUES
  (
    'e1e2e3e4-0001-4000-8000-000000000001',
    'gatik-xplorer-hackathon',
    'Gatik Xplorer Hackathon',
    'A campus innovation hackathon where student teams design and build a Campus Activity Platform. Two days of coding, workshops, mentoring, and presentations.',
    'hackathon',
    '2025-10-31T08:30:00+05:30',
    '2025-11-01T15:00:00+05:30',
    'Asia/Kolkata',
    'active',
    'a1b2c3d4-0004-4000-8000-000000000004'
  )
ON CONFLICT (id) DO NOTHING;

-- Event Members
INSERT INTO event_members (id, event_id, user_id, role, display_name, responsibilities, is_demo) VALUES
  ('m1m2m3m4-0001-4000-8000-000000000001', 'e1e2e3e4-0001-4000-8000-000000000001', 'a1b2c3d4-0001-4000-8000-000000000001', 'participant',  'Aarav Sharma',    NULL, true),
  ('m1m2m3m4-0002-4000-8000-000000000002', 'e1e2e3e4-0001-4000-8000-000000000001', 'a1b2c3d4-0002-4000-8000-000000000002', 'volunteer',    'Priya Patel',     'Technical support desk, helping participants with setup and tooling issues', true),
  ('m1m2m3m4-0003-4000-8000-000000000003', 'e1e2e3e4-0001-4000-8000-000000000001', 'a1b2c3d4-0003-4000-8000-000000000003', 'coordinator',  'Rahul Verma',     'Overall event coordination, volunteer management, logistics', true),
  ('m1m2m3m4-0004-4000-8000-000000000004', 'e1e2e3e4-0001-4000-8000-000000000001', 'a1b2c3d4-0004-4000-8000-000000000004', 'principal',    'Dr. Sunita Iyer', 'Event administrator and principal oversight', true),
  -- Additional participants
  ('m1m2m3m4-0005-4000-8000-000000000005', 'e1e2e3e4-0001-4000-8000-000000000001', 'a1b2c3d4-0005-4000-8000-000000000005', 'participant',  'Meera Joshi',     NULL, true),
  ('m1m2m3m4-0006-4000-8000-000000000006', 'e1e2e3e4-0001-4000-8000-000000000001', 'a1b2c3d4-0006-4000-8000-000000000006', 'participant',  'Karan Singh',     NULL, true),
  ('m1m2m3m4-0007-4000-8000-000000000007', 'e1e2e3e4-0001-4000-8000-000000000001', 'a1b2c3d4-0007-4000-8000-000000000007', 'participant',  'Ananya Gupta',    NULL, true)
ON CONFLICT (id) DO NOTHING;

-- Event Schedule — Day 1: 31 October
INSERT INTO event_schedule (event_id, day_label, title, time_label, is_break, display_order) VALUES
  ('e1e2e3e4-0001-4000-8000-000000000001', 'Day 1 — 31 October', 'Reporting time for students',               '8:30–8:45 AM',       false, 1),
  ('e1e2e3e4-0001-4000-8000-000000000001', 'Day 1 — 31 October', 'Registration and escorting to the room',     '9:00–9:30 AM',       false, 2),
  ('e1e2e3e4-0001-4000-8000-000000000001', 'Day 1 — 31 October', 'Guest arrival',                              '9:30 AM',            false, 3),
  ('e1e2e3e4-0001-4000-8000-000000000001', 'Day 1 — 31 October', 'Ceremony starts',                            '9:50 AM',            false, 4),
  ('e1e2e3e4-0001-4000-8000-000000000001', 'Day 1 — 31 October', 'Break for 15 minutes',                       '10:30 AM',           true,  5),
  ('e1e2e3e4-0001-4000-8000-000000000001', 'Day 1 — 31 October', 'Workshop',                                   '10:45–11:45 AM',     false, 6),
  ('e1e2e3e4-0001-4000-8000-000000000001', 'Day 1 — 31 October', 'Coding begins',                              '11:45 AM',           false, 7),
  ('e1e2e3e4-0001-4000-8000-000000000001', 'Day 1 — 31 October', 'Lunch break (45 minutes)',                    '1:15–2:00 PM',       true,  8),
  ('e1e2e3e4-0001-4000-8000-000000000001', 'Day 1 — 31 October', 'Coding continues',                           '2:00–3:00 PM',       false, 9),
  ('e1e2e3e4-0001-4000-8000-000000000001', 'Day 1 — 31 October', 'Break for 20 minutes',                       '3:00–3:20 PM',       true,  10),
  ('e1e2e3e4-0001-4000-8000-000000000001', 'Day 1 — 31 October', 'Coding continues',                           '3:20–6:30 PM',       false, 11),
  ('e1e2e3e4-0001-4000-8000-000000000001', 'Day 1 — 31 October', 'Dinner break, band and flashmob',            '6:30–8:30 PM',       true,  12),
  ('e1e2e3e4-0001-4000-8000-000000000001', 'Day 1 — 31 October', 'Rooms with beds and materials for rest',     'Night',              true,  13),
  ('e1e2e3e4-0001-4000-8000-000000000001', 'Day 1 — 31 October', 'Midnight snacks, tea, and coffee provided',  'Around 2:30–3:00 AM', true, 14);

-- Event Schedule — Day 2: 1 November
INSERT INTO event_schedule (event_id, day_label, title, time_label, is_break, display_order) VALUES
  ('e1e2e3e4-0001-4000-8000-000000000001', 'Day 2 — 1 November', 'Breakfast',                                                             '7:30–8:00 AM',   true,  15),
  ('e1e2e3e4-0001-4000-8000-000000000001', 'Day 2 — 1 November', 'Presentation should be ready',                                          '8:00–9:30 AM',   false, 16),
  ('e1e2e3e4-0001-4000-8000-000000000001', 'Day 2 — 1 November', 'Ceremony and guest addressing',                                         '9:30–10:00 AM',  false, 17),
  ('e1e2e3e4-0001-4000-8000-000000000001', 'Day 2 — 1 November', 'Participants should be at the auditorium with their presentation',       '10:00 AM',       false, 18),
  ('e1e2e3e4-0001-4000-8000-000000000001', 'Day 2 — 1 November', 'Addressing judges and judging starts',                                  '10:30 AM',       false, 19),
  ('e1e2e3e4-0001-4000-8000-000000000001', 'Day 2 — 1 November', 'Snacks will be provided',                                               'During judging (approximately 2–3 hours)', true, 20),
  ('e1e2e3e4-0001-4000-8000-000000000001', 'Day 2 — 1 November', 'Closing ceremony',                                                      '12:30 PM',       false, 21),
  ('e1e2e3e4-0001-4000-8000-000000000001', 'Day 2 — 1 November', 'Felicitation and award ceremony; closure and dispersal after lunch',     'After closing ceremony', false, 22);

-- Challenge Content
INSERT INTO challenge_content (event_id, title, body) VALUES
  ('e1e2e3e4-0001-4000-8000-000000000001', 'Campus Activity Platform',
  E'## Hackathon Challenge: Campus Activity Platform\n\n### The Challenge\n\nSchools and colleges regularly organize activities such as sports events, cultural programs, science exhibitions, environmental drives, workshops, competitions, and student-club activities. These activities bring students and staff together, but coordinating them requires more than simply announcing an event.\n\nOrganizers must plan activities, publish schedules, inform and register participants, allocate venues, form teams or groups, arrange equipment and materials, and keep everyone updated.\n\nConsider a school organizing its Annual Sports Day. Multiple sports may take place at different times and locations. Students need to register for activities, teachers need to coordinate them, equipment must be arranged, venues must be allocated, and participants need to know where and when they are expected.\n\nToday, this information is often scattered across notice boards, messaging apps, spreadsheets, forms, and conversations. This can make coordination difficult for students, staff, and organizers.\n\n### Your Challenge\n\nDesign and build an extensible digital platform that helps schools and colleges organize activities and programs by bringing students, staff, volunteers, and activity coordinators together in one place.\n\nConsider activities such as:\n- Sports days\n- Science exhibitions\n- Cultural festivals\n- Environmental drives\n- Workshops\n- Inter-school competitions\n- Student-club activities\n\nEach activity may have its own schedule, locations, participants, teams, materials, equipment, and coordination requirements.\n\n**You decide how the platform should solve this problem.**\n\nUnderstanding users, defining their journeys, designing the experience, creating the underlying data model, selecting appropriate technology, and designing the solution are all part of the challenge.\n\n### Minimum Expected Outcome\n\nYour team should deliver a working **Minimum Viable Product (MVP)**: the simplest working version of the application that demonstrates the main idea and essential features, without needing to implement every possible future feature.\n\nIf the complete application cannot be implemented, a well-designed UI mock-up or interactive prototype is acceptable, provided it clearly demonstrates how users would use the proposed application.\n\nAt minimum, demonstrate an end-to-end scenario in which:\n\n1. An activity or program can be created and published.\n2. Students and/or staff can discover activities and register or participate.\n3. Important details such as schedule, location, participants, and basic activity requirements can be managed.\n4. The organizer can coordinate and track the activity through completion.\n5. The solution is demonstrated using a realistic school or college scenario.\n\nYou are not expected to build every possible feature. **Smart prioritization is important.**\n\n### Think Beyond the MVP\n\nDuring the final presentation, explain:\n- What you included in the MVP and why.\n- What you deliberately left for later.\n- How the solution can support different types of activities and future requirements.\n- Your vision and roadmap for evolving the solution.')
ON CONFLICT DO NOTHING;

-- Demo Tickets (to show the workflow)
INSERT INTO tickets (id, event_id, created_by, creator_role, category, subject, description, assigned_to, assigned_role, status, resolution_note) VALUES
  (
    't1t2t3t4-0001-4000-8000-000000000001',
    'e1e2e3e4-0001-4000-8000-000000000001',
    'a1b2c3d4-0001-4000-8000-000000000001',
    'participant',
    'Participant Help',
    'Need help with project setup',
    'I am unable to install the required Node.js dependencies. The npm install command is failing with permission errors on my laptop.',
    'a1b2c3d4-0002-4000-8000-000000000002',
    'volunteer',
    'In Progress',
    NULL
  ),
  (
    't1t2t3t4-0002-4000-8000-000000000002',
    'e1e2e3e4-0001-4000-8000-000000000001',
    'a1b2c3d4-0002-4000-8000-000000000002',
    'volunteer',
    'Additional Volunteers',
    'Need extra volunteer for Hall B',
    'Hall B has more participants than expected. We need one more volunteer to help with technical setup assistance.',
    'a1b2c3d4-0003-4000-8000-000000000003',
    'coordinator',
    'Acknowledged',
    NULL
  ),
  (
    't1t2t3t4-0003-4000-8000-000000000003',
    'e1e2e3e4-0001-4000-8000-000000000001',
    'a1b2c3d4-0003-4000-8000-000000000003',
    'coordinator',
    'Resources / Materials',
    'Additional extension boards needed',
    'Multiple teams have reported shortage of power outlets. We need at least 5 additional extension boards for the coding hall.',
    'a1b2c3d4-0004-4000-8000-000000000004',
    'principal',
    'Escalated',
    NULL
  ),
  (
    't1t2t3t4-0004-4000-8000-000000000004',
    'e1e2e3e4-0001-4000-8000-000000000001',
    'a1b2c3d4-0005-4000-8000-000000000005',
    'participant',
    'Venue / Schedule Issue',
    'Wi-Fi connectivity issue in Room 204',
    'Our team in Room 204 is experiencing intermittent Wi-Fi drops. We cannot push code to our repository.',
    'a1b2c3d4-0002-4000-8000-000000000002',
    'volunteer',
    'Resolved',
    'IT team has reset the access point. Connectivity restored.'
  )
ON CONFLICT (id) DO NOTHING;

-- Demo Ticket Updates (audit trail)
INSERT INTO ticket_updates (ticket_id, actor_id, old_status, new_status, note) VALUES
  ('t1t2t3t4-0001-4000-8000-000000000001', 'a1b2c3d4-0002-4000-8000-000000000002', 'Open', 'Acknowledged', 'I will come to your desk to help.'),
  ('t1t2t3t4-0001-4000-8000-000000000001', 'a1b2c3d4-0002-4000-8000-000000000002', 'Acknowledged', 'In Progress', 'Working on fixing the npm permissions issue.'),
  ('t1t2t3t4-0002-4000-8000-000000000002', 'a1b2c3d4-0003-4000-8000-000000000003', 'Open', 'Acknowledged', 'Noted. Will check volunteer availability.'),
  ('t1t2t3t4-0003-4000-8000-000000000003', 'a1b2c3d4-0003-4000-8000-000000000003', 'Open', 'Escalated', 'Escalating to principal for resource procurement approval.'),
  ('t1t2t3t4-0004-4000-8000-000000000004', 'a1b2c3d4-0002-4000-8000-000000000002', 'Open', 'Acknowledged', 'Checking with IT support.'),
  ('t1t2t3t4-0004-4000-8000-000000000004', 'a1b2c3d4-0002-4000-8000-000000000002', 'Acknowledged', 'In Progress', 'IT team is resetting the access point.'),
  ('t1t2t3t4-0004-4000-8000-000000000004', 'a1b2c3d4-0002-4000-8000-000000000002', 'In Progress', 'Resolved', 'IT team has reset the access point. Connectivity restored.')
ON CONFLICT DO NOTHING;

-- =============================================================================
-- END OF MIGRATION
-- =============================================================================
