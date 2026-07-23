'use client'

import { Collections } from '@/components/Collections'
import { Hero } from '@/components/Hero'
import { Reveal } from '@/components/Reveal'
import { Store } from '@/components/Store'

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
  return (
    <section className="home-intro" aria-labelledby="home-intro-heading">
      <div className="section__inner home-intro__inner">
        <Reveal className="home-intro__copy">
          <h1 id="home-intro-heading" className="home-intro__title">
            Plants, Scent,
            <br />
            and Moments.
          </h1>
          <p className="home-intro__description">
            ??? ??? ??? ?? ????,
            <br />
            ??? ??? ??? ?? ?????.
            <br />
            ???? ?? ?? ?? ??? ??? ?????.
          </p>
        </Reveal>
        <Reveal className="home-intro__actions" delay={120}>
          <a href="/plants" className="text-link">
            Plants
          </a>
          <a href="/#visit" className="text-link">
            Visit
          </a>
        </Reveal>
      </div>
    </section>
  )
}

function HomeLinks() {
  return (
    <section className="section home-links" aria-label="More about KEEP THE MOMENT">
      <div className="section__inner">
        <div className="home-links__grid">
          <a href="/about" className="home-link-card">
            <span className="section__eyebrow">Brand Story</span>
            <strong>Nature & Memory.</strong>
            <span>??? ???? ??? ??.</span>
          </a>
          <a href="/care" className="home-link-card">
            <span className="section__eyebrow">Care Guide</span>
            <strong>Water & Soil.</strong>
            <span>?? ? ??? ? ???? ??.</span>
          </a>
          <a href="/#visit" className="home-link-card">
            <span className="section__eyebrow">Visit</span>
            <strong>Haenggung Store.</strong>
            <span>??? ?? ??? ?????.</span>
          </a>
        </div>
      </div>
    </section>
  )
}
