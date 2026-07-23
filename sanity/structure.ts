import type { StructureResolver } from 'sanity/structure'

type SingletonType = 'brand' | 'hero' | 'hydroponic' | 'storeInfo' | 'siteSettings'

type SingletonItem = {
  type: SingletonType
  title: string
}

const singletonItem = (S: Parameters<StructureResolver>[0], item: SingletonItem) =>
  S.listItem()
    .id(item.type)
    .title(item.title)
    .child(S.document().id(item.type).schemaType(item.type).documentId(item.type))

const collectionItem = (
  S: Parameters<StructureResolver>[0],
  id: 'plants' | 'fragrance' | 'gift',
  title: string,
) =>
  S.listItem()
    .id(`collection-${id}`)
    .title(title)
    .child(
      S.document()
        .id(`collection-${id}`)
        .schemaType('collection')
        .documentId(`collection.${id}`),
    )

const plantList = (
  S: Parameters<StructureResolver>[0],
  id: string,
  title: string,
  filter: string,
) =>
  S.listItem()
    .id(id)
    .title(title)
    .child(
      S.documentTypeList('plantItem')
        .id(id)
        .title(title)
        .filter(filter)
        .defaultOrdering([{ field: 'order', direction: 'asc' }]),
    )

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('페이지별 콘텐츠')
    .items([
      S.listItem()
        .id('page-home')
        .title('홈 페이지')
        .child(
          S.list()
            .id('page-home-list')
            .title('홈 페이지에서 수정할 내용')
            .items([
              singletonItem(S, { type: 'hero', title: '첫 화면 큰 이미지' }),
              collectionItem(S, 'plants', '카테고리 카드: 식물'),
              collectionItem(S, 'fragrance', '카테고리 카드: 향기'),
              collectionItem(S, 'gift', '카테고리 카드: 선물'),
              singletonItem(S, { type: 'storeInfo', title: '하단 매장 안내' }),
            ]),
        ),
      S.listItem()
        .id('page-about')
        .title('브랜드 스토리 페이지')
        .child(
          S.list()
            .id('page-about-list')
            .title('브랜드 스토리 페이지에서 수정할 내용')
            .items([
              singletonItem(S, { type: 'brand', title: '브랜드 기본 문구' }),
              S.listItem()
                .id('story-blocks')
                .title('스토리 이미지')
                .child(
                  S.documentTypeList('storyBlock')
                    .id('storyBlock')
                    .title('스토리 이미지')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }]),
                ),
            ]),
        ),
      S.listItem()
        .id('page-plants')
        .title('식물 페이지')
        .child(
          S.list()
            .id('page-plants-list')
            .title('식물 페이지에서 수정할 내용')
            .items([
              collectionItem(S, 'plants', '홈에 보이는 식물 카드'),
              plantList(
                S,
                'rare-plants',
                '희귀 식물 목록',
                '_type == "plantItem" && category == "rare"',
              ),
              plantList(
                S,
                'everyday-plants',
                '일상 식물 목록',
                '_type == "plantItem" && category != "rare"',
              ),
              plantList(S, 'all-plants', '전체 식물 목록', '_type == "plantItem"'),
            ]),
        ),
      S.listItem()
        .id('page-care')
        .title('관리법 페이지')
        .child(
          S.list()
            .id('page-care-list')
            .title('관리법 페이지에서 수정할 내용')
            .items([
              singletonItem(S, {
                type: 'hydroponic',
                title: '수경식물 관리 안내',
              }),
            ]),
        ),
      S.listItem()
        .id('page-fragrance')
        .title('향기 페이지')
        .child(
          S.list()
            .id('page-fragrance-list')
            .title('향기 페이지에서 수정할 내용')
            .items([collectionItem(S, 'fragrance', '홈에 보이는 향기 카드')]),
        ),
      S.listItem()
        .id('page-gift')
        .title('선물 페이지')
        .child(
          S.list()
            .id('page-gift-list')
            .title('선물 페이지에서 수정할 내용')
            .items([collectionItem(S, 'gift', '홈에 보이는 선물 카드')]),
        ),
      S.listItem()
        .id('page-visit')
        .title('방문 페이지')
        .child(
          S.list()
            .id('page-visit-list')
            .title('방문 페이지에서 수정할 내용')
            .items([singletonItem(S, { type: 'storeInfo', title: '매장 정보' })]),
        ),
      S.divider(),
      S.listItem()
        .id('common-settings')
        .title('공통 설정')
        .child(
          S.list()
            .id('common-settings-list')
            .title('모든 페이지에 함께 쓰는 내용')
            .items([
              singletonItem(S, { type: 'brand', title: '브랜드명/소개 문구' }),
              singletonItem(S, { type: 'siteSettings', title: '메뉴/푸터/외부 링크' }),
            ]),
        ),
    ])
