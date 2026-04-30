import React from 'react'

export default function ColumnHeader({ stage, count, onAddLead }) {
  return (
    <div className="flex items-center justify-between mb-3 px-1">
      <div className="flex items-center gap-2">
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: stage.colour }}
        />
        <span className="text-sm font-semibold text-surface-700 dark:text-dark-900">
          {stage.label}
        </span>
        <span className="text-xs font-mono text-surface-600 dark:text-dark-600 bg-surface-200 dark:bg-dark-200 px-1.5 py-0.5 rounded-full">
          {count}
        </span>
      </div>
      <button
        onClick={() => onAddLead(stage.slug)}
        className="text-surface-600 dark:text-dark-600 hover:text-surface-700 dark:hover:text-dark-700 hover:bg-surface-200 dark:hover:bg-dark-200 p-1 rounded-md transition-standard"
        aria-label={`Add lead to ${stage.label}`}
        title={`Add lead to ${stage.label}`}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  )
}
