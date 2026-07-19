import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { loadSiteContent } from '../data/cmsData'
import { getFallbackSiteContent, type SiteContent } from '../data/siteContent'
import {
  SiteContentContext,
  type SiteContentContextValue,
} from './siteContentContextBase'

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(() => getFallbackSiteContent())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const reload = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const next = await loadSiteContent()
      setContent(next)
    } catch (err) {
      setError(err instanceof Error ? err.message : '콘텐츠를 불러오지 못했습니다.')
      setContent(getFallbackSiteContent())
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void reload()
  }, [reload])

  const value = useMemo<SiteContentContextValue>(
    () => ({
      content,
      loading,
      error,
      reload,
    }),
    [content, loading, error, reload],
  )

  return (
    <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>
  )
}
