# Gatik Events — Fresh MVP Project Blueprint

**Purpose:** Build a simple, functional, mobile-first campus activity platform for a hackathon.  
**Default event:** Gatik Xplorer Hackathon  
**Backend:** Supabase only  
**Deployment:** Vercel project URL only  
**Product priority:** Workflow and innovation first; visual complexity last.

> This is a fresh project specification. Do not assume or import decisions from unrelated earlier projects.

---

## 1. Product vision

Gatik Events helps schools and colleges create, publish, discover, participate in, and coordinate campus activities from one place.

It should support future activities such as sports days, science exhibitions, cultural festivals, environmental drives, workshops, competitions, and student-club activities. The first configured event is **Gatik Xplorer Hackathon**.

The MVP must demonstrate one complete, believable workflow:
1. An organizer creates and publishes an event.
2. Students discover it and register or participate.
3. Participants can see the schedule, location/details, and challenge.
4. Volunteers support participants and operations.
5. Coordinators handle operational requests.
6. The principal/event administrator oversees the event and resolves escalations.

**Build the smallest working system that proves the idea.** Do not turn this into a large enterprise platform.

## 2. Challenge context

Schools and colleges organize many activities, but planning, schedules, registrations, venues, teams, equipment, materials, and updates are often scattered across notice boards, messages, spreadsheets, forms, and conversations.

Gatik Events brings the essential information and coordination workflow together.

The solution should be extensible to different activity types. Each activity may have its own schedule, locations, participants, teams, materials, equipment, and coordination requirements.

The hackathon expects a working MVP demonstrating:
- Activity creation and publication.
- Activity discovery and registration/participation.
- Management of important details such as schedule, location, participants, and basic requirements.
- Organizer coordination and tracking through completion.
- A realistic school/college scenario.

The final presentation should explain what was included, what was deferred, how the system can support future activity types, and the product roadmap.

## 3. MVP scope

### Must build
- A centered sign-in screen.
- Clearly visible demo access; judges must not need real credentials.
- Four role-specific dashboards.
- Gatik Xplorer Hackathon as the default active demo event.
- Event overview, schedule, and challenge statement.
- Challenge statement Copy button.
- Participant registration with a Demo Participant shortcut.
- Simple ticket/request workflow between participants, volunteers, coordinators, and principal.
- Principal event creation/editing and basic publishing.
- Supabase persistence for core records.
- Mobile-first responsive UI.
- Vercel deployment.

### Do not build unless time remains
- Payment processing.
- Complex multi-institution tenancy.
- Real-time chat/presence.
- AI chatbot or AI-generated event management.
- Complex inventory/procurement.
- QR scanning, biometrics, hardware integrations.
- Large analytics systems.
- Complicated approval engines or permission builders.
- Native mobile apps.

The product may feel contemporary and energetic, but do not add features merely to make the demo look bigger.

## 4. Users and role permissions

Roles are event-scoped: `participant`, `volunteer`, `coordinator`, `principal`.

### Participant
Can view event information, schedule, challenge, own profile/participation details, raise a ticket to the volunteer/support queue, and track their own tickets. Cannot manage event settings or see unrelated private participant information.

### Volunteer
Can view assigned responsibilities, event schedule, relevant support requests, update tickets assigned to them, and raise requests for more volunteers or resources to the coordinator. Cannot change event-wide settings.

### Activity Coordinator
Can monitor operational requests, route/assign tickets within their scope, coordinate volunteers, and raise event-level requests to the principal. Cannot perform principal-only administration.

### Principal / Event Administrator
Can create/edit/publish/close events, manage basic event details and schedule, view participants and staff, assign/reassign tickets, review requests for volunteers/resources, update ticket status, and oversee the event.

**Enforce permissions server-side and through database policies. Hiding a button is not authorization.**

## 5. Sign-in and demo mode

### First screen
The first screen is a **clean, centered sign-in screen**. No left/right split layout, no marketing hero before sign-in, no glassmorphism, no complex onboarding, and no large decorative panel.

