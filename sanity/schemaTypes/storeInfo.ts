import { defineField, defineType } from 'sanity'

export const storeInfo = defineType({
  name: 'storeInfo',
  title: '방문/매장 정보',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '매장명',
      description: '방문 페이지와 푸터에 쓰이는 매장 이름입니다.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'address',
      title: '주소 (한글)',
      description: '방문 페이지에 크게 보이는 한글 주소입니다.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'addressDetail',
      title: '주소 (영문)',
      description: '한글 주소 아래에 보조로 보이는 주소입니다.',
      type: 'string',
    }),
    defineField({
      name: 'hours',
      title: '영업시간',
      description: '요일과 시간을 줄별로 입력합니다.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'day', title: '요일', type: 'string' }),
            defineField({ name: 'time', title: '시간', type: 'string' }),
          ],
          preview: {
            select: { title: 'day', subtitle: 'time' },
          },
        },
      ],
    }),
    defineField({
      name: 'phone',
      title: '전화번호',
      description: '방문 문의용 전화번호입니다.',
      type: 'string',
    }),
    defineField({
      name: 'mapUrl',
      title: '지도 URL',
      description: '오프라인 위치 링크입니다. 네이버 지도 주소를 넣어주세요.',
      type: 'url',
    }),
    defineField({
      name: 'placeUrl',
      title: '네이버 플레이스 URL',
      description: '네이버 플레이스 페이지 주소입니다.',
      type: 'url',
    }),
    defineField({
      name: 'instagramUrl',
      title: '인스타그램 URL',
      description: '푸터와 방문 페이지에서 연결할 인스타그램 주소입니다.',
      type: 'url',
    }),
    defineField({
      name: 'image',
      title: '매장 이미지',
      description: '방문 페이지에 보이는 매장 사진입니다.',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alt',
      title: '이미지 대체 텍스트',
      description: '사진 내용을 짧게 설명해주세요.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})
