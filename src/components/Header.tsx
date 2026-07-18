import { useEffect, useId, useRef, useState } from 'react'
import { brand, navItems } from '../data/siteData'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const wasOpen = useRef(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''

    if (menuOpen) {
      wasOpen.current = true
      closeButtonRef.current?.focus()
    } else if (wasOpen.current) {
      menuButtonRef.current?.focus()
      wasOpen.current = false
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const handleNavClick = () => setMenuOpen(false)

  return (
    <>
      <header
        className={`site-header ${scrolled || menuOpen ? 'is-solid' : ''} ${
          menuOpen ? 'is-menu-open' : ''
        }`.trim()}
      >
        <div className="site-header__inner">
          <a href="/" className="site-logo">
            {brand.name}
          </a>

          <nav className="site-nav" aria-label="주요 메뉴">
            <ul className="site-nav__list">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="menu-toggle__bars" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      <div
        id={menuId}
        className={`mobile-menu ${menuOpen ? 'is-open' : ''}`.trim()}
        hidden={!menuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="전체 메뉴"
      >
        <div className="mobile-menu__top">
          <a href="/" className="site-logo" onClick={handleNavClick}>
            {brand.name}
          </a>
          <button
            ref={closeButtonRef}
            type="button"
            className="menu-toggle"
            aria-label="메뉴 닫기"
            onClick={() => setMenuOpen(false)}
          >
            <span className="menu-toggle__close" aria-hidden="true">
              ×
            </span>
          </button>
        </div>
        <nav aria-label="모바일 메뉴">
          <ul className="mobile-menu__list">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={item.href} onClick={handleNavClick}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}
