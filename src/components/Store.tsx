'use client'

import { usePathname } from 'next/navigation'
import { mediaFocusProps } from '../lib/mediaFocus'
import { useSiteContent } from '../hooks/useSiteContent'
import { Reveal } from './Reveal'

export function Store() {
  const { content } = useSiteContent()
  const { storeInfo } = content
  const pathname = usePathname()
  const showMobileImage = pathname !== '/visit'
  const focus = mediaFocusProps(storeInfo)

  return (
    <section
      className="section store"
      id="visit"
      aria-labelledby="store-heading"
    >
      <div className="section__inner">
        <div className="store__layout">
          <Reveal className="store__media">
            <img
              src={storeInfo.image}
              alt={storeInfo.alt}
              width="1536"
              height="1024"
              loading="lazy"
              {...focus}
            />
          </Reveal>

          <Reveal className="store__info" delay={100}>
            <p className="section__eyebrow">{storeInfo.eyebrow}</p>
            <h2 id="store-heading" className="section__title">
              {storeInfo.title}
            </h2>

            {showMobileImage ? (
              <div className="store__mobile-bottom">
                <img
                  src={storeInfo.image}
                  alt={storeInfo.alt}
                  width="1200"
                  height="1200"
                  loading="lazy"
                  {...focus}
                />
              </div>
            ) : null}

            <h3 className="store__name">{storeInfo.name}</h3>
            <p className="store__address">
              {storeInfo.address}
              <span>{storeInfo.addressDetail}</span>
            </p>
            <ul className="store__hours">
              {storeInfo.hours.map((row) => (
                <li key={row.day}>
                  <span>{row.day}</span>
                  <span>{row.time}</span>
                </li>
              ))}
            </ul>

            <div className="store__actions">
              <a
                href={storeInfo.mapUrl}
                className="btn btn--outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {storeInfo.mapButtonLabel}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
