export const STAGES = [
  { slug: 'prospecting',   label: 'Prospecting',    colour: '#6366f1' },
  { slug: 'contacted',     label: 'Contacted',       colour: '#0ea5e9' },
  { slug: 'in_discussion', label: 'In Discussion',   colour: '#8b5cf6' },
  { slug: 'proposal_sent', label: 'Proposal Sent',   colour: '#f59e0b' },
  { slug: 'won',           label: 'Won',             colour: '#10b981' },
  { slug: 'lost',          label: 'Lost / Dead',     colour: '#6b7280' },
]

export const STAGE_MAP = Object.fromEntries(STAGES.map(s => [s.slug, s]))
