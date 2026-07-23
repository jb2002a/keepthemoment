import type { Metadata } from 'next'
import { Fragrance } from '@/components/Fragrance'

export const metadata: Metadata = {
  title: '프래그런스 입점 브랜드',
  description:
    'NUDARA, SEAMUS, TEABLESS, LISOUÉ, The Other Mood, VINOIR 등 KEEP THE MOMENT에서 만나는 프래그런스 브랜드.',
  alternates: { canonical: '/fragrance' },
}

export default function FragranceRoute() {
  return (
    <main id="main" className="page-main">
      <Fragrance />
    </main>
  )
}
