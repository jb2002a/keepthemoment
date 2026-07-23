'use client'

import {
  useEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'article' | 'li'
  delay?: number
}

export function Reveal({
  children,
  className = '',
  as = 'div',
  delay = 0,
}: RevealProps) {
  const Tag = as as ElementType
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReduced) {
      node.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
