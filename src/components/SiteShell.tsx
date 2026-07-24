'use client'

import { useEffect, useMemo, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useSiteContent } from '@/hooks/useSiteContent'

const onlineStorePreparingMessage = '현재 온라인은 준비중입니다.'

function isNaverStoreLink(href: string, naverStoreHost: string | null): boolean {
  if (!naverStoreHost) return false
  try {
    return new URL(href, window.location.href).hostname === naverStoreHost
  } catch {
    return false
  }
}

export function SiteShell({ children }: { children: ReactNode }) {
  const { content } = useSiteContent()
  const pathname = usePathname()
  const naverStoreHost = useMemo(() => {
    try {
      return new URL(content.naverStoreUrl).hostname
    } catch {
      return null
    }
  }, [content.naverStoreUrl])

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return

      const target = event.target as Element | null
      const link = target?.closest<HTMLAnchorElement>('a[href]')
      if (!link) return

      if (isNaverStoreLink(link.href, naverStoreHost)) {
        event.preventDefault()
        window.alert(onlineStorePreparingMessage)
      }
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [naverStoreHost])

  useEffect(() => {
    window.requestAnimationFrame(() => {
      const hash = window.location.hash
      if (hash) {
        document.getElementById(hash.slice(1))?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
        return
      }
      window.scrollTo({ top: 0 })
    })
  }, [pathname])

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash
      if (!hash) return
      document.getElementById(hash.slice(1))?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return (
    <>
      <a href="#main" className="skip-link">
        본문으로 건너뛰기
      </a>
      <Header />
      {children}
      <Footer />
    </>
  )
}
