import { useSiteContent } from '../hooks/useSiteContent'
import { Reveal } from './Reveal'

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
                    <p className="collection-card__desc">{item.tagline}</p>
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
