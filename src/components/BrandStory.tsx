import { storyBlocks } from '../data/siteData'
import { Reveal } from './Reveal'

export function BrandStory() {
  return (
    <section
      className="section brand-story"
      id="story"
      aria-labelledby="story-heading"
    >
      <div className="section__inner">
        <Reveal className="story__statement">
          <p className="section__eyebrow">Our Story</p>
          <h2 id="story-heading" className="section__title">
            Nature & Memory.
          </h2>
          <p className="section__lead">
            우리는 식물을 단순한 장식이 아니라, 공간과 일상에 조용히 머무는 생명으로 바라봅니다.
          </p>
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
      </div>
    </section>
  )
}
