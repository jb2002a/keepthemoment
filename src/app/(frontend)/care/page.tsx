import type { Metadata } from 'next'
import { PlantCare } from '@/components/PlantCare'

export const metadata: Metadata = {
  title: '수경식물 관리법',
  description:
    '물과 흙 모두에 잘 적응하는 수경식물 관리법과 키우기 쉬운 식물 오브제 이야기를 확인하세요.',
  alternates: { canonical: '/care' },
}

export default function CarePage() {
  return (
    <main id="main" className="page-main">
      <PlantCare />
    </main>
  )
}
