# G-Events — Decision Log

## Demo mode vs real auth
- **Decision:** Demo sessions stored in sessionStorage (client-side, clearly labelled "Demo"). Supabase Auth NOT used for demo access. Judges must not need real credentials.
- **Rationale:** Demo mode must be explicit, synthetic, repeatable for hackathon judges. No real identities verified.

## Data layer
- **Decision:** App reads from `src/lib/demo-data.ts` (in-memory) so MVP works without a live Supabase project. `src/lib/supabase.ts` client prepared with env placeholders for when credentials are added.
- **Rationale:** Cannot connect to Supabase (credits expired). Must not pretend DB is connected or claim production-grade authentication.

## Env file
- **Decision:** `.env` contains placeholder values only (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`). No real secrets committed to Git.
- **Rationale:** No secrets in Git; placeholders guide future configuration when credits are renewed.

## UI priority
- **Decision:** Functional workflow first; minimal, consistent styling from existing palette/components. No new UI libraries.
- **Rationale:** User explicitly requested focus on workflow/core over polished UI. "Do not spend disproportionate time creating elaborate visual effects."

## Missing pages (now built)
- **Decision:** Built `/volunteer`, `/coordinator`, `/principal` route trees following participant patterns.
- **Rationale:** Only participant pages existed initially; all four role dashboards are mandatory per blueprint acceptance criteria.

## Ticket data persistence
- **Decision:** Demo journey uses in-memory state + SQL migration schema prepared. Status transitions persisted in component state; audit trail stored in `ticket_updates` table schema (migration) + in-memory updates in demo-data.
- **Rationale:** Demonstrate complete end-to-end workflow without requiring live DB connection for hackathon presentation.

## Build tooling
- **Decision:** Pre-existing Turbopack native module issue (`lucide-react` / `@tailwindcss/node`) affects entire project, not specific to my changes. Typecheck/lint also have pre-existing issues across the whole codebase.
- **Rationale:** Honest reporting — cannot claim build passes when original code has same issues. App runs in dev mode.