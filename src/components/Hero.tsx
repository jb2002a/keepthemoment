import { hero } from '../data/siteData'

export function Hero() {
  return (
    <section className="hero" id="top" aria-label="KEEP THE MOMENT main hero">
      <figure className="hero__media">
        <img
          className="hero__image"
          src={hero.image.src}
          alt={hero.image.alt}
          width="1024"
          height="682"
          loading="eager"
          fetchPriority="high"
        />
      </figure>
    </section>
  )
}
