import { defineField, defineType } from 'sanity'

export const storeInfo = defineType({
  name: 'storeInfo',
  title: '매장 정보',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '매장명',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'address',
      title: '주소 (한글)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'addressDetail',
      title: '주소 (영문)',
      type: 'string',
    }),
    defineField({
      name: 'hours',
      title: '영업시간',
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
      type: 'string',
    }),
    defineField({
      name: 'mapUrl',
      title: '지도 URL',
      type: 'url',
    }),
    defineField({
      name: 'placeUrl',
      title: '네이버 플레이스 URL',
      type: 'url',
    }),
    defineField({
      name: 'instagramUrl',
      title: '인스타그램 URL',
      type: 'url',
    }),
    defineField({
      name: 'image',
      title: '매장 이미지',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alt',
      title: '이미지 대체 텍스트',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})
