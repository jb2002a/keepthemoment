import { createContext } from 'react'
import type { SiteContent } from '../data/siteContent'

export type SiteContentContextValue = {
  content: SiteContent
  loading: boolean
  error: string | null
  reload: () => Promise<void>
}

export const SiteContentContext = createContext<SiteContentContextValue | null>(null)
