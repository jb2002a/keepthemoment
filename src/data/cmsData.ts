import { getPayload } from 'payload'
import config from '@payload-config'
import { getFallbackSiteContent, type SiteContent } from './siteContent'
import type {
  Collection,
  FragranceBrand,
  GiftOption,
  HydroponicGuideBlock,
  HydroponicGuideSection,
  PlantItem,
  StoryBlock,
} from './siteData'

type MediaLike =
  | {
      url?: string | null
      alt?: string | null
    }
  | number
  | null
  | undefined

type PayloadSeedLike = {
  brand: Record<string, unknown> | null
  hero: Record<string, unknown> | null
  homePage: Record<string, unknown> | null
  plantsPage: Record<string, unknown> | null
  fragrancePage: Record<string, unknown> | null
  giftPage: Record<string, unknown> | null
  storyPage: Record<string, unknown> | null
  hydroponic: Record<string, unknown> | null
  storeInfo: Record<string, unknown> | null
  siteSettings: Record<string, unknown> | null
  collections: Array<Record<string, unknown>>
  plants: Array<Record<string, unknown>>
  storyBlocks: Array<Record<string, unknown>>
}

const blobPublicBase =
  process.env.BLOB_PUBLIC_BASE_URL ||
  'https://dm47gnxsefhqkqgd.public.blob.vercel-storage.com'

function resolveMediaUrl(media: MediaLike, fallback: string): string {
  if (!media || typeof media === 'number') return fallback
  const url = media.url || ''
  if (!url) return fallback

  // Payload may keep API-relative media URLs even when files live in Vercel Blob.
  // Rewrite those to the public Blob CDN URL so images work on Vercel.
  if (url.startsWith('/api/media/file/')) {
    const filename = url.split('/').pop()
    if (filename) return `${blobPublicBase}/${filename}`
    if (fallback.startsWith('/')) return fallback
  }

  return url
}

function resolveAlt(
  media: MediaLike,
  explicitAlt: string | null | undefined,
  fallback: string,
): string {
  if (explicitAlt) return explicitAlt
  if (media && typeof media !== 'number' && media.alt) return media.alt
  return fallback
}

function mapHydroponicIntro(
  intro:
    | Array<{ text?: string | null } | string | null>
    | null
    | undefined,
  fallback: string[],
): string[] {
  if (!intro?.length) return fallback

  const lines = intro
    .map((item) => {
      if (typeof item === 'string') return item.trim()
      return item?.text?.trim() || ''
    })
    .filter(Boolean)

  return lines.length ? lines : fallback
}

function mapHydroponicBlock(
  block: {
    blockType?: string | null
    type?: string | null
    text?: string | null
    items?: Array<{ title?: string | null; body?: string | null }> | null
  },
): HydroponicGuideBlock | null {
  const blockType = block.blockType || block.type

  if (blockType === 'list') {
    const items =
      block.items
        ?.map((item) => ({
          title: item.title?.trim() || '',
          body: item.body?.trim() || '',
        }))
        .filter((item) => item.title || item.body) || []

    if (!items.length) return null
    return { type: 'list', items }
  }

  const text = block.text?.trim() || ''
  if (!text) return null

  if (blockType === 'quote') {
    return { type: 'quote', text }
  }

  return { type: 'paragraph', text }
}

function mapHydroponicSections(
  sections:
    | Array<{
        sectionId?: string | null
        id?: string | null
        title?: string | null
        blocks?: Array<{
          blockType?: string | null
          type?: string | null
          text?: string | null
          items?: Array<{ title?: string | null; body?: string | null }> | null
        }> | null
      }>
    | null
    | undefined,
  fallback: HydroponicGuideSection[],
): HydroponicGuideSection[] {
  if (!sections?.length) return fallback

  const mapped = sections
    .map((section, index) => {
      const title = section.title?.trim() || ''
      const blocks =
        section.blocks
          ?.map((block) => mapHydroponicBlock(block))
          .filter((block): block is HydroponicGuideBlock => Boolean(block)) || []

      if (!title && !blocks.length) return null

      return {
        id: section.sectionId || section.id || `section-${index + 1}`,
        title: title || fallback[index]?.title || `Section ${index + 1}`,
        blocks: blocks.length ? blocks : fallback[index]?.blocks || [],
      }
    })
    .filter((section): section is HydroponicGuideSection => Boolean(section))

  return mapped.length ? mapped : fallback
}

