import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export default function SlideOver({ isOpen, onClose, title, children }) {
  const panelRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setMounted(true)
      setTimeout(() => setVisible(true), 10)
    } else {
      setVisible(false)
      const t = setTimeout(() => setMounted(false), 250)
      return () => clearTimeout(t)
    }
  }, [isOpen])

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
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px] transition-modal"
        style={{ opacity: visible ? 1 : 0 }}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative w-[480px] max-w-full h-full bg-surface-0 dark:bg-dark-50 shadow-modal border-l border-surface-200 dark:border-dark-200 flex flex-col transition-all duration-250 ease-out"
        style={{ transform: visible ? 'translateX(0)' : 'translateX(100%)' }}
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
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>,
    document.body
  )
}
