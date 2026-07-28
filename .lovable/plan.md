# NOORA Business OS — Real Product Build Plan

The current codebase is a marketing landing + mock dashboard. To become a sellable enterprise product (self-hosted + SaaS), we need a real backend, multi-tenant data model, auth, and dashboards wired to live data. This is impossible in one turn — I'll ship it in vertical slices, each production-usable.

## Architecture (shared core, two deployments)

- **Stack:** TanStack Start (existing) + Lovable Cloud (Postgres + Auth + Storage + Edge) + Lovable AI Gateway.
- **Multi-tenant from day 1:** every business table carries `org_id`; RLS enforces `org_id = current_user_org()`.
- **Feature modules** under `src/modules/<name>/` (ui, api, schema, hooks, types) — same code powers self-hosted and SaaS; SaaS-only concerns (billing, plan limits, tenant provisioning) live in `src/modules/billing` and can be disabled via env flag for self-hosted.
- **API-first:** every module exposes typed `createServerFn` handlers; REST wrappers under `src/routes/api/v1/*` reuse the same service layer for external integrations.
- **White-label:** branding (name, logo, colors, locale, currency) stored on `organizations` and injected into layout/theme.

## Slice 1 — Tenancy + Auth + Shell (this slice)

Deliverables:
1. Enable Lovable Cloud.
2. DB migration:
   - `organizations` (id, name, slug, brand_json, plan, locale, currency, created_at)
   - `memberships` (user_id, org_id, role) — role ∈ owner/admin/manager/member
   - `user_roles` (separate, security-definer `has_role` fn) per platform rules
   - `activity_logs` (org_id, actor_id, entity, action, meta, ts)
   - RLS + GRANTs on all tables; `current_org()` and `is_org_member()` security-definer helpers.
3. Auth: email/password + Google, first-run org creation, org switcher, invites (email + role).
4. App shell at `/app/*` behind `_authenticated`:
   - Sidebar (RTL), org switcher, user menu, notification bell, breadcrumbs
   - Empty-state pages for each module (Customers, Leads, Products, Orders, Invoices, Inventory, Documents, Automations, Agents, Reports, Settings)
5. Keep landing (`/`) and rename current `/dashboard` mock to `/preview` (marketing demo only).
6. Settings → Organization: brand name, logo upload, primary color, locale, currency (drives white-label).

## Slice 2 — Commercial Core (CRM + Sales)

`customers`, `leads`, `contacts`, `pipelines`, `deals`, `activities`, `tags`, `notes`, `reminders`. Full CRUD, list/detail views, kanban pipeline, timeline, assignment, filters, CSV import/export, activity log entries.

## Slice 3 — Products, Orders, Invoices, Payments

`products`, `categories`, `price_lists`, `quotations`, `orders`, `invoices`, `invoice_items`, `payments`, `expenses`, `taxes`. Invoice PDF, payment tracking, overdue detection, revenue rollups feeding the real executive dashboard.

## Slice 4 — Inventory & Procurement

`warehouses`, `stock_items`, `stock_movements`, `stock_alerts`, `purchase_orders`, `suppliers`, `shipments`. Low-stock rules, reorder points, automatic PO drafts.

## Slice 5 — Executive Command Center (real data)

Rewires current dashboard to live SQL: revenue, cash flow, pipeline, churn risk, overdue AR, low stock, top products, alerts, next best actions. All KPIs are computed views/materialized queries per `org_id`.

## Slice 6 — AI Core

Agent registry, prompt/memory/tool/execution engine on Lovable AI Gateway (`openai/gpt-5.6-sol`). RAG over `documents` (pgvector). AI CEO / Sales / Finance / Inventory agents with tool-calls into the module APIs, permission-checked, with `agent_runs` audit log and human-approval queue.

## Slice 7 — Automation Engine

`workflows`, `workflow_versions`, `workflow_runs`, `workflow_steps`. Trigger types (event, schedule, webhook, manual), conditions, branches, delays, retries. Node editor UI (React Flow). Ships with 10 starter templates.

## Slice 8 — Knowledge Base

Uploads (PDF/DOCX/XLSX/images), parse → chunks → embeddings, semantic search, citations, folders/tags. Reused by AI agents.

## Slice 9 — Communication Hub

Unified inbox (email + WhatsApp + webhook channels), conversation → customer linking, templates, routing rules, SLA timers.

## Slice 10 — Analytics / BI, Digital Twin, Marketplace, Plugin SDK, Industry Packs, Billing/Licensing, Security hardening (2FA, audit, rate-limit, SSO-ready), Integrations.

## Technical details

- **DB:** all tables `org_id uuid not null references organizations(id) on delete cascade`; RLS `USING (org_id = current_org())`; GRANTs per platform rules.
- **Roles:** app_role enum + `has_role(_user_id, _role)` security-definer, per platform rules. Never store roles on profile.
- **Server functions:** `.middleware([requireSupabaseAuth])`; org resolved from JWT claim or membership; every mutation writes `activity_logs`.
- **Frontend:** TanStack Query for all data, Suspense loaders, `_authenticated` gate (integration-managed), shadcn/ui tables (data-table), Zod validation, react-hook-form.
- **REST API:** `src/routes/api/v1/<module>` reads bearer, calls same service, versioned + paginated.
- **Plan flags:** `organizations.plan` gates SaaS limits; self-hosted build sets `VITE_DEPLOYMENT=selfhosted` → unlimited.
- **Branding:** `brand_json` merged into CSS vars at root layout for full white-label.

## What ships in the first turn after approval

Slice 1 end-to-end: Cloud enabled, migration applied, auth + Google, org creation & switcher, invites, app shell with all module stubs, Settings → Organization branding, activity log. Landing kept; `/dashboard` moved to `/preview`. This is the foundation every later slice plugs into.

After Slice 1 is live and you confirm, I'll proceed straight into Slice 2 (CRM) and continue through the roadmap without re-asking.

## Confirm to proceed

Reply "go" (or edits) and I'll start Slice 1. If you'd rather I reorder — e.g. Products/Invoices before CRM, or AI Core earlier on top of seed data — say so and I'll adjust the slice order (architecture stays the same).
