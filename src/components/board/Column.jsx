import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import ColumnHeader from './ColumnHeader'
import LeadCard from '../card/LeadCard'

export default function Column({ stage, leads, onAddLead, onCardClick, activeId }) {
  const { setNodeRef, isOver } = useDroppable({ id: stage.slug })

  return (
    <div className="w-72 shrink-0 bg-surface-100 dark:bg-dark-50 rounded-xl p-3 flex flex-col">
      <ColumnHeader stage={stage} count={leads.length} onAddLead={onAddLead} />
      <SortableContext items={leads.map(l => l.id)} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className="flex flex-col gap-2 min-h-[120px] flex-1 rounded-lg transition-standard"
          style={{
            backgroundColor: isOver ? stage.colour + '12' : undefined,
            outline: isOver ? `2px solid ${stage.colour}44` : undefined,
          }}
        >
          {leads.map(lead => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onClick={onCardClick}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  )
}
