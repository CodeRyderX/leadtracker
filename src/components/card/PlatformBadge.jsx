import React from 'react'
import { PLATFORM_MAP } from '../../constants/platforms'

export default function PlatformBadge({ platform }) {
  const p = PLATFORM_MAP[platform] || PLATFORM_MAP.other
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
      style={{ backgroundColor: p.colour + '22', color: p.colour }}
    >
      {p.label}
    </span>
  )
}
