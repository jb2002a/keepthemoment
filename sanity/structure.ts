import type { StructureResolver } from 'sanity/structure'

const SINGLETONS = [
  { type: 'brand', title: '브랜드' },
  { type: 'hero', title: '히어로' },
  { type: 'hydroponic', title: '수경 관리 안내' },
  { type: 'storeInfo', title: '매장 정보' },
  { type: 'siteSettings', title: '사이트 설정' },
] as const

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('콘텐츠')
    .items([
      ...SINGLETONS.map((item) =>
        S.listItem()
          .id(item.type)
          .title(item.title)
          .child(
            S.document()
              .id(item.type)
              .schemaType(item.type)
              .documentId(item.type),
          ),
      ),
      S.divider(),
      S.listItem()
        .id('collections')
        .title('컬렉션')
        .child(S.documentTypeList('collection').id('collection').title('컬렉션')),
      S.listItem()
        .id('plants')
        .title('식물')
        .child(S.documentTypeList('plantItem').id('plantItem').title('식물')),
      S.listItem()
        .id('story-blocks')
        .title('브랜드 스토리 이미지')
        .child(S.documentTypeList('storyBlock').id('storyBlock').title('브랜드 스토리 이미지')),
    ])
