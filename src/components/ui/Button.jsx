import React from 'react'

const variants = {
  primary: 'bg-accent text-white hover:bg-accent-hover focus:ring-2 focus:ring-accent focus:ring-offset-2 dark:focus:ring-offset-dark-50',
  secondary: 'bg-surface-100 dark:bg-dark-200 text-surface-700 dark:text-dark-700 hover:bg-surface-200 dark:hover:bg-dark-300 border border-surface-200 dark:border-dark-200',
  ghost: 'text-surface-600 dark:text-dark-600 hover:bg-surface-100 dark:hover:bg-dark-100',
  danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-1.5 font-medium rounded-lg transition-standard outline-none disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
