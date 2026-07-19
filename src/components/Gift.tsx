import { Reveal } from './Reveal'

const giftOptions = [
  {
    id: 'package',
    title: 'Package Gift',
    image: '/images/gift/gift1.png',
    alt: 'KEEP THE MOMENT 선물 패키지로 준비된 식물',
    copy: '식물의 크기와 분위기에 맞춰 패키지 형태로 정돈해 선물하실 수 있습니다.',
  },
  {
    id: 'wrapping',
    title: 'Wrapping',
    image: '/images/gift/gift2.png',
    alt: '포장된 식물 선물 클로즈업',
    copy: '가볍게 건네기 좋은 포장부터 특별한 날을 위한 구성까지 상담 후 준비합니다.',
  },
  {
    id: 'message',
    title: 'Message',
    image: '/images/gift/gift3.png',
    alt: '메시지와 함께 준비된 식물 선물',
    copy: '마음을 전할 수 있도록 카드와 작은 메시지 연출을 함께 도와드립니다.',
  },
  {
    id: 'pickup',
    title: 'Pick-up Ready',
    image: '/images/gift/gift4.png',
    alt: '매장에서 픽업할 수 있게 준비된 식물 선물',
    copy: '매장에서 바로 픽업하거나 방문 일정에 맞춰 선물용으로 준비해드립니다.',
  },
]

export function Gift() {
  return (
    <section className="section gift-page" aria-labelledby="gift-heading">
      <div className="section__inner">
        <Reveal className="section__intro section__intro--split gift-page__intro">
          <div>
            <p className="section__eyebrow">Gift</p>
            <h1 id="gift-heading" className="section__title">
              Plants, ready to gift.
            </h1>
          </div>
          <p className="gift-page__lead">
            KEEP THE MOMENT의 식물은 패키지 형식과 포장 형식으로 선물 준비가
            가능합니다. 받는 분의 취향, 식물 크기, 전달 상황에 맞춰 매장에서
            어울리는 구성을 안내해드립니다.
          </p>
        </Reveal>

        <div className="gift-page__grid">
          {giftOptions.map((item, index) => (
            <Reveal as="article" key={item.id} className="gift-card" delay={index * 80}>
              <div className="gift-card__media">
                <img src={item.image} alt={item.alt} width="900" height="1200" loading="lazy" />
              </div>
              <div className="gift-card__body">
                <h2>{item.title}</h2>
                <p>{item.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="gift-page__note">
          <p>
            선물 포장은 식물 상태와 재고에 따라 가능한 구성이 달라질 수 있어요.
            방문 전 원하는 분위기나 예산을 알려주시면 더 알맞게 준비해드립니다.
          </p>
          <a href="/#visit" className="text-link">
            Visit Store
          </a>
        </Reveal>
      </div>
    </section>
  )
}
