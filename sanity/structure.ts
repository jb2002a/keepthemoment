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
    .title('콘텐츠')
    .items([
      ...SINGLETONS.map((item) =>
        S.listItem()
          .title(item.title)
          .id(item.type)
          .child(S.document().schemaType(item.type).documentId(item.type)),
      ),
      S.divider(),
      S.documentTypeListItem('collection').title('컬렉션'),
      S.documentTypeListItem('plantItem').title('식물'),
      S.documentTypeListItem('storyBlock').title('브랜드 스토리 이미지'),
    ])
