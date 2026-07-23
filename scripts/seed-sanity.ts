import { createReadStream, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'
import {
  brand,
  collections,
  footerLinks,
  fragranceBrands,
  fragrancePageContent,
  giftOptions,
  giftPageContent,
  hero,
  hydroponic,
  navItems,
  naverStoreUrl,
  plantItems,
  privacyPolicyUrl,
  rarePlantItems,
  storeInfo,
  storyBlocks,
} from '../src/data/siteData'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

const projectId =
  process.env.SANITY_PROJECT_ID ||
  process.env.VITE_SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID
const dataset =
  process.env.SANITY_DATASET ||
  process.env.VITE_SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  'production'
const token = process.env.SANITY_API_WRITE_TOKEN
const apiVersion = process.env.SANITY_API_VERSION || '2025-01-01'

const dryRun = process.argv.includes('--dry-run')

if (!dryRun && (!projectId || projectId === 'your-project-id')) {
  console.error('Missing SANITY_PROJECT_ID / VITE_SANITY_PROJECT_ID')
  process.exit(1)
}

if (!dryRun && !token) {
  console.error('Missing SANITY_API_WRITE_TOKEN (Editor/Admin write token)')
  process.exit(1)
}

const client = dryRun
  ? null
  : createClient({
      projectId: projectId!,
      dataset,
      apiVersion,
      token: token!,
      useCdn: false,
    })

const imageCache = new Map<string, { _type: 'image'; asset: { _type: 'reference'; _ref: string } }>()

function publicPathFromSrc(src: string): string {
  return path.join(rootDir, 'public', src.replace(/^\//, ''))
}

async function uploadImage(src: string) {
  if (imageCache.has(src)) return imageCache.get(src)!

  const absolute = publicPathFromSrc(src)
  if (!existsSync(absolute)) {
    throw new Error(`Image not found: ${absolute}`)
  }

  if (dryRun || !client) {
    const image = {
      _type: 'image' as const,
      asset: {
        _type: 'reference' as const,
        _ref: `dry-run-${path.basename(absolute)}`,
      },
    }
    imageCache.set(src, image)
    console.log(`  [dry-run] image ready ${src}`)
    return image
  }

  const filename = path.basename(absolute)
  const asset = await client.assets.upload('image', createReadStream(absolute), {
    filename,
  })

  const image = {
    _type: 'image' as const,
    asset: {
      _type: 'reference' as const,
      _ref: asset._id,
    },
  }

  imageCache.set(src, image)
  console.log(`  uploaded ${src}`)
  return image
}

async function createOrReplace(doc: Record<string, unknown>) {
  if (dryRun || !client) {
    console.log(`  [dry-run] upsert ${doc._type}/${doc._id}`)
    return
  }
  await client.createOrReplace(doc)
  console.log(`  upserted ${doc._type}/${doc._id}`)
}

async function seed() {
  console.log(
    dryRun
      ? 'Dry-run: validating seed payload and local image paths...'
      : `Seeding Sanity project ${projectId}/${dataset}...`,
  )

  await createOrReplace({
    _id: 'brand',
    _type: 'brand',
    ...brand,
  })

  await createOrReplace({
    _id: 'hero',
    _type: 'hero',
    slides: await Promise.all(
      hero.images.map(async (slide, index) => ({
        _type: 'heroSlide',
        _key: `slide-${index}`,
        alt: slide.alt,
        mobileOnly: slide.mobileOnly ?? false,
        objectPosition: slide.objectPosition,
        desktopImage: await uploadImage(slide.src),
        mobileImage:
          slide.mobileSrc && slide.mobileSrc !== slide.src
            ? await uploadImage(slide.mobileSrc)
            : undefined,
      })),
    ),
  })

  for (const [index, item] of collections.entries()) {
    await createOrReplace({
      _id: `collection.${item.id}`,
      _type: 'collection',
      slug: { _type: 'slug', current: item.id },
      name: item.name,
      tagline: item.tagline,
      alt: item.alt,
      aspectRatio: item.aspectRatio,
      href: item.href,
      order: index,
      image: await uploadImage(item.image),
    })
  }

  const allPlants = [
    ...rarePlantItems.map((item, index) => ({ ...item, category: 'rare' as const, order: index })),
    ...plantItems.map((item, index) => ({
      ...item,
      category: 'everyday' as const,
      order: index + rarePlantItems.length,
    })),
  ]

  for (const item of allPlants) {
    await createOrReplace({
      _id: `plantItem.${item.id}`,
      _type: 'plantItem',
      slug: { _type: 'slug', current: item.id },
      name: item.name,
      koreanName: item.koreanName,
      category: item.category,
      alt: item.alt,
      tagline: item.tagline,
      features: item.features,
      care: item.care,
      order: item.order,
      image: await uploadImage(item.image),
    })
  }

  for (const [index, block] of storyBlocks.entries()) {
    await createOrReplace({
      _id: `storyBlock.${block.id}`,
      _type: 'storyBlock',
      slug: { _type: 'slug', current: block.id },
      alt: block.alt,
      size: block.size,
      order: index,
      image: await uploadImage(block.image),
    })
  }

  await createOrReplace({
    _id: 'fragrancePage',
    _type: 'fragrancePage',
    ...fragrancePageContent,
    brands: await Promise.all(
      fragranceBrands.map(async (item, index) => ({
        _type: 'fragranceBrand',
        _key: item.id || `brand-${index}`,
        name: item.name,
        alt: item.alt,
        href: item.href,
        logoWidth: item.logoWidth,
        darkLogo: item.darkLogo ?? false,
        image: await uploadImage(item.image),
      })),
    ),
  })

  await createOrReplace({
    _id: 'giftPage',
    _type: 'giftPage',
    ...giftPageContent,
    options: await Promise.all(
      giftOptions.map(async (item, index) => ({
        _type: 'giftOption',
        _key: item.id || `option-${index}`,
        title: item.title,
        alt: item.alt,
        copy: item.copy,
        image: await uploadImage(item.image),
      })),
    ),
  })

  await createOrReplace({
    _id: 'hydroponic',
    _type: 'hydroponic',
    title: hydroponic.title,
    description: hydroponic.description,
    alt: hydroponic.alt,
    image: await uploadImage(hydroponic.image),
  })

  await createOrReplace({
    _id: 'storeInfo',
    _type: 'storeInfo',
    name: storeInfo.name,
    address: storeInfo.address,
    addressDetail: storeInfo.addressDetail,
    hours: storeInfo.hours.map((row) => ({
      _type: 'object',
      _key: row.day.replace(/\s+/g, '-'),
      day: row.day,
      time: row.time,
    })),
    phone: storeInfo.phone,
    mapUrl: storeInfo.mapUrl,
    placeUrl: storeInfo.placeUrl,
    instagramUrl: storeInfo.instagramUrl,
    alt: storeInfo.alt,
    image: await uploadImage(storeInfo.image),
  })

  await createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    navItems: navItems.map((item) => ({
      _type: 'object',
      _key: item.id,
      ...item,
    })),
    footerLinks: footerLinks.map((item) => ({
      _type: 'object',
      _key: item.id,
      ...item,
    })),
    naverStoreUrl,
    privacyPolicyUrl,
  })

  console.log(
    dryRun
      ? `Dry-run complete. Documents: brand/hero/fragrancePage/giftPage/hydroponic/store/settings + ${collections.length} collections + ${allPlants.length} plants + ${storyBlocks.length} story blocks.`
      : 'Seed complete.',
  )
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