Suggested content:
- Gatik Events name/mark.
- Short line: “Your campus activities, all in one place.”
- Email field.
- Password field.
- Sign in button.
- **Continue with demo credentials** action.
- Optional secondary link to explore the event.

### Demo credentials
When selected, show four clear options:
- Continue as Demo Participant
- Continue as Demo Volunteer
- Continue as Demo Activity Coordinator
- Continue as Demo Principal

Each option opens the matching role dashboard using a controlled, clearly labelled demo session. No real credentials or real personal information are needed.

Demo mode must:
- Use synthetic sample records only.
- Show a visible “Demo” label.
- Be repeatable for judges with predictable data.
- Never claim that a real identity was verified.
- Never expose passwords, API keys, or tokens.
- Enforce demo-role checks on the server; do not trust a role stored in editable browser storage.

### Participant registration shortcut
Near the beginning of the participant registration flow, include **Continue as Demo Participant**. It skips real personal-data entry and opens a clearly labelled demo participant experience.

Use the simplest safe implementation. Supabase is the backend. Use Supabase Auth if real account authentication is needed; keep demo access explicitly separate. Do not build elaborate custom authentication for this MVP.

## 6. Visual identity — Gatik: Digital Energy

The UI should be bright, attractive, youthful, and confident—not pale beige corporate minimalism and not a full 8-bit game.

| Colour | Hex | Suggested use |
|---|---|---|
| Electric Blue | `#3155F5` | Primary action, key brand accent |
| Vibrant Coral | `#FF6748` | Highlights, active accents |
| Sunshine | `#FFD447` | Callouts, secondary accent |
| Pixel Lime | `#A8E84A` | Positive/selected states |
| Digital Violet | `#8657E8` | Supporting accent |
| Deep Ink | `#17192D` | Main text, occasional dark surface |

Use a clean, light neutral base so the bright colours stand out. Use Electric Blue for primary actions. Apply Coral, Violet, Sunshine, and Lime selectively. Maintain readable contrast; do not put long text on intense colour surfaces.

### Pixel-inspired signature
Use selective pixel details: tiny grid motifs, blocky separators, geometric decorations, small pixel illustrations, or a few playful micro-interactions. Do not make all controls pixelated. Forms, body text, navigation, and operational controls must remain familiar and easy to use.

### UI rules
- Mobile-first; make it feel like an app delivered through the web.
- Clear hierarchy, simple surfaces, efficient spacing.
- Consistent buttons, inputs, badges, and lists.
- Avoid nested cards, decorative charts, dead buttons, and unnecessary animation.
- Use one consistent icon family.
- Keep motion short, purposeful, and reduced-motion aware.
- The coding agent may choose the exact UI theme, but it must follow this palette and remain simple.

## 7. Mobile-first navigation and common event information

Design for phones first. Desktop is a responsive enhancement, not the starting point.

Use compact, role-aware navigation. On mobile, a simple bottom navigation is suitable if it fits the role's tasks. Do not overload it.

All roles should be able to reach relevant event information:
- Event overview.
- Schedule.
- Challenge statement.
- Profile.
- Tickets/requests where relevant.

The default event must be **Gatik Xplorer Hackathon**, already configured as the active demo event. Do not show an empty directory as the primary experience.

## 8. Role dashboards

Reuse shared components and data, but give each role a genuinely useful dashboard.

### Participant dashboard
- Welcome and demo/registration status.
- Gatik Xplorer Hackathon summary.
- Next schedule item.
- Challenge statement preview and “Read full challenge”.
- Team/participation details when configured.
- Raise a ticket.
- My tickets and statuses.
- Profile and event details.

Answer the participant's key questions: What is this event? What happens next? Where/when should I be? How do I get help?

### Volunteer dashboard
- Volunteer identity and assigned responsibilities.
- Current/next schedule item.
- Support tasks only if they are part of the implemented workflow.
- Tickets assigned to the volunteer.
- Ticket status update.
- Request additional volunteers/resources.
- Event schedule and profile.

