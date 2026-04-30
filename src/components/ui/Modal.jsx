import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const SIZES = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg' }

export default function Modal({ isOpen, onClose, title, size = 'md', children }) {
  const panelRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
          e.preventDefault()
          ;(e.shiftKey ? last : first)?.focus()
        }
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => panelRef.current?.querySelector('input, select, textarea, button')?.focus(), 50)
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-modal"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`relative w-full ${SIZES[size]} bg-surface-0 dark:bg-dark-50 rounded-2xl shadow-modal border border-surface-200 dark:border-dark-200 flex flex-col max-h-[90vh] transition-modal`}
        style={{ animation: 'modalIn 0.2s ease forwards' }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-100 dark:border-dark-200 shrink-0">
          <h2 className="font-semibold text-base text-surface-700 dark:text-dark-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-surface-600 dark:text-dark-600 hover:text-surface-700 dark:hover:text-dark-700 p-1 rounded-lg hover:bg-surface-100 dark:hover:bg-dark-100 transition-standard"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto">{children}</div>
      </div>
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>,
    document.body
  )
}
