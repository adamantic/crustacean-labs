# 📇 FreeCRM

*Free the people from expensive software*

A modern, open-source CRM that doesn't cost $300/user/month.

## The Problem

- Salesforce: $300/user/month (Enterprise)
- HubSpot: Free tier is crippled, paid is expensive
- Most CRMs: Built for enterprises, not humans

Meanwhile, all you want is to:
- Keep track of your contacts
- Know when you last talked to someone
- Set reminders to follow up
- Maybe track some deals

## The Solution

FreeCRM is:
- **Free** — MIT licensed, self-hostable
- **Agent-native** — API-first, so agents can help manage contacts
- **Mobile-friendly** — Because relationships happen on the go
- **Simple** — Do the core things well, skip the bloat

## Tech Stack (Proposed)

- **Frontend:** Next.js 14 + Tailwind + shadcn/ui
- **Backend:** Supabase (Postgres + Auth + Real-time)
- **Mobile:** PWA first, native apps later
- **Hosting:** Self-hosted or Vercel + Supabase

### Why Supabase?

- Postgres = rock solid, queryable, familiar
- Built-in auth
- Real-time subscriptions
- Row-level security
- Generous free tier
- Self-hostable

## Core Features (MVP)

### Contacts
- [ ] Contact CRUD
- [ ] Custom fields
- [ ] Tags/labels
- [ ] Import from CSV/Google/Outlook
- [ ] Search and filter
- [ ] Contact timeline (interactions)

### Interactions
- [ ] Log calls, emails, meetings
- [ ] Notes
- [ ] Automatic logging (with integrations)

### Tasks & Reminders
- [ ] Follow-up reminders
- [ ] Task management
- [ ] Calendar integration

### Agent API
- [ ] Full REST API
- [ ] Webhook support
- [ ] Agent-friendly auth (API keys)
- [ ] Bulk operations

## Features (v2)

- [ ] Deals/pipeline tracking
- [ ] Email integration (send from CRM)
- [ ] Team support
- [ ] Reporting/analytics
- [ ] Mobile apps (iOS/Android)
- [ ] Gmail/Outlook plugins

## Data Model

```
contacts
├── id
├── name
├── email
├── phone
├── company
├── tags[]
├── custom_fields{}
├── created_at
├── updated_at
└── owner_id

interactions
├── id
├── contact_id
├── type (call|email|meeting|note)
├── content
├── occurred_at
└── created_by

tasks
├── id
├── contact_id (optional)
├── title
├── due_date
├── completed
└── assigned_to
```

## Getting Started

```bash
cd projects/freecrm
npm install
cp .env.example .env.local  # Add your Supabase config
npm run dev
```

## Why "Free"?

Not just free as in beer. Free as in freedom.

- Free to use
- Free to modify
- Free to self-host
- Free to fork
- Free from vendor lock-in
- Free from per-seat pricing

Your relationships are yours. Your data is yours.

## Contributing

1. Check issues for tasks
2. Start small — even fixing typos helps
3. Discuss architecture changes first
4. Write tests when possible

## License

MIT — Use it, modify it, sell it, whatever.

---

*Maintainer needed! Open a PR to claim this project.*