function mapPlant(
  item: {
    slug?: string | null
    name?: string | null
    koreanName?: string | null
    image?: MediaLike
    alt?: string | null
    tagline?: string | null
    features?: { value?: string | null }[] | null
    care?: {
      light?: string | null
      water?: string | null
      temperature?: string | null
    } | null
  },
  fallback: PlantItem,
): PlantItem {
  return {
    id: item.slug || fallback.id,
    name: item.name || fallback.name,
    koreanName: item.koreanName || fallback.koreanName,
    image: resolveMediaUrl(item.image, fallback.image),
    alt: resolveAlt(item.image, item.alt, fallback.alt),
    tagline: item.tagline || fallback.tagline,
    features: item.features?.length
      ? item.features.map((feature) => feature.value || '').filter(Boolean)
      : fallback.features,
    care: {
      light: item.care?.light || fallback.care.light,
      water: item.care?.water || fallback.care.water,
      temperature: item.care?.temperature || fallback.care.temperature,
    },
  }
}

function mapCollection(
  item: {
    slug?: string | null
    name?: string | null
    tagline?: string | null
    mobileTagline?: string | null
    image?: MediaLike
    alt?: string | null
    aspectRatio?: string | null
    href?: string | null
  },
  index: number,
  fallbackList: Collection[],
): Collection {
  const fallback = fallbackList[index] ?? fallbackList[0]
  return {
    id: item.slug || fallback.id,
    name: item.name || fallback.name,
    tagline: item.tagline || fallback.tagline,
    mobileTagline: item.mobileTagline || fallback.mobileTagline || item.tagline || fallback.tagline,
    image: resolveMediaUrl(item.image, fallback.image),
    alt: resolveAlt(item.image, item.alt, fallback.alt),
    aspectRatio: item.aspectRatio || fallback.aspectRatio,
    href: item.href || fallback.href,
  }
}

function mapStoryBlock(
  item: {
    slug?: string | null
    image?: MediaLike
    alt?: string | null
    size?: 'wide' | 'portrait' | null
  },
  index: number,
  fallbackList: StoryBlock[],
): StoryBlock {
  const fallback = fallbackList[index] ?? fallbackList[0]
  return {
    id: item.slug || fallback.id,
    image: resolveMediaUrl(item.image, fallback.image),
    alt: resolveAlt(item.image, item.alt, fallback.alt),
    size: item.size || fallback.size,
  }
}

function mapFragranceBrand(
  item: {
    id?: string | null
    name?: string | null
    image?: MediaLike
    alt?: string | null
    href?: string | null
    logoWidth?: string | null
    darkLogo?: boolean | null
  },
  index: number,
  fallbackList: FragranceBrand[],
): FragranceBrand {
  const fallback = fallbackList[index] ?? fallbackList[0]
  return {
    id: item.id || fallback.id,
    name: item.name || fallback.name,
    image: resolveMediaUrl(item.image, fallback.image),
    alt: resolveAlt(item.image, item.alt, fallback.alt),
    href: item.href || fallback.href,
    logoWidth: item.logoWidth || fallback.logoWidth,
    darkLogo: item.darkLogo ?? fallback.darkLogo,
  }
}

function mapGiftOption(
  item: {
    id?: string | null
    title?: string | null
    image?: MediaLike
    alt?: string | null
    copy?: string | null
  },
  index: number,
  fallbackList: GiftOption[],
): GiftOption {
  const fallback = fallbackList[index] ?? fallbackList[0]
  return {
    id: item.id || fallback.id,
    title: item.title || fallback.title,
    image: resolveMediaUrl(item.image, fallback.image),
    alt: resolveAlt(item.image, item.alt, fallback.alt),
    copy: item.copy || fallback.copy,
  }
}

