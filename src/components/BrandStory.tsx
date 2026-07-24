'use client'

import { useSiteContent } from '../hooks/useSiteContent'
import { Reveal } from './Reveal'

export function BrandStory() {
  const { content } = useSiteContent()
  const { storyPage, storyBlocks } = content

  return (
    <section
      className="section brand-story"
      id="story"
      aria-labelledby="story-heading"
    >
      <div className="section__inner">
        <Reveal className="story__statement">
          <p className="section__eyebrow">{storyPage.eyebrow}</p>
          <h2 id="story-heading" className="section__title">
            {storyPage.title}
          </h2>
        </Reveal>

        <div className="story-gallery">
          {storyBlocks.map((block, index) => (
            <Reveal
              key={block.id}
              className={`story-gallery__item story-gallery__item--${block.size}`}
              delay={index * 100}
            >
              <img
                src={block.image}
                alt={block.alt}
                width={block.size === 'wide' ? 1536 : 768}
                height={block.size === 'wide' ? 1024 : 1024}
                loading="lazy"
              />
            </Reveal>
          ))}
        </div>

        <div className="story__body">
          <p className="section__lead">{storyPage.lead}</p>
        </div>
      </div>
    </section>
  )
}
