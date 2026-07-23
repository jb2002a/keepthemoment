import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { SiteContentProvider } from '@/context/SiteContentContext'
import { SiteShell } from '@/components/SiteShell'
import { loadSiteContent } from '@/data/cmsData'
import '@/styles/main.css'

export const dynamic = 'force-dynamic'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.keepthemoment.kr'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'KEEP THE MOMENT | 수원 행궁동 수경식물·식물 선물 브랜드',
    template: '%s | KEEP THE MOMENT',
  },
  description:
    '수원 행궁동의 수경식물, 희귀식물, 식물 선물 라이프스타일 브랜드 KEEP THE MOMENT. 물에서 키우기 쉬운 식물 오브제를 만나보세요.',
  keywords: [
    'KEEP THE MOMENT',
    '킵더모먼트',
    '수원 식물',
    '행궁동 식물',
    '수원 수경식물',
    '행궁동 수경식물',
    '수원 식물 선물',
    '희귀식물',
    '플랜테리어',
  ],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: 'KEEP THE MOMENT',
    url: siteUrl,
    title: 'KEEP THE MOMENT | 수원 행궁동 수경식물·식물 선물 브랜드',
    description:
      '수원 행궁동에서 만나는 수경식물, 희귀식물, 식물 선물 브랜드. 오늘의 순간을 식물과 함께 오래 간직하세요.',
    images: [
      {
        url: '/images/meta/product-glass-hero-generated.png',
        alt: '투명 유리 화병 속 수경식물 오브제',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KEEP THE MOMENT | 수원 행궁동 수경식물·식물 선물 브랜드',
    description: '수원 행궁동에서 만나는 수경식물, 희귀식물, 식물 선물 브랜드.',
    images: ['/images/meta/product-glass-hero-generated.png'],
  },
  icons: {
    icon: '/favicon.svg',
  },
}

export default async function FrontendLayout({ children }: { children: ReactNode }) {
  const content = await loadSiteContent()

  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SiteContentProvider initialContent={content}>
          <SiteShell>{children}</SiteShell>
        </SiteContentProvider>
      </body>
    </html>
  )
}
