import { getSanityClient, isSanityConfigured, urlFor } from '../lib/sanity'
import { siteContentQuery } from '../lib/sanityQueries'
import { getFallbackSiteContent, type SiteContent } from './siteContent'
import type { Collection, FragranceBrand, GiftOption, PlantItem, StoryBlock } from './siteData'

type SanityImageFields = {
  imageUrl?: string | null
  image?: {
    asset?: {
      _ref?: string
      _type?: string
      url?: string
    }
  } | null
}

function resolveImageUrl(fields: SanityImageFields | null | undefined, fallback: string): string {
  if (!fields) return fallback

  const built = fields.image ? urlFor(fields.image)?.width(1600).auto('format').url() : null
  return built || fields.imageUrl || fields.image?.asset?.url || fallback
}

type SanityPlant = SanityImageFields & {
  id?: string
  name?: string
  koreanName?: string
  category?: 'rare' | 'everyday'
  alt?: string
  tagline?: string
  features?: string[]
  care?: {
    light?: string
    water?: string
    temperature?: string
  }
}

type SanityCollection = SanityImageFields & {
  id?: string
  name?: string
  tagline?: string
  alt?: string
  aspectRatio?: string
  href?: string
}

type SanityStoryBlock = SanityImageFields & {
  id?: string
  alt?: string
  size?: 'wide' | 'portrait'
}

type SanityFragranceBrand = SanityImageFields & {
  name?: string
  alt?: string
  href?: string
  logoWidth?: string
  darkLogo?: boolean
}

type SanityGiftOption = SanityImageFields & {
  title?: string
  alt?: string
  copy?: string
}

type SanityHeroSlide = {
  alt?: string
  mobileOnly?: boolean
  objectPosition?: string
  desktopImageUrl?: string | null
  desktopImage?: SanityImageFields['image']
  mobileImageUrl?: string | null
  mobileImage?: SanityImageFields['image']
}

type SanityPayload = {
  brand?: {
    name?: string
    tagline?: string
    shortDescription?: string
  } | null
  hero?: { slides?: SanityHeroSlide[] | null } | null
  collections?: SanityCollection[] | null
  plants?: SanityPlant[] | null
  storyBlocks?: SanityStoryBlock[] | null
  fragrancePage?: {
    eyebrow?: string
    title?: string
    lead?: string
    note?: string
    brands?: SanityFragranceBrand[] | null
  } | null
  giftPage?: {
    eyebrow?: string
    title?: string
    lead?: string
    note?: string
    options?: SanityGiftOption[] | null
  } | null
  hydroponic?: (SanityImageFields & {
    title?: string
    description?: string
    alt?: string
  }) | null
  storeInfo?: (SanityImageFields & {
    name?: string
    address?: string
    addressDetail?: string
    hours?: { day?: string; time?: string }[]
    phone?: string
    mapUrl?: string
    placeUrl?: string
    instagramUrl?: string
    alt?: string
  }) | null
  siteSettings?: {
    navItems?: SiteContent['navItems']
    footerLinks?: SiteContent['footerLinks']
    naverStoreUrl?: string
    privacyPolicyUrl?: string
  } | null
}

function mapPlant(item: SanityPlant, fallback: PlantItem): PlantItem {
  return {
    id: item.id || fallback.id,
    name: item.name || fallback.name,
    koreanName: item.koreanName || fallback.koreanName,
    image: resolveImageUrl(item, fallback.image),
    alt: item.alt || fallback.alt,
    tagline: item.tagline || fallback.tagline,
    features: item.features?.length ? item.features : fallback.features,
    care: {
      light: item.care?.light || fallback.care.light,
      water: item.care?.water || fallback.care.water,
      temperature: item.care?.temperature || fallback.care.temperature,
    },
  }
}

function mapCollection(item: SanityCollection, index: number, fallbackList: Collection[]): Collection {
  const fallback = fallbackList[index] ?? fallbackList[0]
  return {
    id: item.id || fallback.id,
    name: item.name || fallback.name,
    tagline: item.tagline || fallback.tagline,
    image: resolveImageUrl(item, fallback.image),
    alt: item.alt || fallback.alt,
    aspectRatio: item.aspectRatio || fallback.aspectRatio,
    href: item.href || fallback.href,
  }
}

function mapHeroSlide(slide: SanityHeroSlide, fallback: SiteContent['hero']['images'][number]) {
  const desktopSrc = resolveImageUrl(
    { imageUrl: slide.desktopImageUrl, image: slide.desktopImage },
    fallback.src,
  )
  const mobileSrc = slide.mobileImage || slide.mobileImageUrl
    ? resolveImageUrl({ imageUrl: slide.mobileImageUrl, image: slide.mobileImage }, desktopSrc)
    : undefined

  return {
    src: desktopSrc,
    mobileSrc,
    alt: slide.alt || fallback.alt,
    mobileOnly: slide.mobileOnly ?? fallback.mobileOnly,
    objectPosition: slide.objectPosition || fallback.objectPosition,
  }
}

function mapStoryBlock(
  item: SanityStoryBlock,
  index: number,
  fallbackList: StoryBlock[],
): StoryBlock {
  const fallback = fallbackList[index] ?? fallbackList[0]
  return {
    id: item.id || fallback.id,
    image: resolveImageUrl(item, fallback.image),
    alt: item.alt || fallback.alt,
    size: item.size || fallback.size,
  }
}

