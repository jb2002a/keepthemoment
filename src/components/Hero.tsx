import { useCallback, useEffect, useRef, useState } from 'react'
import { useSiteContent } from '../hooks/useSiteContent'

const AUTO_ADVANCE_MS = 5500

export function Hero() {
  const { content } = useSiteContent()
  const { images } = content.hero
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef<number | null>(null)

  const goTo = useCallback((index: number) => {
    if (images.length === 0) return
    setActiveIndex((index + images.length) % images.length)
  }, [images.length])

  const goNext = useCallback(() => {
    if (images.length === 0) return
    setActiveIndex((index) => (index + 1) % images.length)
  }, [images.length])

  const goPrev = useCallback(() => {
    if (images.length === 0) return
    setActiveIndex((index) => (index - 1 + images.length) % images.length)
  }, [images.length])

  useEffect(() => {
    if (images.length <= 1 || isPaused) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) return

    const timer = window.setInterval(() => {
      goNext()
    }, AUTO_ADVANCE_MS)

    return () => window.clearInterval(timer)
  }, [images.length, isPaused, goNext])

  if (images.length === 0) return null

  return (
    <section
      className="hero"
      id="top"
      aria-label="KEEP THE MOMENT main hero"
      aria-roledescription="carousel"
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
        if (touchStartX.current === null) return
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
        {images.map((image, index) => (
          <figure
            key={image.src}
            className={`hero__slide${index === activeIndex ? ' is-active' : ''}`}
            aria-hidden={index !== activeIndex}
          >
            <img
              className="hero__image"
              src={image.src}
              alt={image.alt}
              width="1024"
              height="682"
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
            />
          </figure>
        ))}
      </div>

      {images.length > 1 ? (
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
            {images.map((image, index) => (
              <button
                key={image.src}
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
