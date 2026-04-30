import React from 'react'
import SummaryBar from './SummaryBar'
import Button from '../ui/Button'
import { PLATFORMS } from '../../constants/platforms'

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

export default function Navbar({ leads, isDark, toggleTheme, filterPlatform, setFilterPlatform, onExportCsv, onAddLead }) {
  return (
    <nav className="bg-surface-0 dark:bg-dark-50 border-b border-surface-200 dark:border-dark-200 h-14 sticky top-0 z-10 flex items-center px-4 gap-4">
      <div className="flex items-center gap-2 shrink-0">
        <span className="font-semibold text-base text-surface-700 dark:text-dark-900 tracking-tight">
          LeadTracker
        </span>
      </div>

      <div className="flex-1 flex justify-center">
        <SummaryBar leads={leads} />
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <select
          value={filterPlatform}
          onChange={e => setFilterPlatform(e.target.value)}
          className="text-sm rounded-lg border border-surface-200 dark:border-dark-200 bg-surface-0 dark:bg-dark-100 text-surface-700 dark:text-dark-900 px-2.5 py-1.5 outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-standard"
          aria-label="Filter by platform"
        >
          <option value="">All platforms</option>
          {PLATFORMS.map(p => (
            <option key={p.slug} value={p.slug}>{p.label}</option>
          ))}
        </select>

        <Button variant="secondary" size="sm" onClick={onExportCsv}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M6.5 1v7M3.5 5.5l3 3 3-3M1 9.5v1a1.5 1.5 0 001.5 1.5h8A1.5 1.5 0 0012 10.5v-1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Export CSV
        </Button>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-surface-600 dark:text-dark-600 hover:text-surface-700 dark:hover:text-dark-700 hover:bg-surface-100 dark:hover:bg-dark-100 transition-standard"
          aria-label="Toggle dark mode"
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>

        <Button size="sm" onClick={onAddLead}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Add Lead
        </Button>
      </div>
    </nav>
  )
}
