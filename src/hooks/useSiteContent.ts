'use client'

import { useContext } from 'react'
import { SiteContentContext } from '../context/siteContentContextBase'

export function useSiteContent() {
  const context = useContext(SiteContentContext)
  if (!context) {
    throw new Error('useSiteContent must be used within SiteContentProvider')
  }
  return context
}
