import type { Metadata } from 'next'
import { BrandStory } from '@/components/BrandStory'

export const metadata: Metadata = {
  title: '브랜드 스토리',
  description:
    '식물과 향기, 선물로 오늘의 기억을 디자인하는 수원 행궁동 라이프스타일 브랜드 KEEP THE MOMENT를 소개합니다.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <main id="main" className="page-main">
      <BrandStory />
    </main>
  )
}
