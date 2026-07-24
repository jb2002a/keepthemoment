'use client'

import { Fragment } from 'react'
import { Collections } from '@/components/Collections'
import { Hero } from '@/components/Hero'
import { Reveal } from '@/components/Reveal'
import { Store } from '@/components/Store'
import { useSiteContent } from '@/hooks/useSiteContent'

function Multiline({ text }: { text: string }) {
  const lines = text.split('\n')
  return (
    <>
      {lines.map((line, index) => (
        <Fragment key={`${index}-${line}`}>
          {index > 0 ? <br /> : null}
          {line}
        </Fragment>
      ))}
    </>
  )
}

export function HomePage() {
  return (
    <main id="main" className="home-main">
      <Hero />
      <HomeIntro />
      <Collections />
      <Store />
      <HomeLinks />
    </main>
  )
}

function HomeIntro() {
  const { content } = useSiteContent()
  const { homePage } = content

  return (
    <section className="home-intro" aria-labelledby="home-intro-heading">
      <div className="section__inner home-intro__inner">
        <Reveal className="home-intro__copy">
          <h1 id="home-intro-heading" className="home-intro__title">
            <Multiline text={homePage.introTitle} />
          </h1>
          <p className="home-intro__description">
            <Multiline text={homePage.introDescription} />
          </p>
        </Reveal>
        <Reveal className="home-intro__actions" delay={120}>
          {homePage.introActions.map((action) => (
            <a key={`${action.label}-${action.href}`} href={action.href} className="text-link">
              {action.label}
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function HomeLinks() {
  const { content } = useSiteContent()
  const { homePage } = content

  return (
    <section className="section home-links" aria-label="More about KEEP THE MOMENT">
      <div className="section__inner">
        <div className="home-links__grid">
          {homePage.linkCards.map((card) => (
            <a key={card.id} href={card.href} className="home-link-card">
              <span className="section__eyebrow">{card.eyebrow}</span>
              <strong>{card.title}</strong>
              <span>{card.description}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
