import React from 'react'

export default function Input({ label, error, prefix, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-surface-700 dark:text-dark-700">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3 text-surface-600 dark:text-dark-600 text-sm pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          className={`w-full rounded-lg border border-surface-200 dark:border-dark-200 bg-surface-0 dark:bg-dark-100 text-surface-700 dark:text-dark-900 placeholder-surface-300 dark:placeholder-dark-300 text-sm transition-standard outline-none focus:border-accent focus:ring-1 focus:ring-accent ${prefix ? 'pl-7' : 'pl-3'} pr-3 py-2 ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  )
}
