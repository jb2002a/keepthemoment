export type NavItem = {
  id: string
  label: string
  href: string
}

export type Collection = {
  id: string
  name: string
  tagline: string
  image: string
  alt: string
  aspectRatio: string
}

export type Product = {
  id: string
  name: string
  price: number
  storeUrl: string
  image: string
  alt: string
}

export type StoryBlock = {
  id: string
  image: string
  alt: string
  size: 'wide' | 'portrait'
}

export type SocialLink = {
  id: string
  label: string
  href: string
}

export const brand = {
  name: 'Keep The Moment',
  tagline: 'Nature meets Memory.',
  shortDescription: '오늘의 순간을 식물과 함께 가져가세요.',
}

export const navItems: NavItem[] = [
  { id: 'collections', label: 'COLLECTIONS', href: '/#categories' },
  { id: 'shop', label: 'SHOP', href: '/#moments' },
  { id: 'about', label: 'ABOUT', href: '/about' },
  { id: 'care', label: 'CARE', href: '/care' },
  { id: 'visit', label: 'VISIT', href: '/#visit' },
]

export const hero = {
  headline: 'Keep The Moment',
  subcopy: '물빛으로 자라는 수경식물 오브제',
  ctaLabel: 'Scroll to discover',
  ctaHref: '#categories',
  image: {
    src: '/images/keep-moment-product-glass-hero-generated.png',
    alt: '따뜻한 햇살이 드는 창가에 놓인 투명 유리 화병 속 수경식물',
  },
}

export const collections: Collection[] = [
  {
    id: 'plants',
    name: 'Plants',
    tagline: 'Easy to grow. Beautiful to keep.',
    image: '/images/keep-moment-plants-upscaled.png',
    alt: '투명한 유리 화병에서 자라는 몬스테라 수경식물',
    aspectRatio: '3 / 4',
  },
  {
    id: 'fragrance',
    name: 'Fragrance',
    tagline: 'The scent stays.',
    image: '/images/keep-moment-fragrance.webp',
    alt: '실버 트레이 위에 놓인 미니멀한 향기 제품',
    aspectRatio: '3 / 4',
  },
  {
    id: 'gift',
    name: 'Gift',
    tagline: 'A moment for someone.',
    image: '/images/keep-moment-gift-pouch.png',
    alt: '반투명 파우치에 담긴 작은 식물 선물',
    aspectRatio: '3 / 4',
  },
]

/** 네이버 스마트스토어 URL — 실제 스토어 주소로 교체하세요 */
export const naverStoreUrl = 'https://smartstore.naver.com/'

export const products: Product[] = [
  {
    id: 'alocasia-turtle',
    name: '거북 알로카시아',
    price: 89000,
    storeUrl: naverStoreUrl,
    image: '/images/final/거북알로카시아-1.png',
    alt: '거북 알로카시아 상품 이미지',
  },
  {
    id: 'scindapsus-exotica',
    name: '스칸답서스 엑조티카',
    price: 68000,
    storeUrl: naverStoreUrl,
    image: '/images/final/스칸답서스-엑조티카-1.png',
    alt: '스칸답서스 엑조티카 상품 이미지',
  },
  {
    id: 'scindapsus-jade',
    name: '스칸답서스 제이드',
    price: 52000,
    storeUrl: naverStoreUrl,
    image: '/images/final/스칸답서스-제이드-1.png',
    alt: '스칸답서스 제이드 상품 이미지',
  },
  {
    id: 'adansonii',
    name: '몬스테라 아단소니',
    price: 48000,
    storeUrl: naverStoreUrl,
    image: '/images/final/아단소니-1.png',
    alt: '몬스테라 아단소니 상품 이미지',
  },
]

export const storyBlocks: StoryBlock[] = [
  {
    id: 's1',
    image: '/images/keep-moment-store-retouched.png',
    alt: '자연광이 들어오는 Keep The Moment 라이프스타일 공간',
    size: 'wide',
  },
  {
    id: 's2',
    image: '/images/keep-moment-gift-pouch.png',
    alt: '누군가의 하루를 위해 반투명 파우치에 담긴 작은 식물 선물',
    size: 'portrait',
  },
]

export const hydroponic = {
  title: 'Water & Soil.',
  description: '수경식물은 물속에서도 건강하게 자라고, 흙으로 옮겨 심어도 자연스럽게 적응합니다.',
  image: '/images/keep-moment-hydroponic.webp',
  alt: '맑은 물 안으로 섬세한 뿌리가 보이는 수경식물',
}

export const storeInfo = {
  name: 'Keep The Moment',
  address: '경기 수원시 팔달구 신풍로63번길 14 2층',
  addressDetail: '2F, 14, Sinpung-ro 63beon-gil, Paldal-gu, Suwon-si, Gyeonggi-do',
  hours: [
    { day: 'Tue – Fri', time: '11:00 – 19:00' },
    { day: 'Sat – Sun', time: '11:00 – 18:00' },
  ],
  phone: '02-0000-0000',
  mapUrl: 'https://map.naver.com/',
  placeUrl: 'https://naver.me/',
  instagramUrl: 'https://www.instagram.com/',
  image: '/images/keep-moment-store-retouched.png',
  alt: '우드와 실버 소재로 완성된 밝은 Keep The Moment 매장',
}

export const footerLinks: SocialLink[] = [
  { id: 'instagram', label: 'Instagram', href: storeInfo.instagramUrl },
  { id: 'blog', label: 'Naver Blog', href: 'https://blog.naver.com/' },
  { id: 'store', label: 'Naver Store', href: naverStoreUrl },
]

export const privacyPolicyUrl = '#privacy'

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ko-KR').format(price) + '원'
}
