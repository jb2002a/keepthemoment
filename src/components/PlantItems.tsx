import { useEffect, useState } from 'react'
import { useSiteContent } from '../hooks/useSiteContent'
import type { PlantItem } from '../data/siteData'
import { Reveal } from './Reveal'

type CareIconCategory = 'light' | 'water' | 'temperature'

function CareIcon({
  category,
  value,
}: {
  category: CareIconCategory
  value: string
}) {
  if (category === 'light') {
    if (value.includes('·')) {
      return (
        <svg className="plant-care-icon" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="8" cy="9" r="2.7" />
          <path d="M8 3v2M8 13v2M2 9h2M12 9h2M3.76 4.76l1.42 1.42M10.82 11.82l1.42 1.42M3.76 13.24l1.42-1.42M10.82 6.18l1.42-1.42" />
          <path d="M17.6 6.2a5.8 5.8 0 1 0 0 11.6 5.1 5.1 0 0 1 0-11.6Z" />
        </svg>
      )
    }

    if (value.includes('음지') || value.includes('그늘')) {
      return (
        <svg className="plant-care-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15.5 3.5a8.5 8.5 0 1 0 5 15.4 7.2 7.2 0 0 1-5-15.4Z" />
          <path d="M5 19.5h14" />
        </svg>
      )
    }

    return (
      <svg className="plant-care-icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
      </svg>
    )
  }

  if (category === 'water') {
    if (value.includes('뿌리')) {
      return (
        <svg className="plant-care-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3.5S8 8.2 8 11.3a4 4 0 0 0 8 0C16 8.2 12 3.5 12 3.5Z" />
          <path d="M12 15.5v5M12 18c-2.2 0-3.6.8-4.5 2M12 18c2.2 0 3.6.8 4.5 2" />
        </svg>
      )
    }

    if (value.includes('속흙')) {
      return (
        <svg className="plant-care-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9.5 4S6 8.2 6 11a3.5 3.5 0 0 0 7 0C13 8.2 9.5 4 9.5 4Z" />
          <path d="M15.5 8s-2.5 3-2.5 5a2.5 2.5 0 0 0 5 0c0-2-2.5-5-2.5-5Z" />
        </svg>
      )
    }

    return (
      <svg className="plant-care-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3.5S6.5 10 6.5 14.2a5.5 5.5 0 0 0 11 0C17.5 10 12 3.5 12 3.5Z" />
        <path d="M9.5 15.5c.45 1.25 1.35 1.9 2.65 1.9" />
      </svg>
    )
  }

  if (value.startsWith('20') || value.startsWith('21')) {
    return (
      <svg className="plant-care-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M10 14.5V5.5a2 2 0 1 1 4 0v9a4 4 0 1 1-4 0Z" />
        <path d="M12 8v8M17.5 6.5l1.5-1.5M18.5 10h2M17.5 13.5l1.5 1.5" />
      </svg>
    )
  }

  if (value.includes('30') || value.includes('29')) {
    return (
      <svg className="plant-care-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M10 14.5V5.5a2 2 0 1 1 4 0v9a4 4 0 1 1-4 0Z" />
        <path d="M12 8v8M17 6h3M17 10h2M17 14h3" />
      </svg>
    )
  }

  return (
    <svg className="plant-care-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10 14.5V5.5a2 2 0 1 1 4 0v9a4 4 0 1 1-4 0Z" />
      <path d="M12 8v8M16 7h3M16 11h2" />
    </svg>
  )
}

function PlantGrid({
  items,
  onSelectPlant,
}: {
  items: PlantItem[]
  onSelectPlant: (id: string) => void
}) {
  return (
    <ul className="plant-items__grid">
      {items.map((item, index) => (
        <Reveal as="li" key={item.id} delay={(index % 4) * 70}>
          <article className="plant-card">
            <button
              className="plant-card__media"
              type="button"
              aria-haspopup="dialog"
              onClick={() => onSelectPlant(item.id)}
            >
              <img
                src={item.image}
                alt={item.alt}
                width="900"
                height="1200"
                loading="lazy"
              />
              <span className="plant-card__media-label">View details</span>
            </button>
            <div className="plant-card__body">
              <p className="plant-card__korean-name">{item.koreanName}</p>
              <h2 className="plant-card__name">{item.name}</h2>
            </div>
          </article>
        </Reveal>
      ))}
    </ul>
  )
}

