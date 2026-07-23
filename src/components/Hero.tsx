'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useSiteContent } from '../hooks/useSiteContent'

const AUTO_ADVANCE_MS = 5500
const MOBILE_MQ = '(max-width: 720px)'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(MOBILE_MQ).matches : false,
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_MQ)
    const onChange = () => setIsMobile(mediaQuery.matches)
    onChange()
    mediaQuery.addEventListener('change', onChange)
    return () => mediaQuery.removeEventListener('change', onChange)
  }, [])

  return isMobile
}

export function Hero() {
  const { content } = useSiteContent()
  const isMobile = useIsMobile()
  const slides = content.hero.images.filter(
    (image) => isMobile || !image.mobileOnly,
  )
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    setActiveIndex((index) => (index >= slides.length ? 0 : index))
  }, [slides.length])

  const goTo = useCallback(
    (index: number) => {
      if (slides.length === 0) return
      setActiveIndex((index + slides.length) % slides.length)
    },
    [slides.length],
  )

  const goNext = useCallback(() => {
    if (slides.length === 0) return
    setActiveIndex((index) => (index + 1) % slides.length)
  }, [slides.length])

  const goPrev = useCallback(() => {
    if (slides.length === 0) return
    setActiveIndex((index) => (index - 1 + slides.length) % slides.length)
  }, [slides.length])

  useEffect(() => {
    if (slides.length <= 1 || isPaused) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) return

    const timer = window.setInterval(() => {
      goNext()
    }, AUTO_ADVANCE_MS)

    return () => window.clearInterval(timer)
  }, [slides.length, isPaused, goNext])

  if (slides.length === 0) return null

  return (
    <section
      className="hero"
      id="top"
      aria-label="KEEP THE MOMENT main hero"
      aria-roledescription={slides.length > 1 ? 'carousel' : undefined}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false)
        }
      }}
      onTouchStart={(event) => {
        touchStartX.current = event.changedTouches[0]?.clientX ?? null
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null || slides.length <= 1) return
        const deltaX =
          (event.changedTouches[0]?.clientX ?? touchStartX.current) -
          touchStartX.current
        touchStartX.current = null
        if (Math.abs(deltaX) < 48) return
        if (deltaX < 0) goNext()
        else goPrev()
      }}
    >
      <div className="hero__track">
        {slides.map((image, index) => (
          <figure
            key={image.mobileSrc ?? image.src}
            className={[
              'hero__slide',
              index === activeIndex ? 'is-active' : '',
              image.mobileOnly ? 'hero__slide--focus-bottom' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-hidden={index !== activeIndex}
          >
            <picture>
              {image.mobileSrc ? (
                <source
                  media="(max-width: 720px)"
                  srcSet={image.mobileSrc}
                />
              ) : null}
              <img
                className="hero__image"
                src={image.src}
                alt={image.alt}
                width="1024"
                height="682"
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                style={
                  image.objectPosition && (isMobile || image.mobileOnly)
                    ? { objectPosition: image.objectPosition }
                    : undefined
                }
              />
            </picture>
          </figure>
        ))}
      </div>

      {slides.length > 1 ? (
        <>
          <div className="hero__controls">
            <button
              type="button"
              className="hero__arrow hero__arrow--prev"
              aria-label="이전 이미지"
              onClick={goPrev}
            >
              <span aria-hidden="true" />
            </button>
            <button
              type="button"
              className="hero__arrow hero__arrow--next"
              aria-label="다음 이미지"
              onClick={goNext}
            >
              <span aria-hidden="true" />
            </button>
          </div>

          <div className="hero__dots" role="tablist" aria-label="히어로 슬라이드">
            {slides.map((image, index) => (
              <button
                key={image.mobileSrc ?? image.src}
                type="button"
                role="tab"
                className={`hero__dot${index === activeIndex ? ' is-active' : ''}`}
                aria-label={`${index + 1}번째 이미지`}
                aria-selected={index === activeIndex}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
        </>
      ) : null}
    </section>
  )
}
