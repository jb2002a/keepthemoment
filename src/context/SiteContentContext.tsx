'use client'

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { getFallbackSiteContent, type SiteContent } from '../data/siteContent'
import {
  SiteContentContext,
  type SiteContentContextValue,
} from './siteContentContextBase'

type Props = {
  children: ReactNode
  initialContent?: SiteContent
}

export function SiteContentProvider({ children, initialContent }: Props) {
  const [content, setContent] = useState<SiteContent>(
    () => initialContent ?? getFallbackSiteContent(),
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const reload = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/site-content', { cache: 'no-store' })
      if (!response.ok) {
        throw new Error('콘텐츠를 불러오지 못했습니다.')
      }
      const next = (await response.json()) as SiteContent
      setContent(next)
    } catch (err) {
      setError(err instanceof Error ? err.message : '콘텐츠를 불러오지 못했습니다.')
      setContent(initialContent ?? getFallbackSiteContent())
    } finally {
      setLoading(false)
    }
  }, [initialContent])

  useEffect(() => {
    if (initialContent) {
      setContent(initialContent)
    }
  }, [initialContent])

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