export function PlantItems() {
  const { content } = useSiteContent()
  const { plantItems, rarePlantItems } = content
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null)
  const allPlantItems = [...rarePlantItems, ...plantItems]
  const selectedPlant = allPlantItems.find((item) => item.id === selectedPlantId)

  useEffect(() => {
    if (!selectedPlant) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedPlantId(null)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedPlant])

  return (
    <section
      className="section plant-items"
      aria-labelledby="plant-items-heading"
    >
      <div className="section__inner">
        <Reveal className="section__intro section__intro--split">
          <div>
            <p className="section__eyebrow">Plants</p>
            <h1 id="plant-items-heading" className="section__title">
              Living Objects.
            </h1>
          </div>
          <p className="plant-items__lead">
            <span className="plant-items__lead-default">
              Explore hydroponic plants prepared for keeping the moment close.
            </span>
            <span className="plant-items__lead-mobile">
              물과 흙 모두에 자연스럽게 어울리는 식물을 천천히 살펴보세요.
            </span>
          </p>
        </Reveal>

        <div className="plant-items__sections">
          <section
            className="plant-items__section plant-items__section--rare"
            aria-labelledby="rare-plants-heading"
          >
            <Reveal className="plant-items__section-header">
              <p className="plant-items__section-eyebrow">Rare Foliage</p>
              <h2 id="rare-plants-heading" className="plant-items__section-title">
                Curated Rare Plants.
              </h2>
              <p className="plant-items__section-copy">
                무늬, 엽색, 형태가 뚜렷한 희귀 관엽을 따로 모은 셀렉션입니다.
              </p>
            </Reveal>
            <PlantGrid items={rarePlantItems} onSelectPlant={setSelectedPlantId} />
          </section>

          <section className="plant-items__section" aria-labelledby="plant-collection-heading">
            <Reveal className="plant-items__section-header">
              <p className="plant-items__section-eyebrow">Plant Collection</p>
              <h2 id="plant-collection-heading" className="plant-items__section-title">
                Everyday Greens.
              </h2>
            </Reveal>
            <PlantGrid items={plantItems} onSelectPlant={setSelectedPlantId} />
          </section>
        </div>
      </div>

      {selectedPlant && (
        <div
          className="plant-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="plant-modal-title"
          onClick={() => setSelectedPlantId(null)}
        >
          <div className="plant-modal__panel" onClick={(event) => event.stopPropagation()}>
            <button
              className="plant-modal__close"
              type="button"
              aria-label="Close plant details"
              onClick={() => setSelectedPlantId(null)}
            >
              Close
            </button>
            <div className="plant-modal__media">
              <img
                src={selectedPlant.image}
                alt={selectedPlant.alt}
                width="900"
                height="1200"
              />
            </div>
            <div className="plant-modal__content">
              <p className="plant-modal__eyebrow">{selectedPlant.koreanName}</p>
              <h2 id="plant-modal-title" className="plant-modal__title">
                {selectedPlant.name}
              </h2>
              <p className="plant-modal__tagline">{selectedPlant.tagline}</p>
              <dl
                className="plant-card__care plant-modal__care"
                aria-label={`${selectedPlant.koreanName} 관리 요약`}
              >
                <div>
                  <dt>
                    <CareIcon category="light" value={selectedPlant.care.light} />
                    <span>Light</span>
                  </dt>
                  <dd>{selectedPlant.care.light}</dd>
                </div>
                <div>
                  <dt>
                    <CareIcon category="water" value={selectedPlant.care.water} />
                    <span>Water</span>
                  </dt>
                  <dd>{selectedPlant.care.water}</dd>
                </div>
                <div>
                  <dt>
                    <CareIcon
                      category="temperature"
                      value={selectedPlant.care.temperature}
                    />
                    <span>Temp</span>
                  </dt>
                  <dd>{selectedPlant.care.temperature}</dd>
                </div>
              </dl>
              <ul className="plant-card__features plant-modal__features">
                {selectedPlant.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