export function mapPayloadContent(input: PayloadSeedLike): SiteContent {
  const fallback = getFallbackSiteContent()

  const brand = input.brand as {
    name?: string
    tagline?: string
    shortDescription?: string
  } | null

  const hero = input.hero as {
    slides?: Array<{
      desktopImage?: MediaLike
      mobileImage?: MediaLike
      alt?: string
      mobileOnly?: boolean
      objectPosition?: string
    }>
  } | null

  const homePage = input.homePage as {
    introTitle?: string
    introDescription?: string
    introActions?: Array<{ label?: string; href?: string }>
    linkCards?: Array<{
      id?: string
      eyebrow?: string
      title?: string
      description?: string
      href?: string
    }>
  } | null

  const plantsPage = input.plantsPage as {
    eyebrow?: string
    title?: string
    lead?: string
    leadMobile?: string
    rareEyebrow?: string
    rareTitle?: string
    rareCopy?: string
    everydayEyebrow?: string
    everydayTitle?: string
  } | null

  const fragrancePage = input.fragrancePage as {
    eyebrow?: string
    title?: string
    lead?: string
    note?: string
    brands?: Array<Record<string, unknown>>
  } | null

  const giftPage = input.giftPage as {
    eyebrow?: string
    title?: string
    lead?: string
    note?: string
    options?: Array<Record<string, unknown>>
  } | null

  const storyPage = input.storyPage as {
    eyebrow?: string
    title?: string
    lead?: string
  } | null

  const hydroponic = input.hydroponic as {
    eyebrow?: string
    title?: string
    description?: string
    image?: MediaLike
    alt?: string
    intro?: Array<{ text?: string | null } | string | null>
    sections?: Array<{
      sectionId?: string | null
      id?: string | null
      title?: string | null
      blocks?: Array<{
        blockType?: string | null
        type?: string | null
        text?: string | null
        items?: Array<{ title?: string | null; body?: string | null }> | null
      }> | null
    }>
  } | null

  const store = input.storeInfo as {
    eyebrow?: string
    title?: string
    name?: string
    address?: string
    addressDetail?: string
    hours?: Array<{ day?: string; time?: string }>
    mapButtonLabel?: string
    phone?: string
    mapUrl?: string
    placeUrl?: string
    instagramUrl?: string
    image?: MediaLike
    alt?: string
    mobileBottomImage?: MediaLike
    mobileBottomAlt?: string
  } | null

  const settings = input.siteSettings as {
    navItems?: SiteContent['navItems']
    mobileNavItems?: SiteContent['mobileNavItems']
    mobileVisitCtaLabel?: string
    mobileVisitCtaHref?: string
    footerLinks?: SiteContent['footerLinks']
    naverStoreUrl?: string
    privacyPolicyUrl?: string
  } | null

  const plants = input.plants as Array<{
    slug?: string
    name?: string
    koreanName?: string
    category?: 'rare' | 'everyday'
    image?: MediaLike
    alt?: string
    tagline?: string
    features?: { value?: string }[]
    care?: { light?: string; water?: string; temperature?: string }
  }>

  const rareFromCms = plants.filter((plant) => plant.category === 'rare')
  const everydayFromCms = plants.filter((plant) => plant.category !== 'rare')

  return {
    brand: {
      name: brand?.name || fallback.brand.name,
      tagline: brand?.tagline || fallback.brand.tagline,
      shortDescription: brand?.shortDescription || fallback.brand.shortDescription,
    },
    navItems: settings?.navItems?.length ? settings.navItems : fallback.navItems,
    mobileNavItems: settings?.mobileNavItems?.length
      ? settings.mobileNavItems
      : fallback.mobileNavItems,
    mobileVisitCta: {
      label: settings?.mobileVisitCtaLabel || fallback.mobileVisitCta.label,
      href: settings?.mobileVisitCtaHref || fallback.mobileVisitCta.href,
    },
    hero: {
      images: hero?.slides?.length
        ? hero.slides.map((slide, index) => {
            const fallbackSlide = fallback.hero.images[index] ?? fallback.hero.images[0]
            const mobileOnly = slide.mobileOnly ?? fallbackSlide.mobileOnly ?? false

            if (mobileOnly) {
              const mobileSrc = resolveMediaUrl(
                slide.mobileImage || slide.desktopImage,
                fallbackSlide.mobileSrc || fallbackSlide.src,
              )
              return {
                src: mobileSrc,
                mobileSrc,
                alt: slide.alt || fallbackSlide.alt,
                mobileOnly: true,
                objectPosition: slide.objectPosition || fallbackSlide.objectPosition,
              }
            }

            const desktopSrc = resolveMediaUrl(slide.desktopImage, fallbackSlide.src)
            const mobileSrc = slide.mobileImage
              ? resolveMediaUrl(slide.mobileImage, fallbackSlide.mobileSrc || desktopSrc)
              : fallbackSlide.mobileSrc
            return {
              src: desktopSrc,
              mobileSrc,
              alt: slide.alt || fallbackSlide.alt,
              mobileOnly: false,
              objectPosition: slide.objectPosition || fallbackSlide.objectPosition,
            }
          })
        : fallback.hero.images,
    },
    homePage: {
      introTitle: homePage?.introTitle || fallback.homePage.introTitle,
      introDescription: homePage?.introDescription || fallback.homePage.introDescription,
      introActions: homePage?.introActions?.length
        ? homePage.introActions.map((action) => ({
            label: action.label || '',
            href: action.href || '',
          }))
        : fallback.homePage.introActions,
      linkCards: homePage?.linkCards?.length
        ? homePage.linkCards.map((card, index) => {
            const fallbackCard =
              fallback.homePage.linkCards[index] ?? fallback.homePage.linkCards[0]
            return {
              id: card.id || fallbackCard.id,
              eyebrow: card.eyebrow || fallbackCard.eyebrow,
              title: card.title || fallbackCard.title,
              description: card.description || fallbackCard.description,
              href: card.href || fallbackCard.href,
            }
          })
        : fallback.homePage.linkCards,
    },
    plantsPage: {
      eyebrow: plantsPage?.eyebrow || fallback.plantsPage.eyebrow,
      title: plantsPage?.title || fallback.plantsPage.title,
      lead: plantsPage?.lead || fallback.plantsPage.lead,
      leadMobile: plantsPage?.leadMobile || fallback.plantsPage.leadMobile,
      rareEyebrow: plantsPage?.rareEyebrow || fallback.plantsPage.rareEyebrow,
      rareTitle: plantsPage?.rareTitle || fallback.plantsPage.rareTitle,
      rareCopy: plantsPage?.rareCopy || fallback.plantsPage.rareCopy,
      everydayEyebrow: plantsPage?.everydayEyebrow || fallback.plantsPage.everydayEyebrow,
      everydayTitle: plantsPage?.everydayTitle || fallback.plantsPage.everydayTitle,
    },
    collections: input.collections.length
      ? input.collections.map((item, index) =>
          mapCollection(item as Parameters<typeof mapCollection>[0], index, fallback.collections),
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
    storyBlocks: input.storyBlocks.length
      ? input.storyBlocks.map((item, index) =>
          mapStoryBlock(
            item as Parameters<typeof mapStoryBlock>[0],
            index,
            fallback.storyBlocks,
          ),
        )
      : fallback.storyBlocks,
    storyPage: {
      eyebrow: storyPage?.eyebrow || fallback.storyPage.eyebrow,
      title: storyPage?.title || fallback.storyPage.title,
      lead: storyPage?.lead || fallback.storyPage.lead,
    },
    fragrancePage: {
      eyebrow: fragrancePage?.eyebrow || fallback.fragrancePage.eyebrow,
      title: fragrancePage?.title || fallback.fragrancePage.title,
      lead: fragrancePage?.lead || fallback.fragrancePage.lead,
      note: fragrancePage?.note || fallback.fragrancePage.note,
      brands: fragrancePage?.brands?.length
        ? fragrancePage.brands.map((item, index) =>
            mapFragranceBrand(
              item as Parameters<typeof mapFragranceBrand>[0],
              index,
              fallback.fragrancePage.brands,
            ),
          )
        : fallback.fragrancePage.brands,
    },
    giftPage: {
      eyebrow: giftPage?.eyebrow || fallback.giftPage.eyebrow,
      title: giftPage?.title || fallback.giftPage.title,
      lead: giftPage?.lead || fallback.giftPage.lead,
      note: giftPage?.note || fallback.giftPage.note,
      options: giftPage?.options?.length
        ? giftPage.options.map((item, index) =>
            mapGiftOption(
              item as Parameters<typeof mapGiftOption>[0],
              index,
              fallback.giftPage.options,
            ),
          )
        : fallback.giftPage.options,
    },
    hydroponic: {
      eyebrow: hydroponic?.eyebrow || fallback.hydroponic.eyebrow,
      title: hydroponic?.title || fallback.hydroponic.title,
      description: hydroponic?.description || fallback.hydroponic.description,
      image: resolveMediaUrl(hydroponic?.image, fallback.hydroponic.image),
      alt: resolveAlt(hydroponic?.image, hydroponic?.alt, fallback.hydroponic.alt),
      intro: mapHydroponicIntro(hydroponic?.intro, fallback.hydroponic.intro),
      sections: mapHydroponicSections(
        hydroponic?.sections,
        fallback.hydroponic.sections,
      ),
    },
    storeInfo: {
      eyebrow: store?.eyebrow || fallback.storeInfo.eyebrow,
      title: store?.title || fallback.storeInfo.title,
      name: store?.name || fallback.storeInfo.name,
      address: store?.address || fallback.storeInfo.address,
      addressDetail: store?.addressDetail || fallback.storeInfo.addressDetail,
      hours: store?.hours?.length
        ? store.hours.map((row) => ({
            day: row.day || '',
            time: row.time || '',
          }))
        : fallback.storeInfo.hours,
      mapButtonLabel: store?.mapButtonLabel || fallback.storeInfo.mapButtonLabel,
      phone: store?.phone || fallback.storeInfo.phone,
      mapUrl: store?.mapUrl || fallback.storeInfo.mapUrl,
      placeUrl: store?.placeUrl || fallback.storeInfo.placeUrl,
      instagramUrl: store?.instagramUrl || fallback.storeInfo.instagramUrl,
      image: resolveMediaUrl(store?.image, fallback.storeInfo.image),
      alt: resolveAlt(store?.image, store?.alt, fallback.storeInfo.alt),
      mobileBottomImage: resolveMediaUrl(
        store?.mobileBottomImage,
        fallback.storeInfo.mobileBottomImage,
      ),
      mobileBottomAlt: resolveAlt(
        store?.mobileBottomImage,
        store?.mobileBottomAlt,
        fallback.storeInfo.mobileBottomAlt,
      ),
    },
    footerLinks: settings?.footerLinks?.length ? settings.footerLinks : fallback.footerLinks,
    naverStoreUrl: settings?.naverStoreUrl || fallback.naverStoreUrl,
    privacyPolicyUrl: settings?.privacyPolicyUrl || fallback.privacyPolicyUrl,
    source: 'payload',
  }
}

export async function loadSiteContent(): Promise<SiteContent> {
  const fallback = getFallbackSiteContent()

  if (!process.env.DATABASE_URI) {
    return fallback
  }

  try {
    const payload = await getPayload({ config })

    const [
      brand,
      hero,
      homePage,
      plantsPage,
      fragrancePage,
      giftPage,
      storyPage,
      hydroponic,
      storeInfo,
      siteSettings,
      collectionsResult,
      plantsResult,
      storyBlocksResult,
    ] = await Promise.all([
      payload.findGlobal({ slug: 'brand', depth: 1 }),
      payload.findGlobal({ slug: 'hero', depth: 2 }),
      payload.findGlobal({ slug: 'home-page', depth: 0 }),
      payload.findGlobal({ slug: 'plants-page', depth: 0 }),
      payload.findGlobal({ slug: 'fragrance-page', depth: 2 }),
      payload.findGlobal({ slug: 'gift-page', depth: 2 }),
      payload.findGlobal({ slug: 'story-page', depth: 0 }),
      payload.findGlobal({ slug: 'hydroponic', depth: 1 }),
      payload.findGlobal({ slug: 'store-info', depth: 1 }),
      payload.findGlobal({ slug: 'site-settings', depth: 0 }),
      payload.find({
        collection: 'collections',
        depth: 1,
        limit: 100,
        sort: 'order',
      }),
      payload.find({
        collection: 'plants',
        depth: 1,
        limit: 200,
        sort: 'order',
      }),
      payload.find({
        collection: 'story-blocks',
        depth: 1,
        limit: 100,
        sort: 'order',
      }),
    ])

    if (
      !collectionsResult.docs.length &&
      !plantsResult.docs.length &&
      !(hero as { slides?: unknown[] | null }).slides?.length
    ) {
      return fallback
    }

    return mapPayloadContent({
      brand: brand as unknown as Record<string, unknown>,
      hero: hero as unknown as Record<string, unknown>,
      homePage: homePage as unknown as Record<string, unknown>,
      plantsPage: plantsPage as unknown as Record<string, unknown>,
      fragrancePage: fragrancePage as unknown as Record<string, unknown>,
      giftPage: giftPage as unknown as Record<string, unknown>,
      storyPage: storyPage as unknown as Record<string, unknown>,
      hydroponic: hydroponic as unknown as Record<string, unknown>,
      storeInfo: storeInfo as unknown as Record<string, unknown>,
      siteSettings: siteSettings as unknown as Record<string, unknown>,
      collections: collectionsResult.docs as unknown as Array<Record<string, unknown>>,
      plants: plantsResult.docs as unknown as Array<Record<string, unknown>>,
      storyBlocks: storyBlocksResult.docs as unknown as Array<Record<string, unknown>>,
    })
  } catch (error) {
    console.warn('[cms] Failed to load Payload content. Using local fallback.', error)
    return fallback
  }
}
