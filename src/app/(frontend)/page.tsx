import type { Metadata } from 'next'
import { HomePage } from '@/components/pages/HomePage'

export const metadata: Metadata = {
  title: { absolute: 'KEEP THE MOMENT | 수원 행궁동 수경식물·식물 선물 브랜드' },
  description:
    '수원 행궁동의 수경식물, 희귀식물, 식물 선물 라이프스타일 브랜드 KEEP THE MOMENT. 물에서 키우기 쉬운 식물 오브제를 만나보세요.',
  alternates: { canonical: '/' },
}

export default function Page() {
  return <HomePage />
}
