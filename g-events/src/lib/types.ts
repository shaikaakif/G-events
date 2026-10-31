// User roles
export type UserRole = 'participant' | 'volunteer' | 'coordinator' | 'principal';

// Event status
export type EventStatus = 'draft' | 'published' | 'active' | 'completed' | 'cancelled';

// Ticket status
export type TicketStatus = 'Open' | 'Acknowledged' | 'In Progress' | 'Escalated' | 'Resolved' | 'Closed';

// Ticket category
export type TicketCategory = 
  | 'Participant Help'
  | 'Volunteer Support'
  | 'Additional Volunteers'
  | 'Resources / Materials'
  | 'Venue / Schedule Issue'
  | 'Other';

// Profile
export interface Profile {
  id: string;
  display_name: string;
  email?: string;
  institution_name?: string;
  avatar_url?: string;
  is_demo: boolean;
  created_at: string;
}

// Event
export interface GEvent {
  id: string;
  slug: string;
  name: string;
  description?: string;
  event_type: string;
  starts_at?: string;
  ends_at?: string;
  timezone: string;
  status: EventStatus;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

// Event Member
export interface EventMember {
  id: string;
  event_id: string;
  user_id: string;
  role: UserRole;
  display_name: string;
  responsibilities?: string;
  is_demo: boolean;
  created_at: string;
}

// Schedule Item
export interface ScheduleItem {
  id: string;
  event_id: string;
  day_label: string;
  title: string;
  description?: string;
  time_label: string;
  starts_at?: string;
  ends_at?: string;
  is_break: boolean;
  display_order: number;
  created_at: string;
}

// Ticket
export interface Ticket {
  id: string;
  event_id: string;
  created_by: string;
  creator_role: UserRole;
  category: TicketCategory;
  subject: string;
  description: string;
  assigned_to?: string;
  assigned_role?: UserRole;
  status: TicketStatus;
  resolution_note?: string;
  created_at: string;
  updated_at: string;
  // Joined fields
  creator_name?: string;
  assignee_name?: string;
}

// Ticket Update
export interface TicketUpdate {
  id: string;
  ticket_id: string;
  actor_id: string;
  old_status?: string;
  new_status?: string;
  note?: string;
  created_at: string;
  actor_name?: string;
}

// Challenge Content
export interface ChallengeContent {
  id: string;
  event_id: string;
  title: string;
  body: string;
  updated_at: string;
}

// Demo session info
export interface DemoSession {
  userId: string;
  role: UserRole;
  profile: Profile;
  eventId: string;
  membership: EventMember;
}
