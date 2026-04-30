import React from 'react'

export default function Textarea({ label, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-surface-700 dark:text-dark-700">
          {label}
        </label>
      )}
      <textarea
        className={`w-full rounded-lg border border-surface-200 dark:border-dark-200 bg-surface-0 dark:bg-dark-100 text-surface-700 dark:text-dark-900 placeholder-surface-300 dark:placeholder-dark-300 text-sm transition-standard outline-none focus:border-accent focus:ring-1 focus:ring-accent px-3 py-2 resize-none ${className}`}
        {...props}
      />
    </div>
  )
}
