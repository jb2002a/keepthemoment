import { useSiteContent } from '../hooks/useSiteContent'
import { Reveal } from './Reveal'

export function BrandStory() {
  const { content } = useSiteContent()
  const { storyBlocks } = content

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
            식물과 향, 그리고 작은 선물은 오늘의 분위기를 조용히 머금습니다.
            KEEP THE MOMENT는 제품을 판매하기보다, 그 순간을 집으로 가져갈 수 있는
            경험을 드리고 싶습니다.
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