Do not invent assignments or attendance counts. Synthetic demo data must be labelled.

### Coordinator dashboard
- Operational overview based on actual MVP records.
- Volunteer/support coverage only when assignments exist.
- Open tickets and priority.
- Requests awaiting action.
- Assign/route tickets.
- Request more volunteers/resources from principal.
- Schedule and profile.

Do not display fake analytics.

### Principal dashboard
- Event overview and publication status.
- Create/edit/publish event.
- Schedule management.
- Participant/staff overview.
- Volunteer/coordinator assignments.
- All tickets and requests.
- Assign/reassign and resolve tickets.
- Event profile/settings and basic activity history.

## 9. Ticket and support request workflow

This is a key MVP feature. Keep it a small, traceable coordination workflow—not a full helpdesk.

### Request categories
- Participant Help
- Volunteer Support
- Additional Volunteers
- Resources / Materials
- Venue / Schedule Issue
- Other

### Workflow
**Participant → Volunteer/support queue**
- Participant raises an event-related ticket.
- Route it to the relevant volunteer or support queue.
- Volunteer acknowledges it, updates status, or escalates it to the coordinator.

**Volunteer → Coordinator**
- Volunteer requests more volunteers, materials, or operational support.
- Coordinator reviews and assigns/escalates the request.
- Volunteer can track the status.

**Coordinator → Principal**
- Coordinator raises an event-level request, such as additional volunteers or resources.
- Principal reviews it and records an action or decision.

**Principal**
- Sees all tickets, assigns/reassigns ownership, updates status, and records resolution.

### Minimal statuses
`Open` → `Acknowledged` → `In Progress` → `Escalated` → `Resolved` → `Closed`

Use only the transitions needed by the actual workflow. Show timestamps and who last updated the ticket.

### Minimum ticket fields
- ID and event ID.
- Creator and creator role.
- Category, subject, description.
- Assigned user/role or queue.
- Status.
- Created/updated timestamps.
- Optional resolution note.

A small ticket history table is recommended if time permits.

## 10. Default event: Gatik Xplorer Hackathon

**Event:** Gatik Xplorer Hackathon  
**Type:** Hackathon / campus innovation event  
**Dates in supplied schedule:** 31 October and 1 November  
**Timezone:** Asia/Kolkata  
**Demo status:** Published/active  
**Challenge:** Campus Activity Platform

Do not invent venue details, guest names, Wi-Fi name/password, or other missing facts. The supplied schedule's third page has blank internet-access fields; leave them blank or omit them.

### Event schedule — 31 October

| Time | Activity |
|---|---|
| 8:30–8:45 AM | Reporting time for students |
| 9:00–9:30 AM | Registration and escorting to the room |
| 9:30 AM | Guest arrival |
| 9:50 AM | Ceremony starts |
| 10:30 AM | Break for 15 minutes |
| 10:45–11:45 AM | Workshop |
| 11:45 AM | Coding begins |
| 1:15–2:00 PM | Lunch break (45 minutes) |
| 2:00–3:00 PM | Coding continues |
| 3:00–3:20 PM | Break for 20 minutes |
| 3:20–6:30 PM | Coding continues |
| 6:30–8:30 PM | Dinner break, band and flashmob |
| Night | Rooms with beds and materials for rest |
| Around 2:30–3:00 AM | Midnight snacks, tea, and coffee provided |

### Event schedule — 1 November

| Time | Activity |
|---|---|
| 7:30–8:00 AM | Breakfast |
| 8:00–9:30 AM | Presentation should be ready |
| 9:30–10:00 AM | Ceremony and guest addressing |
| 10:00 AM | Participants should be at the auditorium with their presentation |
| 10:30 AM | Addressing judges and judging starts |
| During judging (approximately 2–3 hours) | Snacks will be provided |
| 12:30 PM | Closing ceremony |
| After closing ceremony | Felicitation and award ceremony; closure and dispersal after lunch |

