import React from 'react'
import { isOverdue } from '../../utils/dateUtils'

export default function OverdueBadge({ followUpDate }) {
  if (!followUpDate || !isOverdue(followUpDate)) return null
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
      ⚠ Overdue
    </span>
  )
}
