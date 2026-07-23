import type { CSSProperties } from 'react'
import { fragranceBrands } from '../data/siteData'

export function Fragrance() {
  return (
    <section className="section fragrance-page" aria-labelledby="fragrance-heading">
      <div className="section__inner">
        <div className="section__intro section__intro--split fragrance-page__intro">
          <div>
            <p className="section__eyebrow">Fragrance</p>
            <h1 id="fragrance-heading" className="section__title">
              Scented Moments.
            </h1>
          </div>
          <p className="fragrance-page__lead">
            KEEP THE MOMENT에서 만날 수 있는 프래그런스 브랜드입니다. 식물과 함께
            공간에 남는 향을 매장에서 직접 경험해보세요.
          </p>
        </div>

        <ul className="fragrance-page__grid" aria-label="입점 프래그런스 브랜드">
          {fragranceBrands.map((brand) => (
            <li key={brand.id}>
              <a
                href={brand.href}
                className={
                  brand.id === 'the-other-mood'
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
          <p>
            브랜드별 입고 상품과 재고는 시즌과 매장 상황에 따라 달라질 수 있는 점
            참고부탁드립니다.
          </p>
          <a href="/#visit" className="text-link">
            Visit Store
          </a>
        </div>
      </div>
    </section>
  )
}
