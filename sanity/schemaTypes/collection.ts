import { defineField, defineType } from 'sanity'

export const collection = defineType({
  name: 'collection',
  title: '컬렉션',
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
      options: { source: 'name', maxLength: 64 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'name',
      title: '이름',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: '한 줄 소개',
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
      title: '이미지 대체 텍스트',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'aspectRatio',
      title: '비율',
      type: 'string',
      initialValue: '3 / 4',
    }),
    defineField({
      name: 'href',
      title: '링크',
      type: 'string',
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
      title: 'name',
      subtitle: 'tagline',
      media: 'image',
    },
  },
})
