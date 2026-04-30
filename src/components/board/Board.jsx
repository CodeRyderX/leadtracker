import React, { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { STAGES } from '../../constants/stages'
import Column from './Column'
import LeadCard from '../card/LeadCard'

export default function Board({ leads, moveLeadToStage, onAddLead, onCardClick, filterPlatform }) {
  const [activeId, setActiveId] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  )

  const filteredLeads = filterPlatform
    ? leads.filter(l => l.platform === filterPlatform)
    : leads

  const activeLeadData = activeId ? leads.find(l => l.id === activeId) : null

  function handleDragStart(event) {
    setActiveId(event.active.id)
  }

  function handleDragEnd(event) {
    const { active, over } = event
    setActiveId(null)
    if (!over) return
    const lead = leads.find(l => l.id === active.id)
    if (!lead) return
    const targetStage = STAGES.find(s => s.slug === over.id)
    if (targetStage && lead.stage !== targetStage.slug) {
      moveLeadToStage(active.id, targetStage.slug)
    }
  }

  function handleDragCancel() {
    setActiveId(null)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex gap-3 overflow-x-auto pb-6 px-4 pt-4 min-h-0 flex-1">
        {STAGES.map(stage => {
          const stageLeads = filteredLeads.filter(l => l.stage === stage.slug)
          return (
            <Column
              key={stage.slug}
              stage={stage}
              leads={stageLeads}
              onAddLead={onAddLead}
              onCardClick={onCardClick}
              activeId={activeId}
            />
          )
        })}
      </div>
      <DragOverlay>
        {activeLeadData ? (
          <div style={{ transform: 'rotate(2deg)', opacity: 0.95 }}>
            <LeadCard lead={activeLeadData} onClick={() => {}} isDragOverlay />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
