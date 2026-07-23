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
  koreanName: string
  image: string
  alt: string
  tagline: string
  features: string[]
  care: {
    light: string
    water: string
    temperature: string
  }
}

export type FragranceBrand = {
  id: string
  name: string
  image: string
  alt: string
  href: string
  /** Display width so wordmark letter size matches VINOIR */
  logoWidth: string
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
  images: [
    {
      src: '/images/hero/main.jpeg',
      mobileSrc: '/images/hero/main-mobile.png',
      alt: '화이트 테이블 위 리프 파우치가 진열된 KEEP THE MOMENT 쇼룸',
      objectPosition: 'center 38%',
    },
    {
      src: '/images/hero/shelf-mobile.png',
      mobileSrc: '/images/hero/shelf-mobile.png',
      alt: '우드 선반에 진열된 KEEP THE MOMENT 향기·기프트 제품',
      mobileOnly: true,
      objectPosition: 'center bottom',
    },
    {
      src: '/images/hero/shelf-begonia.png',
      alt: '화이트 선반에 진열된 베고니아와 양치식물',
      mobileOnly: true,
      objectPosition: 'center center',
    },
    {
      src: '/images/hero/plants-sunlight.png',
      alt: '햇살이 드는 화이트 선반 위 어린 관엽식물들',
      mobileOnly: true,
      objectPosition: 'center 40%',
    },
    {
      src: '/images/hero/monstera-wall.png',
      alt: '텍스처 벽 앞에 자리한 몬스테라와 안스리움',
      mobileOnly: true,
      objectPosition: 'center center',
    },
    {
      src: '/images/hero/caladium-triostar.png',
      alt: '칼라디움과 스트로만테 트리오스타가 있는 식물 디스플레이',
      mobileOnly: true,
      objectPosition: 'center 45%',
    },
  ],
}

export const collections: Collection[] = [
  {
    id: 'plants',
    name: 'Plants',
    tagline: 'Easy to grow. Beautiful to keep.',
    image: '/images/collections/plants.png',
    alt: '투명한 유리 화병에서 자라는 몬스테라 수경식물',
    aspectRatio: '3 / 4',
    href: '/plants',
  },
  {
    id: 'fragrance',
    name: 'Fragrance',
    tagline: 'The scent stays.',
    image: '/images/collections/fragrance.webp',
    alt: '실버 트레이 위에 놓인 미니멀한 향기 제품',
    aspectRatio: '3 / 4',
    href: '/fragrance',
  },
  {
    id: 'gift',
    name: 'Gift',
    tagline: 'Package and wrapping available.',
    image: '/images/story/gift-pouch.png',
    alt: '반투명 파우치에 담긴 작은 식물 선물',
    aspectRatio: '3 / 4',
    href: '/gift',
  },
]

export const fragranceBrands: FragranceBrand[] = [
  {
    id: 'nudara',
    name: 'NUDARA',
    image: '/images/fragrance/nudara.png',
    alt: 'NUDARA fragrance brand logo',
    href: 'https://nudara.co.kr/',
    logoWidth: '9rem',
  },
  {
    id: 'seamus',
    name: 'SEAMUS',
    image: '/images/fragrance/seamus.png',
    alt: 'SEAMUS fragrance brand logo',
    href: 'https://seamus.co.kr/',
    logoWidth: '8.9rem',
  },
  {
    id: 'teabless',
    name: 'TEABLESS',
    image: '/images/fragrance/teabless.png',
    alt: 'TEABLESS fragrance brand logo',
    href: 'https://teabless.co.kr/',
    logoWidth: '12.6rem',
  },
  {
    id: 'lisoue',
    name: 'LISOUÉ',
    image: '/images/fragrance/lisoue.png',
    alt: 'LISOUE fragrance brand logo',
    href: 'https://lisoue.co.kr/',
    logoWidth: '9.4rem',
  },
  {
    id: 'the-other-mood',
    name: 'The Other Mood',
    image: '/images/fragrance/the-other-mood.png',
    alt: 'The Other Mood fragrance brand logo',
    href: 'https://theothermood.co.kr/',
    logoWidth: '14.5rem',
  },
  {
    id: 'vinoir',
    name: 'VINOIR',
    image: '/images/fragrance/vinoir.png',
    alt: 'VINOIR fragrance brand logo',
    href: 'https://vinoir.kr/',
    logoWidth: '9rem',
  },
]

