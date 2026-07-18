import { hero } from '../data/siteData'

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-heading">
      <figure className="hero__media">
        <img
          className="hero__image"
          src={hero.image.src}
          alt={hero.image.alt}
          width="3840"
          height="2160"
          loading="eager"
          fetchPriority="high"
        />
      </figure>
      <div className="hero__content">
        <div className="hero__content-inner">
          <h1 id="hero-heading" className="hero__title">
            {hero.headline}
          </h1>
          <p className="hero__subcopy">{hero.subcopy}</p>
          <a href={hero.ctaHref} className="hero__cta">
            {hero.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  )
}
