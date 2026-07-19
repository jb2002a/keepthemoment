import { useSiteContent } from '../hooks/useSiteContent'
import { Reveal } from './Reveal'

export function PlantCare() {
  const { content } = useSiteContent()
  const { hydroponic } = content

  return (
    <section
      className="section plant-care"
      id="care"
      aria-labelledby="care-heading"
    >
      <div className="section__inner">
        <div className="hydroponic__layout">
          <Reveal className="hydroponic__media">
            <img
              src={hydroponic.image}
              alt={hydroponic.alt}
              width="1536"
              height="1024"
              loading="lazy"
            />
          </Reveal>
          <Reveal className="hydroponic__copy" delay={100}>
            <p className="section__eyebrow">Why hydroponic?</p>
            <h2 id="care-heading" className="section__title">
              {hydroponic.title}
            </h2>
            <p className="section__lead">{hydroponic.description}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
