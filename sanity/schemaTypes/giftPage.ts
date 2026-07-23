import { defineArrayMember, defineField, defineType } from 'sanity'

export const giftPage = defineType({
  name: 'giftPage',
  title: '선물(Gift) 페이지',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: '작은 제목',
      type: 'string',
      initialValue: 'Gift',
    }),
    defineField({
      name: 'title',
      title: '큰 제목',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lead',
      title: '소개 문구',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'options',
      title: '선물 옵션 카드 목록',
      description: '카드를 드래그해서 순서를 바꿀 수 있습니다.',
      type: 'array',
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'giftOption',
          title: '옵션 카드',
          fields: [
            defineField({
              name: 'title',
              title: '카드 제목',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'image',
              title: '이미지',
              type: 'image',
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'alt',
              title: '이미지 설명(대체 텍스트)',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'copy',
              title: '설명 문구',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: 'title', media: 'image' },
          },
        }),
      ],
    }),
    defineField({
      name: 'note',
      title: '하단 안내 문구',
      type: 'text',
      rows: 2,
    }),
  ],
})
