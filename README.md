# LeadTracker

A Kanban-style CRM dashboard built for freelancers to track leads and client prospects across every stage of the sales pipeline — from first contact to closed deal.

---

## Screenshots

### Dark Theme
![LeadTracker Dark Theme](screenshots/leadtracker%20dark%20theme%20board.png)

### Light Theme
![LeadTracker Light Theme](screenshots/leadtracker%20light%20theme%20board.png)

### Add New Lead
![New Lead Modal](screenshots/new%20lead%20modal%20open.png)

### Edit Lead
![Edit Lead Modal](screenshots/edit%20lead%20modal%20open.png)
---

## Features

- **Kanban board** — Six pipeline stages designed for freelancer workflows: Prospecting, Contacted, In Discussion, Proposal Sent, Won, and Lost
- **Drag and drop** — Move leads between stages with smooth drag-and-drop powered by dnd-kit
- **Lead cards** — At-a-glance view of lead name, platform/source, deal value, and follow-up date
- **Overdue reminders** — Cards with past follow-up dates are automatically flagged with a red badge
- **Full lead detail** — Click any card to open a slide-over panel with all fields editable and a timestamped notes history
- **Summary bar** — Live totals for pipeline count, total pipeline value (£), and overdue follow-ups
- **Filter by platform** — Quickly filter the board by source: Upwork, Warm Outreach, Referral, LinkedIn, or Other
- **CSV export** — Export all leads and fields to a CSV file in one click
- **Light and dark mode** — Toggle between themes, persisted across sessions
- **No backend** — All data lives in localStorage. Nothing leaves your browser.

---

## Pipeline Stages

| Stage | Purpose |
|-------|---------|
| Prospecting | Lead identified, not yet contacted |
| Contacted | Proposal submitted or first message sent |
| In Discussion | Active conversation, discovery, or scoping |
| Proposal Sent | Formal quote delivered, awaiting decision |
| Won | Closed and contracted |
| Lost / Dead | Declined, ghosted, or not a fit |

---

## Tech Stack

- [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/) (dark mode via `class` strategy)
- [@dnd-kit](https://dndkit.com/) for drag-and-drop
- localStorage for persistence — no backend, no database

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/CodeRyderX/leadtracker.git
cd leadtracker

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder. Deploy anywhere that serves static files (Vercel, Netlify, GitHub Pages, etc.).

---

## Data & Privacy

LeadTracker stores all data in your browser's localStorage. No data is sent to any server. Clearing your browser data will erase your leads — export to CSV regularly as a backup.

---

## Built by

[Emmanuel](https://github.com/CodeRyderX) — freelance automation and systems builder.
