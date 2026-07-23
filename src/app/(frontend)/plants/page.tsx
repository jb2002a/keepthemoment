import type { Metadata } from 'next'
import { PlantItems } from '@/components/PlantItems'

export const metadata: Metadata = {
  title: '수원 수경식물 컬렉션',
  description:
    '몬스테라, 스킨답서스, 아글라오네마 등 수원 행궁동에서 만나는 수경식물과 희귀식물 컬렉션.',
  alternates: { canonical: '/plants' },
}

export default function PlantsPage() {
  return (
    <main id="main" className="page-main">
      <PlantItems />
    </main>
  )
}
