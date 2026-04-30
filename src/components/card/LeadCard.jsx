import React, { useRef } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import PlatformBadge from './PlatformBadge'
import OverdueBadge from './OverdueBadge'
import { formatDate } from '../../utils/dateUtils'

function formatValue(val) {
  if (!val || val === 0) return 'TBD'
  return '£' + Number(val).toLocaleString('en-GB')
}

export default function LeadCard({ lead, onClick, isDragOverlay = false }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: lead.id,
  })

  const dragStartPos = useRef(null)

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
    cursor: isDragOverlay ? 'grabbing' : 'grab',
  }

  function handlePointerDown(e) {
    dragStartPos.current = { x: e.clientX, y: e.clientY }
  }

  function handleClick(e) {
    if (dragStartPos.current) {
      const dx = Math.abs(e.clientX - dragStartPos.current.x)
      const dy = Math.abs(e.clientY - dragStartPos.current.y)
      if (dx > 5 || dy > 5) return
    }
    onClick(lead.id)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      className="bg-surface-0 dark:bg-dark-100 rounded-card shadow-card border border-surface-200 dark:border-dark-200 p-3 hover:shadow-card-hover transition-standard select-none"
    >
      <p className="text-sm font-medium text-surface-700 dark:text-dark-900 leading-snug mb-2 line-clamp-2">
        {lead.name}
      </p>
      <div className="flex flex-wrap gap-1 mb-2">
        <PlatformBadge platform={lead.platform} />
        <OverdueBadge followUpDate={lead.followUpDate} />
      </div>
      <div className="flex items-center justify-between gap-2 mt-1">
        <span className="font-mono text-xs font-medium text-accent">
          {formatValue(lead.dealValue)}
        </span>
        {lead.followUpDate && (
          <span className="font-mono text-xs text-surface-600 dark:text-dark-600">
            {formatDate(lead.followUpDate)}
          </span>
        )}
      </div>
    </div>
  )
}
