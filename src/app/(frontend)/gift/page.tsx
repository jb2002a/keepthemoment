import type { Metadata } from 'next'
import { Gift } from '@/components/Gift'

export const metadata: Metadata = {
  title: '식물 선물 패키지',
  description:
    'KEEP THE MOMENT의 식물을 패키지 형식과 포장 형식으로 선물할 수 있는 안내를 확인하세요.',
  alternates: { canonical: '/gift' },
}

export default function GiftRoute() {
  return (
    <main id="main" className="page-main">
      <Gift />
    </main>
  )
}
