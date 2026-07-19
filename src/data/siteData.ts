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
  href: string
}

export type PlantItem = {
  id: string
  name: string
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
  name: 'KEEP THE MOMENT',
  tagline: 'Nature meets Memory.',
  shortDescription: '오늘의 순간을 식물과 함께 가져가세요.',
}

export const navItems: NavItem[] = [
  { id: 'collections', label: 'COLLECTIONS', href: '/#categories' },
  { id: 'about', label: 'ABOUT', href: '/about' },
  { id: 'care', label: 'CARE', href: '/care' },
  { id: 'visit', label: 'VISIT', href: '/#visit' },
]

export const hero = {
  headline: 'Keep The Moment',
  subcopy: '물빛으로 자라는 희귀 수경식물 오브제',
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
    href: '/plants',
  },
  {
    id: 'fragrance',
    name: 'Fragrance',
    tagline: 'The scent stays.',
    image: '/images/keep-moment-fragrance.webp',
    alt: '실버 트레이 위에 놓인 미니멀한 향기 제품',
    aspectRatio: '3 / 4',
    href: '#visit',
  },
  {
    id: 'gift',
    name: 'Gift',
    tagline: 'A moment for someone.',
    image: '/images/keep-moment-gift-pouch.png',
    alt: '반투명 파우치에 담긴 작은 식물 선물',
    aspectRatio: '3 / 4',
    href: '#visit',
  },
]

export const plantItems: PlantItem[] = [
  {
    id: 'alocasia-cucullata',
    name: 'Alocasia Cucullata',
    image: '/images/items/alocasia-cucullata.png',
    alt: 'Alocasia Cucullata hydroponic plant',
  },
  {
    id: 'dieffenbachia-marianne',
    name: 'Dieffenbachia Marianne',
    image: '/images/items/dieffenbachia-marianne.png',
    alt: 'Dieffenbachia Marianne hydroponic plant',
  },
  {
    id: 'monstera',
    name: 'Monstera',
    image: '/images/items/monstera.png',
    alt: 'Monstera hydroponic plant',
  },
  {
    id: 'monstera-adansonii',
    name: 'Monstera Adansonii',
    image: '/images/items/monstera-adansonii.png',
    alt: 'Monstera Adansonii hydroponic plant',
  },
  {
    id: 'staghorn-fern',
    name: 'Staghorn Fern',
    image: '/images/items/staghorn-fern.png',
    alt: 'Staghorn Fern hydroponic plant',
  },
  {
    id: 'boston-fern',
    name: 'Boston Fern',
    image: '/images/items/boston-fern.png',
    alt: 'Boston Fern hydroponic plant',
  },
  {
    id: 'scindapsus-marble',
    name: 'Scindapsus Marble',
    image: '/images/items/scindapsus-marble.png',
    alt: 'Scindapsus Marble hydroponic plant',
  },
  {
    id: 'scindapsus-white-angel',
    name: 'Scindapsus White Angel',
    image: '/images/items/scindapsus-white-angel.png',
    alt: 'Scindapsus White Angel hydroponic plant',
  },
  {
    id: 'scindapsus-exotica',
    name: 'Scindapsus Exotica',
    image: '/images/items/scindapsus-exotica.png',
    alt: 'Scindapsus Exotica hydroponic plant',
  },
  {
    id: 'syngonium',
    name: 'Syngonium',
    image: '/images/items/syngonium.png',
    alt: 'Syngonium hydroponic plant',
  },
  {
    id: 'aglaonema-siam-aurora',
    name: 'Aglaonema Siam Aurora',
    image: '/images/items/aglaonema-siam-aurora.png',
    alt: 'Aglaonema Siam Aurora hydroponic plant',
  },
  {
    id: 'aglaonema-snow-sapphire',
    name: 'Aglaonema Snow Sapphire',
    image: '/images/items/aglaonema-snow-sapphire.png',
    alt: 'Aglaonema Snow Sapphire hydroponic plant',
  },
  {
    id: 'aglaonema-angel',
    name: 'Aglaonema Angel',
    image: '/images/items/aglaonema-angel.png',
    alt: 'Aglaonema Angel hydroponic plant',
  },
  {
    id: 'maidenhair-fern',
    name: 'Maidenhair Fern',
    image: '/images/items/maidenhair-fern.png',
    alt: 'Maidenhair Fern hydroponic plant',
  },
  {
    id: 'areca-palm',
    name: 'Areca Palm',
    image: '/images/items/areca-palm.png',
    alt: 'Areca Palm hydroponic plant',
  },
  {
    id: 'asparagus-nanus',
    name: 'Asparagus Nanus',
    image: '/images/items/asparagus-nanus.png',
    alt: 'Asparagus Nanus hydroponic plant',
  },
  {
    id: 'asparagus-meyeri',
    name: 'Asparagus Meyeri',
    image: '/images/items/asparagus-meyeri.png',
    alt: 'Asparagus Meyeri hydroponic plant',
  },
  {
    id: 'alocasia-green-velvet',
    name: 'Alocasia Green Velvet',
    image: '/images/items/alocasia-green-velvet.png',
    alt: 'Alocasia Green Velvet hydroponic plant',
  },
  {
    id: 'epipremnum-njoy',
    name: "Epipremnum N'Joy",
    image: '/images/items/epipremnum-njoy.png',
    alt: "Epipremnum N'Joy hydroponic plant",
  },
  {
    id: 'calathea-orbifolia',
    name: 'Calathea Orbifolia',
    image: '/images/items/calathea-orbifolia.png',
    alt: 'Calathea Orbifolia hydroponic plant',
  },
  {
    id: 'humata-fern',
    name: 'Humata Fern',
    image: '/images/items/humata-fern.png',
    alt: 'Humata Fern hydroponic plant',
  },
  {
    id: 'rhaphidophora-tetrasperma',
    name: 'Rhaphidophora Tetrasperma',
    image: '/images/items/rhaphidophora-tetrasperma.png',
    alt: 'Rhaphidophora Tetrasperma hydroponic plant',
  },
]

/** 네이버 스마트스토어 URL — 실제 스토어 주소로 교체하세요 */
export const naverStoreUrl = 'https://smartstore.naver.com/'

export const storyBlocks: StoryBlock[] = [
  {
    id: 's1',
    image: '/images/keep-moment-store-retouched.png',
    alt: '자연광이 들어오는 KEEP THE MOMENT 라이프스타일 공간',
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
  name: 'KEEP THE MOMENT',
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
  alt: '우드와 실버 소재로 완성된 밝은 KEEP THE MOMENT 매장',
}

export const footerLinks: SocialLink[] = [
  { id: 'instagram', label: 'Instagram', href: storeInfo.instagramUrl },
  { id: 'blog', label: 'Naver Blog', href: 'https://blog.naver.com/' },
  { id: 'store', label: 'Naver Store', href: naverStoreUrl },
]

export const privacyPolicyUrl = '#privacy'
