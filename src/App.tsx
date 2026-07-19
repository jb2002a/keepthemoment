import { useEffect, useMemo, useState } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Collections } from './components/Collections'
import { BrandStory } from './components/BrandStory'
import { PlantCare } from './components/PlantCare'
import { PlantItems } from './components/PlantItems'
import { Gift } from './components/Gift'
import { Store } from './components/Store'
import { Footer } from './components/Footer'
import { useSiteContent } from './hooks/useSiteContent'

const routes = ['/', '/about', '/care', '/plants', '/gift', '/visit'] as const
type Route = (typeof routes)[number]
const siteUrl = 'https://keepthemoment-one.vercel.app'
const onlineStorePreparingMessage = '현재 온라인은 준비중입니다.'
const pageSeo: Record<Route, { title: string; description: string }> = {
  '/': {
    title: 'KEEP THE MOMENT | 수원 행궁동 수경식물·식물 선물 브랜드',
    description:
      '수원 행궁동의 수경식물, 희귀식물, 식물 선물 라이프스타일 브랜드 KEEP THE MOMENT. 물에서 키우기 쉬운 식물 오브제를 만나보세요.',
  },
  '/about': {
    title: '브랜드 스토리 | KEEP THE MOMENT',
    description:
      '식물과 향기, 선물로 오늘의 기억을 디자인하는 수원 행궁동 라이프스타일 브랜드 KEEP THE MOMENT를 소개합니다.',
  },
  '/care': {
    title: '수경식물 관리법 | KEEP THE MOMENT',
    description:
      '물과 흙 모두에 잘 적응하는 수경식물 관리법과 키우기 쉬운 식물 오브제 이야기를 확인하세요.',
  },
  '/plants': {
    title: '수원 수경식물 컬렉션 | KEEP THE MOMENT',
    description:
      '몬스테라, 스킨답서스, 아글라오네마 등 수원 행궁동에서 만나는 수경식물과 희귀식물 컬렉션.',
  },
  '/gift': {
    title: '식물 선물 패키지 | KEEP THE MOMENT',
    description:
      'KEEP THE MOMENT의 식물을 패키지 형식과 포장 형식으로 선물할 수 있는 안내를 확인하세요.',
  },
  '/visit': {
    title: '행궁동 매장 방문 | KEEP THE MOMENT',
    description:
      '경기 수원시 팔달구 행궁동에 위치한 KEEP THE MOMENT 매장 주소, 영업시간, 방문 정보를 확인하세요.',
  },
}

function getRoute(): Route {
  const path = window.location.pathname
  return routes.includes(path as Route) ? (path as Route) : '/'
}

function isNaverStoreLink(href: string, naverStoreHost: string | null): boolean {
  if (!naverStoreHost) return false
  try {
    return new URL(href, window.location.href).hostname === naverStoreHost
  } catch {
    return false
  }
}

function updateMeta(name: string, content: string) {
  const selector = `meta[name="${name}"]`
  let meta = document.head.querySelector<HTMLMetaElement>(selector)

  if (!meta) {
    meta = document.createElement('meta')
    meta.name = name
    document.head.appendChild(meta)
  }

  meta.content = content
}

function updatePropertyMeta(property: string, content: string) {
  const selector = `meta[property="${property}"]`
  let meta = document.head.querySelector<HTMLMetaElement>(selector)

  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('property', property)
    document.head.appendChild(meta)
  }

  meta.content = content
}

function updateCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')

  if (!link) {
    link = document.createElement('link')
    link.rel = 'canonical'
    document.head.appendChild(link)
  }

  link.href = href
}

