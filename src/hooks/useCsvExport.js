import { buildCsvContent } from '../utils/csvUtils'

export function useCsvExport() {
  function exportCsv(leads) {
    const csv = buildCsvContent(leads)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `leadtracker-export-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return { exportCsv }
}
