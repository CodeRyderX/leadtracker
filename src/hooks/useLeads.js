import { useState, useEffect } from 'react'
import { generateId } from '../utils/idUtils'

const STORAGE_KEY = 'leadtracker_leads'

const SEED_LEADS = [
  {
    id: generateId(),
    name: 'Sarah Mitchell — E-commerce Redesign',
    platform: 'upwork',
    stage: 'prospecting',
    dealValue: 0,
    followUpDate: '',
    notes: [],
    dateAdded: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'open',
  },
  {
    id: generateId(),
    name: 'James Okafor — SaaS Dashboard UI',
    platform: 'linkedin',
    stage: 'in_discussion',
    dealValue: 4500,
    followUpDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: [
      {
        id: generateId(),
        text: 'Had a 30-min discovery call. Wants a full product redesign starting Q2. Budget confirmed £4,500.',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    dateAdded: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'open',
  },
  {
    id: generateId(),
    name: 'The Bloom Studio — Brand Identity',
    platform: 'referral',
    stage: 'proposal_sent',
    dealValue: 2800,
    followUpDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: [
      {
        id: generateId(),
        text: 'Referred by Alex Chen. Sent proposal on Monday. Awaiting feedback on pricing.',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    dateAdded: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'open',
  },
  {
    id: generateId(),
    name: 'Marco Bianchi — Mobile App MVP',
    platform: 'warm_outreach',
    stage: 'won',
    dealValue: 7200,
    followUpDate: '',
    notes: [
      {
        id: generateId(),
        text: 'Contract signed! Kickoff call scheduled for next week. 50% upfront paid.',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    dateAdded: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'won',
  },
]

function loadLeads() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function saveLeads(leads) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads))
  } catch {
    // storage unavailable
  }
}

export function useLeads() {
  const [leads, setLeads] = useState(() => {
    const stored = loadLeads()
    if (stored && stored.length > 0) return stored
    saveLeads(SEED_LEADS)
    return SEED_LEADS
  })

  useEffect(() => {
    saveLeads(leads)
  }, [leads])

  function addLead(data) {
    const lead = {
      id: generateId(),
      name: data.name,
      platform: data.platform || 'other',
      stage: data.stage || 'prospecting',
      dealValue: Number(data.dealValue) || 0,
      followUpDate: data.followUpDate || '',
      notes: [],
      dateAdded: new Date().toISOString(),
      status: data.stage === 'won' ? 'won' : data.stage === 'lost' ? 'lost' : 'open',
    }
    setLeads(prev => [lead, ...prev])
    return lead
  }

  function updateLead(id, changes) {
    setLeads(prev =>
      prev.map(l => (l.id === id ? { ...l, ...changes } : l))
    )
  }

  function deleteLead(id) {
    setLeads(prev => prev.filter(l => l.id !== id))
  }

  function moveLeadToStage(id, stageSlug) {
    const statusMap = { won: 'won', lost: 'lost' }
    const status = statusMap[stageSlug] || 'open'
    setLeads(prev =>
      prev.map(l => (l.id === id ? { ...l, stage: stageSlug, status } : l))
    )
  }

  return { leads, addLead, updateLead, deleteLead, moveLeadToStage }
}
