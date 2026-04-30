import React from 'react'
import { isOverdue } from '../../utils/dateUtils'

export default function SummaryBar({ leads }) {
  const total = leads.length
  const pipeline = leads
    .filter(l => l.status !== 'lost')
    .reduce((sum, l) => sum + (l.dealValue || 0), 0)
  const overdue = leads.filter(l => l.followUpDate && isOverdue(l.followUpDate)).length

  const pipelineFormatted = '£' + pipeline.toLocaleString('en-GB')

  return (
    <div className="flex items-center gap-2">
      <Chip label="Leads" value={total} />
      <Chip label="Pipeline" value={pipelineFormatted} />
      <Chip label="Overdue" value={overdue} danger={overdue > 0} />
    </div>
  )
}

function Chip({ label, value, danger }) {
  return (
    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border transition-standard ${
      danger && value > 0
        ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400'
        : 'bg-surface-100 dark:bg-dark-100 border-surface-200 dark:border-dark-200 text-surface-700 dark:text-dark-700'
    }`}>
      <span className="text-surface-600 dark:text-dark-600 text-xs">{label}</span>
      <span className="font-semibold font-mono text-xs">{value}</span>
    </div>
  )
}