export const rarePlantItems: PlantItem[] = [
  {
    id: 'monstera-albo',
    name: 'Monstera Albo',
    koreanName: '몬스테라 알보',
    image: '/images/plants/rare/monstera-albo.png',
    alt: 'Monstera Albo hydroponic plant',
    tagline: '흰색 무늬가 불규칙하게 발현되는 몬스테라 보르시지아나 무늬종.',
    features: ['희소성이 높은 무늬 관엽식물', '무늬 보존을 위해 밝은 간접광 필요'],
    care: { light: '밝은 반양지', water: '겉흙 마르면 흠뻑', temperature: '18~27℃' },
  },
  {
    id: 'begonia',
    name: 'Begonia',
    koreanName: '베고니아',
    image: '/images/plants/rare/begonia.png',
    alt: 'Begonia hydroponic plant',
    tagline: '잎의 색감과 무늬, 질감이 다양하게 나타나는 관엽 베고니아.',
    features: ['잎의 관상가치가 높음', '과습과 잎 젖음에 민감'],
    care: { light: '밝은 반음지', water: '겉흙 마르면 소량', temperature: '18~25℃' },
  },
  {
    id: 'anthurium',
    name: 'Anthurium',
    koreanName: '안스리움',
    image: '/images/plants/rare/anthurium.png',
    alt: 'Anthurium hydroponic plant',
    tagline: '광택 있는 잎과 독특한 불염포가 특징인 천남성과 열대 관엽식물.',
    features: ['공중습도 높은 환경 선호', '뿌리 통기성과 과습 관리가 중요'],
    care: { light: '반양지', water: '겉흙 마르면 흠뻑', temperature: '18~28℃' },
  },
  {
    id: 'caladium',
    name: 'Caladium',
    koreanName: '칼라디움',
    image: '/images/plants/rare/caladium.png',
    alt: 'Caladium hydroponic plant',
    tagline: '얇고 넓은 잎에 선명한 색과 잎맥 무늬가 나타나는 구근성 관엽식물.',
    features: ['강한 직사광선에 잎 손상 가능', '저온기에는 생육이 둔화되거나 휴면 가능'],
    care: { light: '밝은 반음지', water: '겉흙 마르면 흠뻑', temperature: '20~28℃' },
  },
]