The schedule above is transcribed from the supplied three-page event schedule (pages 1–2 contain the timetable; page 3 contains blank internet-access fields). Do not invent end times where none are specified.

### Schedule UI
- Chronological timeline, readable on a phone.
- Highlight the next item only when correct local-time logic is implemented.
- Distinguish breaks from program activities.
- Make schedule available from dashboards and event profile.
- Do not invent countdowns or claim an activity is currently happening without checking Asia/Kolkata time.

## 11. Challenge statement: display-ready copy

Show this as structured, selectable text with clear headings and a working **Copy challenge statement** button. Do not render it as an image.

### Hackathon Challenge: Campus Activity Platform

#### The Challenge

Schools and colleges regularly organize activities such as sports events, cultural programs, science exhibitions, environmental drives, workshops, competitions, and student-club activities. These activities bring students and staff together, but coordinating them requires more than simply announcing an event.

Organizers must plan activities, publish schedules, inform and register participants, allocate venues, form teams or groups, arrange equipment and materials, and keep everyone updated.

Consider a school organizing its Annual Sports Day. Multiple sports may take place at different times and locations. Students need to register for activities, teachers need to coordinate them, equipment must be arranged, venues must be allocated, and participants need to know where and when they are expected.

Today, this information is often scattered across notice boards, messaging apps, spreadsheets, forms, and conversations. This can make coordination difficult for students, staff, and organizers.

#### Your Challenge

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

#### Minimum Expected Outcome

Your team should deliver a working **Minimum Viable Product (MVP)**: the simplest working version of the application that demonstrates the main idea and essential features, without needing to implement every possible future feature.

If the complete application cannot be implemented, a well-designed UI mock-up or interactive prototype is acceptable, provided it clearly demonstrates how users would use the proposed application.

At minimum, demonstrate an end-to-end scenario in which:

1. An activity or program can be created and published.
2. Students and/or staff can discover activities and register or participate.
3. Important details such as schedule, location, participants, and basic activity requirements can be managed.
4. The organizer can coordinate and track the activity through completion.
5. The solution is demonstrated using a realistic school or college scenario.

You are not expected to build every possible feature. **Smart prioritization is important.**

#### Think Beyond the MVP

During the final presentation, explain:
- What you included in the MVP and why.
- What you deliberately left for later.
- How the solution can support different types of activities and future requirements.
- Your vision and roadmap for evolving the solution.

### Copy button behavior
- Copy the complete challenge statement, including headings and lists.
- Keep text selectable.
- Show “Copied” only after the clipboard operation succeeds.
- Show a useful error if copying fails.
- Offer a “Read full challenge” page or expandable section from the dashboard.

## 12. Participant registration

Keep the form short and mobile-friendly. Collect only information genuinely needed for the demonstration, such as:
- Participant name.
- School/institution.
- Team name or team selection, if the event requires it.
- Contact field only if needed for the chosen workflow.

Near the beginning of the form, include **Continue as Demo Participant**. It should use a synthetic demo identity, skip real personal-data entry, clearly label the session Demo, and open the participant dashboard. Do not require a real email, OTP, password, or phone number for this path.

## 13. Simple technical architecture

Use Supabase as the only backend and Vercel for hosting. Do not introduce extra infrastructure without a demonstrated need.

If starting from an empty repository, a straightforward stack is:
- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase PostgreSQL and client
- Supabase Auth only if real authentication is needed
- Existing project validation approach (for example, Zod if appropriate)
- One consistent icon library
- Vercel

Do not add large UI, state, animation, or AI libraries without a clear requirement.

### Minimal data model

**profiles**
- `id`
- `display_name`
- `institution_name` (optional)
- `created_at`

**events**
- `id`, `slug`, `name`, `description`, `event_type`
- `starts_at`, `ends_at`, `timezone`, `status`
- `created_by`, `created_at`, `updated_at`

