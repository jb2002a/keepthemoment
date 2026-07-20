import { getSanityClient, isSanityConfigured, urlFor } from '../lib/sanity'
import { siteContentQuery } from '../lib/sanityQueries'
import { getFallbackSiteContent, type SiteContent } from './siteContent'
import type { Collection, PlantItem, StoryBlock } from './siteData'

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

type SanityPayload = {
  brand?: {
    name?: string
    tagline?: string
    shortDescription?: string
  } | null
  hero?: (SanityImageFields & { alt?: string }) | null
  collections?: SanityCollection[] | null
  plants?: SanityPlant[] | null
  storyBlocks?: SanityStoryBlock[] | null
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
      images: [
        {
          src: resolveImageUrl(payload.hero, fallback.hero.images[0].src),
          mobileSrc: fallback.hero.images[0].mobileSrc,
          alt: payload.hero?.alt || fallback.hero.images[0].alt,
        },
        ...fallback.hero.images.slice(1),
      ],
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
      hours:
        store?.hours
          ?.filter((row): row is { day: string; time: string } =>
            Boolean(row.day && row.time),
          )
          .map((row) => ({ day: row.day, time: row.time })) ||
        fallback.storeInfo.hours,
      phone: store?.phone || fallback.storeInfo.phone,
      mapUrl: store?.mapUrl || fallback.storeInfo.mapUrl,
      placeUrl: store?.placeUrl || fallback.storeInfo.placeUrl,
      instagramUrl: store?.instagramUrl || fallback.storeInfo.instagramUrl,
      image: resolveImageUrl(store, fallback.storeInfo.image),
      alt: store?.alt || fallback.storeInfo.alt,
    },
    footerLinks: settings?.footerLinks?.length
      ? settings.footerLinks
      : fallback.footerLinks,
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

    if (!payload?.brand && !payload?.hero && !payload?.plants?.length) {
      return fallback
    }

    return mapSanityPayload(payload)
  } catch (error) {
    console.warn('[cms] Failed to load Sanity content. Using local fallback.', error)
    return fallback
  }
}