export const plantItems: PlantItem[] = [
  {
    id: 'alocasia-cucullata',
    name: 'Alocasia Cucullata',
    koreanName: '거북알로카시아',
    image: '/images/plants/regular/alocasia-cucullata.png',
    alt: 'Alocasia Cucullata hydroponic plant',
    tagline: '두꺼운 잎맥과 입체적인 잎 질감이 특징인 알로카시아류.',
    features: ['잎 형태의 관상가치가 높음', '저온과 과습에 취약'],
    care: { light: '반양지', water: '겉흙 마르면 흠뻑', temperature: '20~25℃' },
  },
  {
    id: 'dieffenbachia-marianne',
    name: 'Dieffenbachia Marianne',
    koreanName: '마리안느',
    image: '/images/plants/regular/dieffenbachia-marianne.png',
    alt: 'Dieffenbachia Marianne hydroponic plant',
    tagline: '디펜바키아속 관엽식물로 넓은 잎과 밝은 무늬가 특징.',
    features: ['유해물질 흡수 능력이 알려진 실내식물', '저온과 과습에 민감'],
    care: { light: '반양지', water: '겉흙 마르면 흠뻑', temperature: '20~30℃' },
  },
  {
    id: 'monstera',
    name: 'Monstera',
    koreanName: '몬스테라',
    image: '/images/plants/regular/monstera.png',
    alt: 'Monstera hydroponic plant',
    tagline: '천남성과 덩굴성 관엽식물로 성엽에서 잎 갈라짐이 나타나는 대표 실내식물.',
    features: ['수경재배 적응력 우수', '성숙할수록 잎의 열편 발달'],
    care: { light: '반양지', water: '겉흙 마르면 흠뻑', temperature: '20~30℃' },
  },
  {
    id: 'monstera-adansonii',
    name: 'Monstera Adansonii',
    koreanName: '몬스테라 아단소니',
    image: '/images/plants/regular/monstera-adansonii.png',
    alt: 'Monstera Adansonii hydroponic plant',
    tagline: '잎에 타공 형태의 구멍이 생기는 덩굴성 몬스테라류.',
    features: ['구멍 난 잎 형태로 관상가치 높음', '지지대 또는 행잉 연출 가능'],
    care: { light: '반양지', water: '겉흙 마르면 흠뻑', temperature: '20~30℃' },
  },
  {
    id: 'staghorn-fern',
    name: 'Staghorn Fern',
    koreanName: '박쥐란',
    image: '/images/plants/regular/staghorn-fern.png',
    alt: 'Staghorn Fern hydroponic plant',
    tagline: '고목이나 바위에 붙어 자라는 착생 양치식물.',
    features: ['방패엽과 생식엽이 구분되는 독특한 구조', '통풍과 공중습도 관리가 중요'],
    care: { light: '반음지', water: '뿌리부 마르면 관수', temperature: '18~27℃' },
  },
  {
    id: 'boston-fern',
    name: 'Boston Fern',
    koreanName: '보스턴고사리',
    image: '/images/plants/regular/boston-fern.png',
    alt: 'Boston Fern hydroponic plant',
    tagline: '고습도 환경을 선호하는 고사리과 다년생 음지식물.',
    features: ['공중습도 부족 시 잎끝 갈변 발생', '늘어지는 잎으로 행잉 재배 적합'],
    care: { light: '반음지', water: '겉흙 마르면 흠뻑', temperature: '15~25℃' },
  },
  {
    id: 'scindapsus-marble',
    name: 'Scindapsus Marble',
    koreanName: '스칸답서스 마블',
    image: '/images/plants/regular/scindapsus-marble.png',
    alt: 'Scindapsus Marble hydroponic plant',
    tagline: '잎에 마블 무늬가 나타나는 덩굴성 천남성과 관엽식물.',
    features: ['생육이 강하고 실내 적응력 우수', '옥살산칼슘 함유로 반려동물 주의'],
    care: { light: '반양지', water: '겉흙 마르면 흠뻑', temperature: '15~25℃' },
  },
  {
    id: 'scindapsus-white-angel',
    name: 'Scindapsus White Angel',
    koreanName: '스칸답서스 화이트 엔젤',
    image: '/images/plants/regular/scindapsus-white-angel.png',
    alt: 'Scindapsus White Angel hydroponic plant',
    tagline: '백색과 녹색 무늬 대비가 뚜렷한 스킨답서스 계열 관엽식물.',
    features: ['무늬 보존을 위해 밝은 간접광 필요', '덩굴성 생장으로 행잉 연출 가능'],
    care: { light: '반양지', water: '겉흙 마르면 흠뻑', temperature: '15~25℃' },
  },
  {
    id: 'scindapsus-exotica',
    name: 'Scindapsus Exotica',
    koreanName: '스칸답서스 엑조티카',
    image: '/images/plants/regular/scindapsus-exotica.png',
    alt: 'Scindapsus Exotica hydroponic plant',
    tagline: '두꺼운 잎과 은백색 무늬가 특징인 스킨답서스 계열 관엽식물.',
    features: ['은색 반점 무늬가 뚜렷함', '과습보다 건조 관리에 안정적'],
    care: { light: '반양지', water: '속흙 마르면 흠뻑', temperature: '15~25℃' },
  },
  {
    id: 'syngonium',
    name: 'Syngonium',
    koreanName: '싱고니움',
    image: '/images/plants/regular/syngonium.png',
    alt: 'Syngonium hydroponic plant',
    tagline: '천남성과 덩굴성 관엽식물로 줄기 마디에서 기근이 발달한다.',
    features: ['반음지 적응력 우수', '행잉 또는 지지대 재배 가능'],
    care: { light: '반음지', water: '겉흙 마르면 흠뻑', temperature: '21~25℃' },
  },
  {
    id: 'aglaonema-siam-aurora',
    name: 'Aglaonema Siam Aurora',
    koreanName: '아글라오네마 시암오로라',
    image: '/images/plants/regular/aglaonema-siam-aurora.png',
    alt: 'Aglaonema Siam Aurora hydroponic plant',
    tagline: '잎과 줄기에 적색 색소가 발현되는 천남성과 관엽식물.',
    features: ['녹색과 적색 대비가 뚜렷함', '따뜻하고 습도 있는 환경 선호'],
    care: { light: '반양지', water: '겉흙 마르면 흠뻑', temperature: '20~25℃' },
  },
  {
    id: 'aglaonema-snow-sapphire',
    name: 'Aglaonema Snow Sapphire',
    koreanName: '아글라오네마 스노우 사파이어',
    image: '/images/plants/regular/aglaonema-snow-sapphire.png',
    alt: 'Aglaonema Snow Sapphire hydroponic plant',
    tagline: '흰 바탕에 녹색 무늬가 흩뿌려진 아글라오네마 계열 공기정화식물.',
    features: ['광량 부족 시 무늬가 흐려짐', '과광에서는 잎 변색과 화상 가능'],
    care: { light: '반양지', water: '겉흙 마르면 흠뻑', temperature: '20~25℃' },
  },
  {
    id: 'aglaonema-angel',
    name: 'Aglaonema Angel',
    koreanName: '아글라오네마 엔젤',
    image: '/images/plants/regular/aglaonema-angel.png',
    alt: 'Aglaonema Angel hydroponic plant',
    tagline: '붉은 엽색이 산발적으로 발현되는 아글라오네마 품종.',
    features: ['포름알데히드 제거 효과가 알려진 공기정화식물', '저온에 약함'],
    care: { light: '반음지', water: '겉흙 마르면 흠뻑', temperature: '20~30℃' },
  },
  {
    id: 'maidenhair-fern',
    name: 'Maidenhair Fern',
    koreanName: '아디안텀고사리',
    image: '/images/plants/regular/maidenhair-fern.png',
    alt: 'Maidenhair Fern hydroponic plant',
    tagline: '섬세한 잎과 가는 줄기가 특징인 고습도 선호 양치식물.',
    features: ['건조 시 잎 마름이 빠르게 나타남', '직사광선과 찬바람에 민감'],
    care: { light: '반그늘', water: '겉흙 마르면 흠뻑', temperature: '20~25℃' },
  },
  {
    id: 'areca-palm',
    name: 'Areca Palm',
    koreanName: '아레카야자',
    image: '/images/plants/regular/areca-palm.png',
    alt: 'Areca Palm hydroponic plant',
    tagline: '야자과 관엽식물로 실내 습도 조절과 공간 녹화 효과가 좋은 식물.',
    features: ['공기정화 및 증산작용 우수', '밝은 반양지에서 안정적으로 생육'],
    care: { light: '반양지', water: '겉흙 마르면 흠뻑', temperature: '20~27℃' },
  },
  {
    id: 'asparagus-nanus',
    name: 'Asparagus Nanus',
    koreanName: '아스파라거스 나누스',
    image: '/images/plants/regular/asparagus-nanus.png',
    alt: 'Asparagus Nanus hydroponic plant',
    tagline: '백합과 계열의 섬세한 잎을 가진 관엽식물.',
    features: ['생장 속도가 빠르고 회복력 우수', '반려동물 접촉 시 독성 주의'],
    care: { light: '반양지', water: '겉흙 마르면 흠뻑', temperature: '15~25℃' },
  },
  {
    id: 'asparagus-meyeri',
    name: 'Asparagus Meyeri',
    koreanName: '아스파라거스 메이리',
    image: '/images/plants/regular/asparagus-meyeri.png',
    alt: 'Asparagus Meyeri hydroponic plant',
    tagline: '뿌리 끝에 수분을 저장하는 괴근을 가진 아스파라거스류.',
    features: ['과습 시 괴근 비대 및 뿌리 손상 가능', '광량 부족·건조 시 황변 발생'],
    care: { light: '반양지', water: '겉흙 마르면 흠뻑', temperature: '15~25℃' },
  },
  {
    id: 'alocasia-green-velvet',
    name: 'Alocasia Green Velvet',
    koreanName: '알로카시아 그린벨벳',
    image: '/images/plants/regular/alocasia-green-velvet.png',
    alt: 'Alocasia Green Velvet hydroponic plant',
    tagline: '벨벳 질감의 진녹색 잎과 흰 잎맥이 대비되는 희귀 관엽식물.',
    features: ['강한 직사광선에 잎 손상 가능', '고온다습한 환경에서 안정적 생육'],
    care: { light: '반양지', water: '겉흙 마르면 흠뻑', temperature: '18~29℃' },
  },
  {
    id: 'epipremnum-njoy',
    name: "Epipremnum N'Joy",
    koreanName: '엔조이 스칸답서스',
    image: '/images/plants/regular/epipremnum-njoy.png',
    alt: "Epipremnum N'Joy hydroponic plant",
    tagline: '녹색과 백색 무늬가 불규칙하게 나타나는 스킨답서스 무늬종.',
    features: ['일반 스킨답서스보다 생장 속도 느림', '무늬 보존을 위해 밝은 간접광 필요'],
    care: { light: '반양지·반그늘', water: '겉흙 마르면 흠뻑', temperature: '15~25℃' },
  },
  {
    id: 'calathea-orbifolia',
    name: 'Calathea Orbifolia',
    koreanName: '오르비폴리아',
    image: '/images/plants/regular/calathea-orbifolia.png',
    alt: 'Calathea Orbifolia hydroponic plant',
    tagline: '넓은 잎과 은빛 줄무늬가 특징인 칼라데아 계열 관엽식물.',
    features: ['수돗물 염소·무기질에 민감할 수 있음', '공중습도 유지가 중요'],
    care: { light: '반양지', water: '겉흙 마르면 흠뻑', temperature: '15~25℃' },
  },
  {
    id: 'humata-fern',
    name: 'Humata Fern',
    koreanName: '후마타고사리',
    image: '/images/plants/regular/humata-fern.png',
    alt: 'Humata Fern hydroponic plant',
    tagline: '흰색 지하경이 외부로 드러나는 고사리과 상록 양치식물.',
    features: ['토끼발고사리로 불리는 지하경 발달', '건조에는 비교적 강하나 과습 주의'],
    care: { light: '반그늘', water: '겉흙 마르면 흠뻑', temperature: '15~30℃' },
  },
  {
    id: 'rhaphidophora-tetrasperma',
    name: 'Rhaphidophora Tetrasperma',
    koreanName: '히메몬스테라',
    image: '/images/plants/regular/rhaphidophora-tetrasperma.png',
    alt: 'Rhaphidophora Tetrasperma hydroponic plant',
    tagline: '지지대를 타고 오르는 아열대성 덩굴 관엽식물.',
    features: ['수직 유인 재배에 적합', '저온에 약해 겨울 실내 관리 필요'],
    care: { light: '반양지·반음지', water: '겉흙 마르면 흠뻑', temperature: '15~25℃' },
  },
]

