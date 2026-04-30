export const PLATFORMS = [
  { slug: 'upwork',        label: 'Upwork',          colour: '#14a800', textColour: '#fff' },
  { slug: 'warm_outreach', label: 'Warm Outreach',   colour: '#3b82f6', textColour: '#fff' },
  { slug: 'referral',      label: 'Referral',        colour: '#8b5cf6', textColour: '#fff' },
  { slug: 'linkedin',      label: 'LinkedIn',        colour: '#0ea5e9', textColour: '#fff' },
  { slug: 'other',         label: 'Other',           colour: '#6b7280', textColour: '#fff' },
]

export const PLATFORM_MAP = Object.fromEntries(PLATFORMS.map(p => [p.slug, p]))
