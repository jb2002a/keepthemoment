import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Collections } from './components/Collections'
import { NewArrivals } from './components/NewArrivals'
import { BrandStory } from './components/BrandStory'
import { PlantCare } from './components/PlantCare'
import { Store } from './components/Store'
import { Footer } from './components/Footer'
import { naverStoreUrl } from './data/siteData'

const routes = ['/', '/about', '/care', '/visit'] as const
type Route = (typeof routes)[number]
const onlineStorePreparingMessage = '현재 온라인은 준비중입니다.'
const naverStoreHost = new URL(naverStoreUrl).hostname

function getRoute(): Route {
  const path = window.location.pathname
  return routes.includes(path as Route) ? (path as Route) : '/'
}

function isNaverStoreLink(href: string): boolean {
  try {
    return new URL(href, window.location.href).hostname === naverStoreHost
  } catch {
    return false
  }
}

function App() {
  const [route, setRoute] = useState(getRoute)
  const [hash, setHash] = useState(window.location.hash)
  const [navigationVersion, setNavigationVersion] = useState(0)

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

      if (isNaverStoreLink(link.href)) {
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
  }, [])

  useEffect(() => {
    window.requestAnimationFrame(() => {
      if (hash) {
        document.getElementById(hash.slice(1))?.scrollIntoView()
        return
      }

      window.scrollTo({ top: 0 })
    })
  }, [route, hash, navigationVersion])

  return (
    <>
      <a href="#main" className="skip-link">
        본문으로 건너뛰기
      </a>
      <Header />
      {route === '/' && <HomePage />}
      {route === '/about' && <AboutPage />}
      {route === '/care' && <CarePage />}
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
      <NewArrivals />
      <Store />
      <HomeLinks />
    </main>
  )
}

function HomeLinks() {
  return (
    <section className="section home-links" aria-label="More about Keep The Moment">
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

function VisitPage() {
  return (
    <main id="main" className="page-main">
      <Store />
    </main>
  )
}

export default App
