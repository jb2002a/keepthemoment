import type { Metadata } from 'next'
import { Store } from '@/components/Store'

export const metadata: Metadata = {
  title: '행궁동 매장 방문',
  description:
    '경기 수원시 팔달구 행궁동에 위치한 KEEP THE MOMENT 매장 주소, 영업시간, 방문 정보를 확인하세요.',
  alternates: { canonical: '/visit' },
}

export default function VisitPage() {
  return (
    <main id="main" className="page-main visit-page">
      <Store />
    </main>
  )
}
