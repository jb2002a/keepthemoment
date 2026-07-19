import { defineField, defineType } from 'sanity'

export const storyBlock = defineType({
  name: 'storyBlock',
  title: '브랜드 스토리 이미지',
  type: 'document',
  orderings: [
    {
      title: '표시 순서',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  fields: [
    defineField({
      name: 'slug',
      title: 'ID / 슬러그',
      type: 'slug',
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
      title: '이미지 대체 텍스트',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'size',
      title: '레이아웃 크기',
      type: 'string',
      options: {
        list: [
          { title: '와이드', value: 'wide' },
          { title: '세로', value: 'portrait' },
        ],
        layout: 'radio',
      },
      initialValue: 'wide',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: '표시 순서',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'alt',
      subtitle: 'size',
      media: 'image',
    },
  },
})
