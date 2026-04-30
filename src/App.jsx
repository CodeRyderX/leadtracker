import React, { useState } from 'react'
import { useLeads } from './hooks/useLeads'
import { useTheme } from './hooks/useTheme'
import { useCsvExport } from './hooks/useCsvExport'
import Navbar from './components/layout/Navbar'
import Board from './components/board/Board'
import AddLeadModal from './components/modals/AddLeadModal'
import LeadDetailPanel from './components/modals/LeadDetailPanel'

export default function App() {
  const { leads, addLead, updateLead, deleteLead, moveLeadToStage } = useLeads()
  const { isDark, toggleTheme } = useTheme()
  const { exportCsv } = useCsvExport()

  const [selectedLeadId, setSelectedLeadId] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [defaultAddStage, setDefaultAddStage] = useState('prospecting')
  const [filterPlatform, setFilterPlatform] = useState('')

  function openAddModal(stage = 'prospecting') {
    setDefaultAddStage(stage)
    setIsAddModalOpen(true)
  }

  function handleAddLead(data) {
    addLead(data)
    setIsAddModalOpen(false)
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-surface-50 dark:bg-dark-0">
      <Navbar
        leads={leads}
        isDark={isDark}
        toggleTheme={toggleTheme}
        filterPlatform={filterPlatform}
        setFilterPlatform={setFilterPlatform}
        onExportCsv={() => exportCsv(leads)}
        onAddLead={() => openAddModal()}
      />

      <div className="flex-1 overflow-hidden flex flex-col">
        <Board
          leads={leads}
          moveLeadToStage={moveLeadToStage}
          onAddLead={openAddModal}
          onCardClick={setSelectedLeadId}
          filterPlatform={filterPlatform}
        />
      </div>

      <AddLeadModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddLead}
        defaultStage={defaultAddStage}
      />

      <LeadDetailPanel
        leadId={selectedLeadId}
        leads={leads}
        onUpdate={updateLead}
        onDelete={deleteLead}
        onClose={() => setSelectedLeadId(null)}
      />
    </div>
  )
}
