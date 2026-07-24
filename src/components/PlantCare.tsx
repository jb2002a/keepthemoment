'use client'

import { useState } from 'react'
import { useSiteContent } from '../hooks/useSiteContent'
import { Reveal } from './Reveal'

export function PlantCare() {
  const { content } = useSiteContent()
  const { hydroponic } = content
  const [openSectionId, setOpenSectionId] = useState<string | null>(null)
  const headline = hydroponic.description || hydroponic.intro[1] || ''
  const support = hydroponic.intro[2] || ''
  const detail = hydroponic.intro[3] || ''

  return (
    <section
      className="section plant-care"
      id="care"
      aria-labelledby="care-heading"
    >
      <div className="section__inner">
        <Reveal className="plant-care__intro">
          <p className="section__eyebrow">Care Guide</p>
          <h1 id="care-heading" className="section__title">
            {hydroponic.title}
          </h1>
        </Reveal>

        <div className="plant-care__stage">
          <Reveal className="plant-care__media">
            <img
              src={hydroponic.image}
              alt={hydroponic.alt}
              width="1536"
              height="1024"
              loading="lazy"
            />
          </Reveal>

          <Reveal className="plant-care__copy" delay={100}>
            {headline ? <p className="plant-care__lead">{headline}</p> : null}
            {support ? <p className="plant-care__support">{support}</p> : null}
            {detail ? <p className="plant-care__detail">{detail}</p> : null}

            <div className="hydroponic-accordion">
              {hydroponic.sections.map((section) => {
                const isOpen = openSectionId === section.id
                const panelId = `hydroponic-panel-${section.id}`

                return (
                  <article
                    className="hydroponic-accordion__item"
                    key={section.id}
                    data-open={isOpen ? 'true' : 'false'}
                  >
                    <button
                      className="hydroponic-accordion__trigger"
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() =>
                        setOpenSectionId(isOpen ? null : section.id)
                      }
                    >
                      {section.title}
                    </button>
                    <div
                      className="hydroponic-accordion__panel"
                      id={panelId}
                      role="region"
                      aria-hidden={!isOpen}
                    >
                      <div className="hydroponic-accordion__content">
                        {section.blocks.map((block, blockIndex) => {
                          if (block.type === 'list') {
                            return (
                              <ul
                                className="hydroponic-accordion__list"
                                key={blockIndex}
                              >
                                {block.items.map((item) => (
                                  <li key={item.title}>
                                    <strong>{item.title}</strong>
                                    <p>{item.body}</p>
                                  </li>
                                ))}
                              </ul>
                            )
                          }

                          if (block.type === 'quote') {
                            return (
                              <blockquote key={blockIndex}>
                                {block.text}
                              </blockquote>
                            )
                          }

                          return <p key={blockIndex}>{block.text}</p>
                        })}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
