import { useSiteContent } from '../hooks/useSiteContent'
import { Reveal } from './Reveal'

const mobileCollectionTaglines: Record<string, string> = {
  plants: '처음 키우는 사람도 오래 곁에 둘 수 있는 식물.',
  fragrance: '공간에 은은하게 남는 향의 순간.',
  gift: '마음을 전하기 좋게 준비하는 식물 선물.',
}

export function Collections() {
  const { content } = useSiteContent()
  const { collections } = content

  return (
    <section
      className="section collections"
      aria-label="Plants, fragrance and gift collections"
    >
      <div className="section__inner">
        <ul className="collections__grid">
          {collections.map((item, index) => {
            const href =
              item.id === 'gift'
                ? '/gift'
                : item.id === 'fragrance'
                  ? '/fragrance'
                  : item.href

            return (
              <Reveal as="li" key={item.id} delay={index * 90}>
                <a
                  id={item.id}
                  href={href}
                  className="collection-card"
                  aria-label={`${item.name} 컬렉션 보기`}
                >
                  <div className="collection-card__media">
                    <img
                      src={item.image}
                      alt={item.alt}
                      width="768"
                      height="1024"
                      loading="lazy"
                      style={{ aspectRatio: item.aspectRatio }}
                    />
                  </div>
                  {index === 0 && (
                    <span
                      id="categories"
                      className="collection-scroll-target"
                      aria-hidden="true"
                    />
                  )}
                  <div className="collection-card__caption">
                    <h3 className="collection-card__name">{item.name}</h3>
                    <p className="collection-card__desc">
                      <span className="collection-card__desc-default">{item.tagline}</span>
                      <span className="collection-card__desc-mobile">
                        {mobileCollectionTaglines[item.id] ?? item.tagline}
                      </span>
                    </p>
                  </div>
                </a>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