function App() {
  const { content } = useSiteContent()
  const [route, setRoute] = useState(getRoute)
  const [hash, setHash] = useState(window.location.hash)
  const [navigationVersion, setNavigationVersion] = useState(0)
  const naverStoreHost = useMemo(() => {
    try {
      return new URL(content.naverStoreUrl).hostname
    } catch {
      return null
    }
  }, [content.naverStoreUrl])

  useEffect(() => {
    const onPopState = () => {
      setRoute(getRoute())
      setHash(window.location.hash)
      setNavigationVersion((version) => version + 1)
    }

    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return

      const target = event.target as Element | null
      const link = target?.closest<HTMLAnchorElement>('a[href]')
      if (!link) return

      if (isNaverStoreLink(link.href, naverStoreHost)) {
        event.preventDefault()
        window.alert(onlineStorePreparingMessage)
        return
      }

      if (event.metaKey || event.ctrlKey) return

      if (link.target || link.hasAttribute('download')) return

      const url = new URL(link.href)
      if (url.origin !== window.location.origin) return
      if (!routes.includes(url.pathname as Route)) return

      event.preventDefault()
      window.history.pushState(null, '', `${url.pathname}${url.hash}`)
      setRoute(getRoute())
      setHash(url.hash)
      setNavigationVersion((version) => version + 1)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [naverStoreHost])

  useEffect(() => {
    window.requestAnimationFrame(() => {
      if (hash) {
        document.getElementById(hash.slice(1))?.scrollIntoView()
        return
      }

      window.scrollTo({ top: 0 })
    })
  }, [route, hash, navigationVersion])

  useEffect(() => {
    const seo = pageSeo[route]
    const canonicalUrl = `${siteUrl}${route === '/' ? '/' : route}`
    document.title = seo.title
    updateMeta('description', seo.description)
    updateMeta('twitter:title', seo.title)
    updateMeta('twitter:description', seo.description)
    updatePropertyMeta('og:title', seo.title)
    updatePropertyMeta('og:description', seo.description)
    updatePropertyMeta('og:url', canonicalUrl)
    updateCanonical(canonicalUrl)
  }, [route])

  return (
    <>
      <a href="#main" className="skip-link">
        본문으로 건너뛰기
      </a>
      <Header />
      {route === '/' && <HomePage />}
      {route === '/about' && <AboutPage />}
      {route === '/care' && <CarePage />}
      {route === '/plants' && <PlantsPage />}
      {route === '/gift' && <GiftPage />}
      {route === '/visit' && <VisitPage />}
      <Footer />
    </>
  )
}

function HomePage() {
  return (
    <main id="main">
      <Hero />
      <Collections />
      <Store />
      <HomeLinks />
    </main>
  )
}

function HomeLinks() {
  return (
    <section className="section home-links" aria-label="More about KEEP THE MOMENT">
      <div className="section__inner">
        <div className="home-links__grid">
          <a href="/about" className="home-link-card">
            <span className="section__eyebrow">Brand Story</span>
            <strong>Nature & Memory.</strong>
            <span>일상에 스며드는 식물의 철학.</span>
          </a>
          <a href="/care" className="home-link-card">
            <span className="section__eyebrow">Care Guide</span>
            <strong>Water & Soil.</strong>
            <span>물과 흙 모두에 잘 적응하는 식물.</span>
          </a>
          <a href="/#visit" className="home-link-card">
            <span className="section__eyebrow">Visit</span>
            <strong>Haenggung Store.</strong>
            <span>공간과 운영 정보를 확인하세요.</span>
          </a>
        </div>
      </div>
    </section>
  )
}

function AboutPage() {
  return (
    <main id="main" className="page-main">
      <BrandStory />
    </main>
  )
}

function CarePage() {
  return (
    <main id="main" className="page-main">
      <PlantCare />
    </main>
  )
}

function PlantsPage() {
  return (
    <main id="main" className="page-main">
      <PlantItems />
    </main>
  )
}

function GiftPage() {
  return (
    <main id="main" className="page-main">
      <Gift />
    </main>
  )
}

function VisitPage() {
  return (
    <main id="main" className="page-main">
      <Store />
    </main>
  )
}

export default App
