'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { mediaFocusProps } from '../lib/mediaFocus'
import { useSiteContent } from '../hooks/useSiteContent'

const AUTO_ADVANCE_MS = 5500
const MOBILE_MQ = '(max-width: 720px)'

function getVisibleSlideIndices(
  slides: { mobileOnly?: boolean }[],
  isMobile: boolean,
) {
  return slides.reduce<number[]>((indices, image, index) => {
    if (isMobile || !image.mobileOnly) indices.push(index)
    return indices
  }, [])
}

export function Hero() {
  const { content } = useSiteContent()
  const slides = content.hero.images
  const [isMobile, setIsMobile] = useState(false)
  const [ready, setReady] = useState(false)
  const [activeIndex, setActiveIndex] = useState(() => {
    const firstDesktopSlide = slides.findIndex((image) => !image.mobileOnly)
    return firstDesktopSlide === -1 ? 0 : firstDesktopSlide
  })
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const readyRef = useRef(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_MQ)

    const applyViewport = () => {
      const mobile = mediaQuery.matches
      const nextVisible = getVisibleSlideIndices(slides, mobile)
      setIsMobile(mobile)

      if (!readyRef.current) {
        setActiveIndex(nextVisible[0] ?? 0)
        readyRef.current = true
        setReady(true)
        return
      }

      setActiveIndex((current) =>
        nextVisible.includes(current) ? current : (nextVisible[0] ?? 0),
      )
    }

    applyViewport()
    mediaQuery.addEventListener('change', applyViewport)
    return () => mediaQuery.removeEventListener('change', applyViewport)
  }, [slides])

  const visibleSlideIndices = useMemo(
    () => getVisibleSlideIndices(slides, isMobile),
    [isMobile, slides],
  )
  const visibleSlideSet = useMemo(
    () => new Set(visibleSlideIndices),
    [visibleSlideIndices],
  )
  const visibleSlideCount = visibleSlideIndices.length

  const goTo = useCallback(
    (index: number) => {
      if (!visibleSlideSet.has(index)) return
      setActiveIndex(index)
    },
    [visibleSlideSet],
  )

  const goNext = useCallback(() => {
    if (visibleSlideCount === 0) return
    setActiveIndex((index) => {
      const currentVisibleIndex = visibleSlideIndices.indexOf(index)
      const nextVisibleIndex =
        currentVisibleIndex === -1
          ? 0
          : (currentVisibleIndex + 1) % visibleSlideCount
      return visibleSlideIndices[nextVisibleIndex] ?? index
    })
  }, [visibleSlideCount, visibleSlideIndices])

  const goPrev = useCallback(() => {
    if (visibleSlideCount === 0) return
    setActiveIndex((index) => {
      const currentVisibleIndex = visibleSlideIndices.indexOf(index)
      const prevVisibleIndex =
        currentVisibleIndex === -1
          ? visibleSlideCount - 1
          : (currentVisibleIndex - 1 + visibleSlideCount) % visibleSlideCount
      return visibleSlideIndices[prevVisibleIndex] ?? index
    })
  }, [visibleSlideCount, visibleSlideIndices])

  useEffect(() => {
    if (!ready || visibleSlideCount <= 1 || isPaused) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) return

    const timer = window.setInterval(() => {
      goNext()
    }, AUTO_ADVANCE_MS)

    return () => window.clearInterval(timer)
  }, [ready, visibleSlideCount, isPaused, goNext])

  if (slides.length === 0) return null

  return (
    <section
      className={['hero', ready ? '' : 'hero--pending'].filter(Boolean).join(' ')}
      id="top"
      aria-label="KEEP THE MOMENT main hero"
      aria-roledescription={ready && visibleSlideCount > 1 ? 'carousel' : undefined}
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
        if (!ready || touchStartX.current === null || visibleSlideCount <= 1) return
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
        {slides.map((image, index) => {
          const isVisible = ready && visibleSlideSet.has(index)
          const isActive = isVisible && index === activeIndex

          return (
            <figure
              key={image.mobileSrc ?? image.src}
              className={[
                'hero__slide',
                isActive ? 'is-active' : '',
                image.mobileOnly ? 'hero__slide--mobile-only' : '',
                image.mobileOnly ? 'hero__slide--focus-bottom' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-hidden={!isActive}
            >
              <picture>
                {image.mobileSrc ? (
                  <source
                    media="(max-width: 720px)"
                    srcSet={image.mobileSrc}
                  />
                ) : null}
                <img
                  src={image.src}
                  alt={image.alt}
                  width="1024"
                  height="682"
                  loading={isActive ? 'eager' : 'lazy'}
                  fetchPriority={isActive ? 'high' : 'auto'}
                  {...mediaFocusProps(image, { className: 'hero__image' })}
                />
              </picture>
            </figure>
          )
        })}
      </div>

      {ready && visibleSlideCount > 1 ? (
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
            {visibleSlideIndices.map((slideIndex, dotIndex) => {
              const image = slides[slideIndex]
              if (!image) return null

              return (
                <button
                  key={image.mobileSrc ?? image.src}
                  type="button"
                  role="tab"
                  className={`hero__dot${slideIndex === activeIndex ? ' is-active' : ''}`}
                  aria-label={`${dotIndex + 1}번째 이미지`}
                  aria-selected={slideIndex === activeIndex}
                  onClick={() => goTo(slideIndex)}
                />
              )
            })}
          </div>
        </>
      ) : null}
    </section>
  )
}
