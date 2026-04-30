import React, { useState, useEffect } from 'react'
import SlideOver from '../ui/SlideOver'
import Button from '../ui/Button'
import Textarea from '../ui/Textarea'
import PlatformBadge from '../card/PlatformBadge'
import { STAGES } from '../../constants/stages'
import { PLATFORMS } from '../../constants/platforms'
import { formatDate, formatRelative } from '../../utils/dateUtils'
import { generateId } from '../../utils/idUtils'

const STAGE_OPTIONS = STAGES.map(s => ({ value: s.slug, label: s.label }))
const PLATFORM_OPTIONS = PLATFORMS.map(p => ({ value: p.slug, label: p.label }))

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-surface-600 dark:text-dark-600 uppercase tracking-wide">{label}</span>
      {children}
    </div>
  )
}

function InlineInput({ value, onChange, type = 'text', prefix, placeholder }) {
  return (
    <div className="relative flex items-center">
      {prefix && (
        <span className="absolute left-3 text-sm text-surface-600 dark:text-dark-600 pointer-events-none">{prefix}</span>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full text-sm rounded-lg border border-surface-200 dark:border-dark-200 bg-surface-50 dark:bg-dark-100 text-surface-700 dark:text-dark-900 py-2 pr-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-standard ${prefix ? 'pl-7' : 'pl-3'}`}
      />
    </div>
  )
}

export default function LeadDetailPanel({ leadId, leads, onUpdate, onDelete, onClose }) {
  const lead = leads.find(l => l.id === leadId)
  const [noteText, setNoteText] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(false)

  useEffect(() => {
    setNoteText('')
    setConfirmDelete(false)
  }, [leadId])

  if (!lead) return null

  function update(field) {
    return e => onUpdate(lead.id, { [field]: e.target.value })
  }

  function updateDealValue(e) {
    onUpdate(lead.id, { dealValue: e.target.value === '' ? 0 : Number(e.target.value) })
  }

  function handleAddNote() {
    if (!noteText.trim()) return
    const note = { id: generateId(), text: noteText.trim(), createdAt: new Date().toISOString() }
    onUpdate(lead.id, { notes: [...(lead.notes || []), note] })
    setNoteText('')
  }

  function handleDeleteNote(noteId) {
    onUpdate(lead.id, { notes: lead.notes.filter(n => n.id !== noteId) })
  }

  const currentStage = STAGES.find(s => s.slug === lead.stage)

  return (
    <SlideOver isOpen={!!leadId} onClose={onClose} title="Lead Details">
      <div className="flex flex-col gap-6 px-6 py-5 pb-8">
        {/* Name */}
        <Field label="Name">
          <InlineInput
            value={lead.name}
            onChange={update('name')}
            placeholder="Lead name"
          />
        </Field>

        {/* Stage + Platform row */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Stage">
            <select
              value={lead.stage}
              onChange={e => {
                const slug = e.target.value
                const statusMap = { won: 'won', lost: 'lost' }
                onUpdate(lead.id, { stage: slug, status: statusMap[slug] || 'open' })
              }}
              className="w-full text-sm rounded-lg border border-surface-200 dark:border-dark-200 bg-surface-50 dark:bg-dark-100 text-surface-700 dark:text-dark-900 px-3 py-2 outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-standard"
            >
              {STAGE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </Field>
          <Field label="Platform">
            <select
              value={lead.platform}
              onChange={update('platform')}
              className="w-full text-sm rounded-lg border border-surface-200 dark:border-dark-200 bg-surface-50 dark:bg-dark-100 text-surface-700 dark:text-dark-900 px-3 py-2 outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-standard"
            >
              {PLATFORM_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </Field>
        </div>

        {/* Deal Value + Follow-up */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Deal Value">
            <InlineInput
              type="number"
              min="0"
              prefix="£"
              value={lead.dealValue || ''}
              onChange={updateDealValue}
              placeholder="0"
            />
          </Field>
          <Field label="Follow-up Date">
            <input
              type="date"
              value={lead.followUpDate || ''}
              onChange={update('followUpDate')}
              className="w-full text-sm rounded-lg border border-surface-200 dark:border-dark-200 bg-surface-50 dark:bg-dark-100 text-surface-700 dark:text-dark-900 px-3 py-2 outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-standard"
            />
          </Field>
        </div>

        {/* Meta info */}
        <div className="flex items-center gap-4 text-xs text-surface-600 dark:text-dark-600 font-mono bg-surface-50 dark:bg-dark-100 rounded-lg px-3 py-2.5 border border-surface-100 dark:border-dark-200">
          <div className="flex flex-col gap-0.5">
            <span className="text-surface-300 dark:text-dark-300 font-sans uppercase tracking-wide" style={{fontSize:'10px'}}>Added</span>
            <span>{formatDate(lead.dateAdded?.split('T')[0])}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-surface-300 dark:text-dark-300 font-sans uppercase tracking-wide" style={{fontSize:'10px'}}>Status</span>
            <span className="capitalize">{lead.status}</span>
          </div>
          <div className="flex flex-col gap-0.5 break-all">
            <span className="text-surface-300 dark:text-dark-300 font-sans uppercase tracking-wide" style={{fontSize:'10px'}}>ID</span>
            <span className="truncate max-w-[120px]" title={lead.id}>{lead.id.slice(0, 8)}…</span>
          </div>
        </div>

        {/* Notes */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-medium text-surface-600 dark:text-dark-600 uppercase tracking-wide">Notes</span>

          {(lead.notes || []).length === 0 && (
            <p className="text-sm text-surface-600 dark:text-dark-600 italic">No notes yet.</p>
          )}

          <div className="flex flex-col gap-2">
            {(lead.notes || []).slice().reverse().map(note => (
              <div
                key={note.id}
                className="bg-surface-50 dark:bg-dark-100 rounded-lg px-3 py-2.5 border border-surface-100 dark:border-dark-200 group relative"
              >
                <p className="text-sm text-surface-700 dark:text-dark-900 whitespace-pre-wrap leading-relaxed pr-5">{note.text}</p>
                <p className="text-xs font-mono text-surface-600 dark:text-dark-600 mt-1">{formatRelative(note.createdAt)}</p>
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-surface-300 dark:text-dark-300 hover:text-red-500 transition-standard"
                  aria-label="Delete note"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <Textarea
              placeholder="Add a note…"
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              rows={3}
              onKeyDown={e => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleAddNote()
              }}
            />
            <Button
              variant="secondary"
              size="sm"
              onClick={handleAddNote}
              disabled={!noteText.trim()}
              className="self-end"
            >
              Add Note
            </Button>
          </div>
        </div>

        {/* Delete */}
        <div className="border-t border-surface-100 dark:border-dark-200 pt-4 mt-2">
          {!confirmDelete ? (
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              onClick={() => setConfirmDelete(true)}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 3.5h9M4.5 3.5V2.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5v1M5.5 6v3M7.5 6v3M3 3.5l.5 6.5a.5.5 0 00.5.5h5a.5.5 0 00.5-.5L10 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Delete Lead
            </Button>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm text-surface-600 dark:text-dark-600">Are you sure?</span>
              <Button variant="danger" size="sm" onClick={() => { onDelete(lead.id); onClose() }}>Yes, delete</Button>
              <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(false)}>Cancel</Button>
            </div>
          )}
        </div>
      </div>
    </SlideOver>
  )
}