function mapFragranceBrand(
  item: SanityFragranceBrand,
  index: number,
  fallbackList: FragranceBrand[],
): FragranceBrand {
  const fallback = fallbackList[index] ?? fallbackList[0]
  return {
    id: fallback.id,
    name: item.name || fallback.name,
    image: resolveImageUrl(item, fallback.image),
    alt: item.alt || fallback.alt,
    href: item.href || fallback.href,
    logoWidth: item.logoWidth || fallback.logoWidth,
    darkLogo: item.darkLogo ?? fallback.darkLogo,
  }
}

function mapGiftOption(
  item: SanityGiftOption,
  index: number,
  fallbackList: GiftOption[],
): GiftOption {
  const fallback = fallbackList[index] ?? fallbackList[0]
  return {
    id: fallback.id,
    title: item.title || fallback.title,
    image: resolveImageUrl(item, fallback.image),
    alt: item.alt || fallback.alt,
    copy: item.copy || fallback.copy,
  }
}

export function mapSanityPayload(payload: SanityPayload): SiteContent {
  const fallback = getFallbackSiteContent()
  const plants = payload.plants ?? []
  const rareFromCms = plants.filter((plant) => plant.category === 'rare')
  const everydayFromCms = plants.filter((plant) => plant.category !== 'rare')

  const store = payload.storeInfo
  const settings = payload.siteSettings

  return {
    brand: {
      name: payload.brand?.name || fallback.brand.name,
      tagline: payload.brand?.tagline || fallback.brand.tagline,
      shortDescription:
        payload.brand?.shortDescription || fallback.brand.shortDescription,
    },
    navItems: settings?.navItems?.length ? settings.navItems : fallback.navItems,
    hero: {
      images: payload.hero?.slides?.length
        ? payload.hero.slides.map((slide, index) =>
            mapHeroSlide(slide, fallback.hero.images[index] ?? fallback.hero.images[0]),
          )
        : fallback.hero.images,
    },
    collections: payload.collections?.length
      ? payload.collections.map((item, index) =>
          mapCollection(item, index, fallback.collections),
        )
      : fallback.collections,
    rarePlantItems: rareFromCms.length
      ? rareFromCms.map((item, index) =>
          mapPlant(item, fallback.rarePlantItems[index] ?? fallback.rarePlantItems[0]),
        )
      : fallback.rarePlantItems,
    plantItems: everydayFromCms.length
      ? everydayFromCms.map((item, index) =>
          mapPlant(item, fallback.plantItems[index] ?? fallback.plantItems[0]),
        )
      : fallback.plantItems,
    storyBlocks: payload.storyBlocks?.length
      ? payload.storyBlocks.map((item, index) =>
          mapStoryBlock(item, index, fallback.storyBlocks),
        )
      : fallback.storyBlocks,
    fragrancePage: {
      eyebrow: payload.fragrancePage?.eyebrow || fallback.fragrancePage.eyebrow,
      title: payload.fragrancePage?.title || fallback.fragrancePage.title,
      lead: payload.fragrancePage?.lead || fallback.fragrancePage.lead,
      note: payload.fragrancePage?.note || fallback.fragrancePage.note,
      brands: payload.fragrancePage?.brands?.length
        ? payload.fragrancePage.brands.map((item, index) =>
            mapFragranceBrand(item, index, fallback.fragrancePage.brands),
          )
        : fallback.fragrancePage.brands,
    },
    giftPage: {
      eyebrow: payload.giftPage?.eyebrow || fallback.giftPage.eyebrow,
      title: payload.giftPage?.title || fallback.giftPage.title,
      lead: payload.giftPage?.lead || fallback.giftPage.lead,
      note: payload.giftPage?.note || fallback.giftPage.note,
      options: payload.giftPage?.options?.length
        ? payload.giftPage.options.map((item, index) =>
            mapGiftOption(item, index, fallback.giftPage.options),
          )
        : fallback.giftPage.options,
    },
    hydroponic: {
      title: payload.hydroponic?.title || fallback.hydroponic.title,
      description:
        payload.hydroponic?.description || fallback.hydroponic.description,
      image: resolveImageUrl(payload.hydroponic, fallback.hydroponic.image),
      alt: payload.hydroponic?.alt || fallback.hydroponic.alt,
    },
    storeInfo: {
      name: store?.name || fallback.storeInfo.name,
      address: store?.address || fallback.storeInfo.address,
      addressDetail: store?.addressDetail || fallback.storeInfo.addressDetail,
      hours: fallback.storeInfo.hours,
      phone: store?.phone || fallback.storeInfo.phone,
      mapUrl: fallback.storeInfo.mapUrl,
      placeUrl: store?.placeUrl || fallback.storeInfo.placeUrl,
      instagramUrl: fallback.storeInfo.instagramUrl,
      image: resolveImageUrl(store, fallback.storeInfo.image),
      alt: store?.alt || fallback.storeInfo.alt,
    },
    footerLinks: fallback.footerLinks,
    naverStoreUrl: settings?.naverStoreUrl || fallback.naverStoreUrl,
    privacyPolicyUrl: settings?.privacyPolicyUrl || fallback.privacyPolicyUrl,
    source: 'sanity',
  }
}

export async function loadSiteContent(): Promise<SiteContent> {
  const fallback = getFallbackSiteContent()

  if (!isSanityConfigured) {
    return fallback
  }

  const client = getSanityClient()
  if (!client) return fallback

  try {
    const payload = await client.fetch<SanityPayload>(siteContentQuery)

    if (!payload?.brand && !payload?.hero?.slides?.length && !payload?.plants?.length) {
      return fallback
    }

    return mapSanityPayload(payload)
  } catch (error) {
    console.warn('[cms] Failed to load Sanity content. Using local fallback.', error)
    return fallback
  }
}