**event_members**
- `id`, `event_id`, `user_id` or demo identity reference
- `role`, `display_name`, `created_at`

**event_schedule**
- `id`, `event_id`, `title`, `description`
- `starts_at` (nullable), `ends_at` (nullable), `display_order`

**tickets**
- `id`, `event_id`, `created_by`, `creator_role`
- `category`, `subject`, `description`
- `assigned_to` (nullable), `assigned_role` (nullable)
- `status`, `resolution_note` (nullable)
- `created_at`, `updated_at`

**ticket_updates** (recommended)
- `id`, `ticket_id`, `actor_id`
- `old_status`, `new_status`, `note`, `created_at`

**challenge_content**
- `id`, `event_id`, `title`, `body`, `updated_at`

Use foreign keys, constraints, and indexes where appropriate. Keep roles event-scoped; do not use a global role that grants the same permissions across all events.

### Synthetic demo seed
Seed:
- One Gatik Xplorer Hackathon event.
- The supplied schedule.
- The challenge statement.
- One synthetic demo identity per role.
- A few clearly fictional participants/tickets.

Label synthetic data as demo data. Never present sample counts as real attendance or actual event statistics.

### Security baseline
- Service-role key stays server-side.
- Enable Supabase Row Level Security on exposed tables.
- Policies must respect event membership and role.
- Validate every mutation server-side.
- Never trust a role supplied by the browser.
- Do not expose private participant information to unrelated roles.
- Keep secrets in environment settings; never commit them.
- Demo mode is explicit and limited to synthetic records.
- Do not claim production-grade authentication or security certification.

## 14. Deployment

- Deploy to Vercel.
- Use the Vercel-provided project URL only.
- Do not configure a custom domain, subdomain, or DNS.
- Configure Supabase URL and public client key as appropriate.
- Keep privileged keys server-side.
- Configure environment variables in Vercel.
- Verify the deployed app, database connection, demo access, role navigation, ticket workflow, schedule, and Copy button.

Do not report deployment success until the actual Vercel URL has been opened and tested.

## 15. Suggested route map

Adapt names to the chosen framework, but keep navigation simple:

- `/` — centered sign-in
- `/demo` — demo role selection
- `/events/gatik-xplorer-hackathon` — event overview
- `/events/gatik-xplorer-hackathon/challenge` — challenge statement
- `/events/gatik-xplorer-hackathon/schedule` — schedule
- `/participant` — participant dashboard
- `/participant/profile`
- `/participant/tickets`
- `/volunteer` — volunteer dashboard
- `/volunteer/tickets`
- `/coordinator` — coordinator dashboard
- `/coordinator/tickets`
- `/principal` — principal dashboard
- `/principal/events`
- `/principal/events/new`
- `/principal/tickets`

Protect role-specific routes on the server and redirect unauthorized users safely.

## 16. Implementation order

### Phase 1 — Foundation
Inspect repository, scripts, framework, package versions, routes, and current working tree. Establish tokens and shared controls. Build centered sign-in and demo-role selection.

**Acceptance:** A judge can enter all four demo roles without real credentials.

### Phase 2 — Event information
Configure Xplorer as the default event. Add overview, both days of schedule, challenge statement, and working Copy button. Link these from dashboards/profile.

**Acceptance:** A judge can find the event, read/copy the challenge, and view the correct schedule on a phone.

### Phase 3 — Dashboards
Build the four role-specific dashboards using shared components and real role-appropriate data.

**Acceptance:** Each role sees relevant information and can reach its main task quickly.

### Phase 4 — Ticket workflow
Build ticket creation, participant-to-volunteer routing, volunteer escalation, coordinator-to-principal requests, and principal assignment/resolution.

**Acceptance:** Demonstrate a complete ticket journey across roles.

### Phase 5 — Event administration
Allow principal to create/edit an event, update basic schedule details, and publish it. Keep Xplorer available as the default demo event.

**Acceptance:** Demonstrate an event being created or edited and published.

