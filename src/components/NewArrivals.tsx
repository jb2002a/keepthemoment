import { products } from '../data/siteData'
import { Reveal } from './Reveal'

export function NewArrivals() {
  return (
    <section
      className="section new-arrivals"
      id="moments"
      aria-label="Selected products"
    >
      <div className="section__inner">
        <Reveal className="section__intro section__intro--split">
          <a href="#moments" className="text-link">
            View all
          </a>
        </Reveal>

        <ul className="product-grid">
          {products.map((product, index) => (
            <Reveal as="li" key={product.id} delay={(index % 4) * 60}>
              <a
                href={product.storeUrl}
                className="product-card"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="product-card__media">
                  <img
                    src={product.image}
                    alt={product.alt}
                    width="768"
                    height="1024"
                    loading="lazy"
                  />
                </div>
                <div className="product-card__body">
                  <h3 className="product-card__name">{product.name}</h3>
                  <p className="product-card__price" aria-hidden="true">
                    &nbsp;
                  </p>
                </div>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
