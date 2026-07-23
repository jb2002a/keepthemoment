import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload } from 'payload'
import config from '../src/payload.config'
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
const dryRun = process.argv.includes('--dry-run')

function publicPathFromSrc(src: string): string {
  return path.join(rootDir, 'public', src.replace(/^\//, ''))
}

async function seed() {
  if (!process.env.DATABASE_URI && !dryRun) {
    console.error('Missing DATABASE_URI')
    process.exit(1)
  }

  if (!process.env.PAYLOAD_SECRET && !dryRun) {
    console.error('Missing PAYLOAD_SECRET')
    process.exit(1)
  }

  console.log(
    dryRun
      ? 'Dry-run: validating seed payload and local image paths...'
      : 'Seeding Payload CMS...',
  )

  const imagePaths = new Set<string>()
  for (const slide of hero.images) {
    imagePaths.add(slide.src)
    if (slide.mobileSrc) imagePaths.add(slide.mobileSrc)
  }
  for (const item of collections) imagePaths.add(item.image)
  for (const item of [...rarePlantItems, ...plantItems]) imagePaths.add(item.image)
  for (const item of storyBlocks) imagePaths.add(item.image)
  for (const item of fragranceBrands) imagePaths.add(item.image)
  for (const item of giftOptions) imagePaths.add(item.image)
  imagePaths.add(hydroponic.image)
  imagePaths.add(storeInfo.image)

  for (const src of imagePaths) {
    const absolute = publicPathFromSrc(src)
    if (!existsSync(absolute)) {
      throw new Error(`Image not found: ${absolute}`)
    }
    if (dryRun) console.log(`  [dry-run] image ready ${src}`)
  }

  if (dryRun) {
    console.log(
      `Dry-run complete. Documents: brand/hero/fragrance/gift/hydroponic/store/settings + ${collections.length} collections + ${rarePlantItems.length + plantItems.length} plants + ${storyBlocks.length} story blocks.`,
    )
    return
  }

  const payload = await getPayload({ config })
  const mediaCache = new Map<string, number>()

  const useBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN)

  async function uploadImageFromDisk(src: string, alt = ''): Promise<number> {
    const cached = mediaCache.get(src)
    if (cached !== undefined) return cached

    const absolute = publicPathFromSrc(src)
    const filename = path.basename(absolute)
    const existing = await payload.find({
      collection: 'media',
      where: {
        filename: {
          equals: filename,
        },
      },
      limit: 1,
    })

    if (existing.docs[0]) {
      const id = Number(existing.docs[0].id)
      const existingUrl = typeof existing.docs[0].url === 'string' ? existing.docs[0].url : ''
      const needsBlobMigration =
        useBlob && (!existingUrl || existingUrl.startsWith('/api/media/file/'))

      if (!needsBlobMigration) {
        mediaCache.set(src, id)
        console.log(`  reused media ${src}`)
        return id
      }

      await payload.update({
        collection: 'media',
        id,
        data: { alt },
        filePath: absolute,
        overwriteExistingFiles: true,
      })
      mediaCache.set(src, id)
      console.log(`  migrated media to blob ${src}`)
      return id
    }

    const created = await payload.create({
      collection: 'media',
      data: { alt },
      filePath: absolute,
    })

    const id = Number(created.id)
    mediaCache.set(src, id)
    console.log(`  uploaded ${src}`)
    return id
  }

  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@keepthemoment.local'
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'changeme123'
  const users = await payload.find({
    collection: 'users',
    where: { email: { equals: adminEmail } },
    limit: 1,
  })
  if (!users.docs.length) {
    await payload.create({
      collection: 'users',
      data: {
        email: adminEmail,
        password: adminPassword,
      },
    })
    console.log(`  created admin user ${adminEmail}`)
  }

  await payload.updateGlobal({
    slug: 'brand',
    data: { ...brand },
  })
  console.log('  upserted brand')

  await payload.updateGlobal({
    slug: 'hero',
    data: {
      slides: await Promise.all(
        hero.images.map(async (slide) => ({
          alt: slide.alt,
          mobileOnly: slide.mobileOnly ?? false,
          objectPosition: slide.objectPosition,
          desktopImage: await uploadImageFromDisk(slide.src, slide.alt),
          mobileImage:
            slide.mobileSrc && slide.mobileSrc !== slide.src
              ? await uploadImageFromDisk(slide.mobileSrc, slide.alt)
              : undefined,
        })),
      ),
    },
  })
  console.log('  upserted hero')

  for (const [index, item] of collections.entries()) {
    const existing = await payload.find({
      collection: 'collections',
      where: { slug: { equals: item.id } },
      limit: 1,
    })
    const data = {
      slug: item.id,
      name: item.name,
      tagline: item.tagline,
      alt: item.alt,
      aspectRatio: item.aspectRatio,
      href: item.href,
      order: index,
      image: await uploadImageFromDisk(item.image, item.alt),
    }
    if (existing.docs[0]) {
      await payload.update({
        collection: 'collections',
        id: existing.docs[0].id,
        data,
      })
    } else {
      await payload.create({ collection: 'collections', data })
    }
    console.log(`  upserted collection ${item.id}`)
  }

  const allPlants = [
    ...rarePlantItems.map((item, index) => ({
      ...item,
      category: 'rare' as const,
      order: index,
    })),
    ...plantItems.map((item, index) => ({
      ...item,
      category: 'everyday' as const,
      order: index + rarePlantItems.length,
    })),
  ]

  for (const item of allPlants) {
    const existing = await payload.find({
      collection: 'plants',
      where: { slug: { equals: item.id } },
      limit: 1,
    })
    const data = {
      slug: item.id,
      name: item.name,
      koreanName: item.koreanName,
      category: item.category,
      alt: item.alt,
      tagline: item.tagline,
      features: item.features.map((value) => ({ value })),
      care: item.care,
      order: item.order,
      image: await uploadImageFromDisk(item.image, item.alt),
    }
    if (existing.docs[0]) {
      await payload.update({
        collection: 'plants',
        id: existing.docs[0].id,
        data,
      })
    } else {
      await payload.create({ collection: 'plants', data })
    }
    console.log(`  upserted plant ${item.id}`)
  }

  for (const [index, block] of storyBlocks.entries()) {
    const existing = await payload.find({
      collection: 'story-blocks',
      where: { slug: { equals: block.id } },
      limit: 1,
    })
    const data = {
      slug: block.id,
      alt: block.alt,
      size: block.size,
      order: index,
      image: await uploadImageFromDisk(block.image, block.alt),
    }
    if (existing.docs[0]) {
      await payload.update({
        collection: 'story-blocks',
        id: existing.docs[0].id,
        data,
      })
    } else {
      await payload.create({ collection: 'story-blocks', data })
    }
    console.log(`  upserted story-block ${block.id}`)
  }

  await payload.updateGlobal({
    slug: 'fragrance-page',
    data: {
      ...fragrancePageContent,
      brands: await Promise.all(
        fragranceBrands.map(async (item) => ({
          id: item.id,
          name: item.name,
          alt: item.alt,
          href: item.href,
          logoWidth: item.logoWidth,
          darkLogo: item.darkLogo ?? false,
          image: await uploadImageFromDisk(item.image, item.alt),
        })),
      ),
    },
  })
  console.log('  upserted fragrance-page')

  await payload.updateGlobal({
    slug: 'gift-page',
    data: {
      ...giftPageContent,
      options: await Promise.all(
        giftOptions.map(async (item) => ({
          id: item.id,
          title: item.title,
          alt: item.alt,
          copy: item.copy,
          image: await uploadImageFromDisk(item.image, item.alt),
        })),
      ),
    },
  })
  console.log('  upserted gift-page')

  await payload.updateGlobal({
    slug: 'hydroponic',
    data: {
      title: hydroponic.title,
      description: hydroponic.description,
      alt: hydroponic.alt,
      image: await uploadImageFromDisk(hydroponic.image, hydroponic.alt),
    },
  })
  console.log('  upserted hydroponic')

  await payload.updateGlobal({
    slug: 'store-info',
    data: {
      name: storeInfo.name,
      address: storeInfo.address,
      addressDetail: storeInfo.addressDetail,
      hours: storeInfo.hours,
      phone: storeInfo.phone,
      mapUrl: storeInfo.mapUrl,
      placeUrl: storeInfo.placeUrl,
      instagramUrl: storeInfo.instagramUrl,
      alt: storeInfo.alt,
      image: await uploadImageFromDisk(storeInfo.image, storeInfo.alt),
    },
  })
  console.log('  upserted store-info')

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      navItems,
      footerLinks,
      naverStoreUrl,
      privacyPolicyUrl,
    },
  })
  console.log('  upserted site-settings')

  console.log('Seed complete.')
  process.exit(0)
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