### Phase 6 — QA and deployment
Test mobile and desktop layouts, keyboard navigation, form labels, role restrictions, demo flows, tickets, schedule, and Copy button. Run lint, typecheck, tests, and build. Deploy and verify Vercel.

**Acceptance:** The deployed MVP can be demonstrated without a developer's local machine.

## 17. Hackathon demo script

1. Open the centered sign-in screen.
2. Select **Continue with demo credentials**.
3. Enter as Demo Participant.
4. Show the Gatik Xplorer dashboard.
5. Open the schedule.
6. Open the challenge statement and use Copy.
7. Raise a participant support ticket.
8. Switch to Demo Volunteer and acknowledge/update it.
9. Switch to Demo Coordinator and show escalation/request handling.
10. Switch to Demo Principal and show the complete ticket overview.
11. Demonstrate creating or editing an event.
12. Explain MVP scope, deferred work, and future extensibility.

Keep demo data predictable so the presentation can be repeated.

## 18. AI coding-agent rules

The coding agent must work from evidence, not assumptions.

### Before editing
- Inspect the actual repository and Git working tree.
- Read package scripts, lockfile, framework version, routes, components, and data model.
- Identify what already works.
- State known facts, unknowns, and assumptions.
- Propose a small implementation plan.

### While editing
- Work phase by phase.
- Preserve working functionality.
- Keep the UI mobile-first and uncomplicated.
- Follow the supplied palette.
- Use Supabase for persistent features.
- Distinguish demo data from real data.
- Do not invent event facts, credentials, counts, APIs, columns, or test results.
- Do not add dependencies without a reason.
- Do not replace functionality with static mockups while claiming it works.
- Ask before destructive database or deployment changes.

### Verification and reporting
- Run relevant lint, typecheck, tests, and build.
- Test actual workflows, not only page rendering.
- Inspect mobile screenshots and a desktop viewport.
- Verify demo entry, role restrictions, ticket transitions, schedule, and Copy behavior.
- Report only checks actually performed.

After each phase, report:
- Implemented
- Tested
- Not implemented
- Known limitations
- Next task

## 19. Definition of done

- [ ] First screen is a clean, centered sign-in.
- [ ] Demo access works without real credentials.
- [ ] All four demo roles open the correct dashboards.
- [ ] Gatik Xplorer Hackathon is the default event.
- [ ] Both days of schedule are displayed accurately.
- [ ] Challenge statement is readable and copyable.
- [ ] Participant registration includes Demo Participant shortcut.
- [ ] Participant can raise a ticket.
- [ ] Volunteer can receive and update a ticket.
- [ ] Coordinator can route/escalate operational requests.
- [ ] Principal can see all tickets and manage event basics.
- [ ] Role permissions are enforced beyond the visual interface.
- [ ] App is usable at narrow mobile widths.
- [ ] Core persistent flows work against Supabase.
- [ ] App is deployed and verified on its Vercel project URL.
- [ ] Demo records are synthetic and clearly identified.
- [ ] No secrets or real private credentials are committed.

## 20. Decisions that must not drift

1. Treat this as a fresh project; do not import unrelated project history.
2. Default event: Gatik Xplorer Hackathon.
3. First screen: centered sign-in, not a landing page.
4. Demo access: explicit, judge-friendly, synthetic, and repeatable.
5. Participant form: include Continue as Demo Participant.
6. Mobile-first: it should feel like an app.
7. Brand palette: the six Gatik Digital Energy colours above.
8. Pixel art: selective visual signature, not a full retro-game UI.
9. Workflow and innovation matter more than visual complexity.
10. Supabase is the only backend.
11. Vercel project URL only; no custom domain or DNS.
12. Keep implementation simple, functional, and demonstrable.
13. Never use real credentials or private participant data in the demo.
14. Never invent missing schedule, venue, guest, or internet-access details.
15. Prefer a working end-to-end workflow over many unfinished features.

---

**End of project blueprint.**
