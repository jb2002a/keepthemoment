import { plantItems } from '../data/siteData'
import { Reveal } from './Reveal'

export function PlantItems() {
  return (
    <section
      className="section plant-items"
      aria-labelledby="plant-items-heading"
    >
      <div className="section__inner">
        <Reveal className="section__intro section__intro--split">
          <div>
            <p className="section__eyebrow">Plants</p>
            <h1 id="plant-items-heading" className="section__title">
              Living Objects.
            </h1>
          </div>
          <p className="plant-items__lead">
            Explore hydroponic plants prepared for keeping the moment close.
          </p>
        </Reveal>

        <ul className="plant-items__grid">
          {plantItems.map((item, index) => (
            <Reveal as="li" key={item.id} delay={(index % 4) * 70}>
              <article className="plant-card">
                <div className="plant-card__media">
                  <img
                    src={item.image}
                    alt={item.alt}
                    width="900"
                    height="1200"
                    loading="lazy"
                  />
                </div>
                <h2 className="plant-card__name">{item.name}</h2>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