/** 네이버 스마트스토어 URL — 실제 스토어 주소로 교체하세요 */
export const naverStoreUrl = 'https://smartstore.naver.com/'

export const storyBlocks: StoryBlock[] = [
  {
    id: 's1',
    image: '/images/story/store-retouched.png',
    alt: '자연광이 들어오는 KEEP THE MOMENT 라이프스타일 공간',
    size: 'wide',
  },
  {
    id: 's2',
    image: '/images/story/gift-pouch.png',
    alt: '누군가의 하루를 위해 반투명 파우치에 담긴 작은 식물 선물',
    size: 'portrait',
  },
]

export const hydroponic = {
  title: 'Water & Soil.',
  description: '수경식물은 물속에서도 건강하게 자라고, 흙으로 옮겨 심어도 자연스럽게 적응합니다.',
  image: '/images/content/hydroponic.webp',
  alt: '맑은 물 안으로 섬세한 뿌리가 보이는 수경식물',
}

export const storeInfo = {
  name: 'KEEP THE MOMENT',
  address: '경기 수원시 팔달구 신풍로63번길 14 2층',
  addressDetail: '2F, 14, Sinpung-ro 63beon-gil, Paldal-gu, Suwon-si, Gyeonggi-do',
  hours: [
    { day: 'Mon – Fri', time: '12:00 – 20:00' },
    { day: 'Sat – Sun', time: '12:00 – 20:00' },
  ],
  phone: '02-0000-0000',
  mapUrl: 'https://map.naver.com/p/entry/place/2000545659?c=15.00,0,0,0,dh',
  placeUrl: 'https://naver.me/',
  instagramUrl: 'https://www.instagram.com/keepthemoment_official/',
  image: '/images/story/store-visit.png',
  alt: '자연광이 가득한 KEEP THE MOMENT 행궁 매장 인테리어',
}

export const footerLinks: SocialLink[] = [
  { id: 'instagram', label: 'Instagram', href: storeInfo.instagramUrl },
  { id: 'blog', label: 'Naver Blog', href: 'https://blog.naver.com/' },
  { id: 'store', label: 'Naver Store', href: naverStoreUrl },
]

export const privacyPolicyUrl = '#privacy'
