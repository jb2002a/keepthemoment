import type { CSSProperties } from 'react'
import { useSiteContent } from '../hooks/useSiteContent'

export function Fragrance() {
  const { content } = useSiteContent()
  const { fragrancePage } = content

  return (
    <section className="section fragrance-page" aria-labelledby="fragrance-heading">
      <div className="section__inner">
        <div className="section__intro section__intro--split fragrance-page__intro">
          <div>
            <p className="section__eyebrow">{fragrancePage.eyebrow}</p>
            <h1 id="fragrance-heading" className="section__title">
              {fragrancePage.title}
            </h1>
          </div>
          <p className="fragrance-page__lead">{fragrancePage.lead}</p>
        </div>

        <ul className="fragrance-page__grid" aria-label="입점 프래그런스 브랜드">
          {fragrancePage.brands.map((brand) => (
            <li key={brand.id}>
              <a
                href={brand.href}
                className={
                  brand.darkLogo
                    ? 'fragrance-brand-card fragrance-brand-card--dark-logo'
                    : 'fragrance-brand-card'
                }
                style={{ '--logo-width': brand.logoWidth } as CSSProperties}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${brand.name} 공식 사이트로 이동`}
              >
                <div className="fragrance-brand-card__media">
                  <img
                    src={brand.image}
                    alt={brand.alt}
                    width="700"
                    height="460"
                    loading="lazy"
                  />
                </div>
              </a>
            </li>
          ))}
        </ul>

        <div className="fragrance-page__note">
          <p>{fragrancePage.note}</p>
          <a href="/#visit" className="text-link">
            Visit Store
          </a>
        </div>
      </div>
    </section>
  )
}
