import assert from 'node:assert/strict'
import { getFallbackSiteContent } from '../src/data/siteContent'
import { loadSiteContent, mapSanityPayload } from '../src/data/cmsData'
import { isSanityConfigured } from '../src/lib/sanity'

async function main() {
  const fallback = getFallbackSiteContent()
  assert.equal(fallback.source, 'fallback')
  assert.ok(fallback.hero.image.src)
  assert.ok(fallback.plantItems.length > 0)
  assert.ok(fallback.rarePlantItems.length > 0)
  assert.ok(fallback.collections.length > 0)
  assert.ok(fallback.storeInfo.address)

  const mapped = mapSanityPayload({
    brand: { name: 'CMS BRAND', tagline: 'CMS tagline', shortDescription: 'CMS desc' },
    hero: {
      alt: 'CMS hero alt',
      imageUrl: 'https://cdn.example.com/hero.jpg',
    },
    collections: [
      {
        id: 'plants',
        name: 'Plants CMS',
        tagline: 'Updated',
        alt: 'plants',
        aspectRatio: '3 / 4',
        href: '/plants',
        imageUrl: 'https://cdn.example.com/plants.jpg',
      },
    ],
    plants: [
      {
        id: 'monstera-albo',
        name: 'Monstera Albo CMS',
        koreanName: '몬스테라 알보',
        category: 'rare',
        alt: 'albo',
        tagline: 'cms tagline',
        features: ['feature'],
        care: { light: '반양지', water: '흠뻑', temperature: '20℃' },
        imageUrl: 'https://cdn.example.com/albo.jpg',
      },
      {
        id: 'monstera',
        name: 'Monstera CMS',
        koreanName: '몬스테라',
        category: 'everyday',
        alt: 'monstera',
        tagline: 'everyday',
        features: ['feature'],
        care: { light: '반양지', water: '흠뻑', temperature: '20℃' },
        imageUrl: 'https://cdn.example.com/monstera.jpg',
      },
    ],
    storeInfo: {
      name: 'CMS STORE',
      address: '테스트 주소',
      addressDetail: 'Test address',
      hours: [{ day: 'Mon', time: '10-18' }],
      phone: '000',
      mapUrl: 'https://map.example.com',
      placeUrl: 'https://place.example.com',
      instagramUrl: 'https://instagram.com/example',
      alt: 'store',
      imageUrl: 'https://cdn.example.com/store.jpg',
    },
    siteSettings: {
      navItems: [{ id: 'plants', label: 'PLANTS', href: '/plants' }],
      footerLinks: [{ id: 'instagram', label: 'Instagram', href: 'https://instagram.com' }],
      naverStoreUrl: 'https://smartstore.naver.com/cms',
      privacyPolicyUrl: '#privacy',
    },
  })

  assert.equal(mapped.source, 'sanity')
  assert.equal(mapped.brand.name, 'CMS BRAND')
  assert.equal(mapped.hero.image.src, 'https://cdn.example.com/hero.jpg')
  assert.equal(mapped.collections[0]?.name, 'Plants CMS')
  assert.equal(mapped.rarePlantItems[0]?.name, 'Monstera Albo CMS')
  assert.equal(mapped.plantItems[0]?.name, 'Monstera CMS')
  assert.equal(mapped.storeInfo.name, 'CMS STORE')

  const loaded = await loadSiteContent()
  assert.ok(loaded.hero.image.src)
  assert.ok(loaded.brand.name)

  if (!isSanityConfigured) {
    assert.equal(loaded.source, 'fallback')
    console.log('verify:cms OK — fallback path + Sanity payload mapping work.')
    return
  }

  assert.equal(loaded.source, 'sanity')
  console.log('verify:cms OK — Sanity configured and content loaded from CMS.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
