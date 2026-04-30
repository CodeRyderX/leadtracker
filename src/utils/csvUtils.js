function escapeField(val) {
  const str = val == null ? '' : String(val)
  return `"${str.replace(/"/g, '""')}"`
}

export function buildCsvContent(leads) {
  const headers = ['ID', 'Name', 'Platform', 'Stage', 'Deal Value (£)', 'Follow-up Date', 'Date Added', 'Status', 'Notes']
  const rows = leads.map(lead => {
    const notes = (lead.notes || []).map(n => n.text).join(' | ')
    return [
      lead.id,
      lead.name,
      lead.platform,
      lead.stage,
      lead.dealValue,
      lead.followUpDate || '',
      lead.dateAdded,
      lead.status,
      notes,
    ].map(escapeField)
  })
  return [headers.map(escapeField), ...rows].map(r => r.join(',')).join('\r\n')
}
