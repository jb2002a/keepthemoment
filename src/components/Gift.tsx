'use client'

import { useSiteContent } from '../hooks/useSiteContent'
import { Reveal } from './Reveal'

export function Gift() {
  const { content } = useSiteContent()
  const { giftPage } = content

  return (
    <section className="section gift-page" aria-labelledby="gift-heading">
      <div className="section__inner">
        <Reveal className="section__intro section__intro--split gift-page__intro">
          <div>
            <p className="section__eyebrow">{giftPage.eyebrow}</p>
            <h1 id="gift-heading" className="section__title">
              {giftPage.title}
            </h1>
          </div>
          <p className="gift-page__lead">{giftPage.lead}</p>
        </Reveal>

        <div className="gift-page__grid">
          {giftPage.options.map((item, index) => (
            <Reveal as="article" key={item.id} className="gift-card" delay={index * 80}>
              <div className="gift-card__media">
                <img src={item.image} alt={item.alt} width="900" height="1200" loading="lazy" />
              </div>
              <div className="gift-card__body">
                <h2>{item.title}</h2>
                <p>{item.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="gift-page__note">
          <p>{giftPage.note}</p>
          <a href="/#visit" className="text-link">
            Visit Store
          </a>
        </Reveal>
      </div>
    </section>
  )
}
