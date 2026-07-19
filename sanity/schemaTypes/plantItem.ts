import { defineField, defineType } from 'sanity'

export const plantItem = defineType({
  name: 'plantItem',
  title: '식물',
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
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'name',
      title: '영문명',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'koreanName',
      title: '한글명',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: '카테고리',
      type: 'string',
      options: {
        list: [
          { title: '희귀 관엽 (Rare)', value: 'rare' },
          { title: '일상 식물 (Everyday)', value: 'everyday' },
        ],
        layout: 'radio',
      },
      initialValue: 'everyday',
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
      name: 'tagline',
      title: '설명',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'features',
      title: '특징',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'care',
      title: '관리법',
      type: 'object',
      fields: [
        defineField({ name: 'light', title: '빛', type: 'string' }),
        defineField({ name: 'water', title: '물', type: 'string' }),
        defineField({ name: 'temperature', title: '온도', type: 'string' }),
      ],
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
      title: 'koreanName',
      subtitle: 'name',
      media: 'image',
      category: 'category',
    },
    prepare({ title, subtitle, media, category }) {
      return {
        title,
        subtitle: `${subtitle ?? ''} · ${category === 'rare' ? '희귀' : '일상'}`,
        media,
      }
    },
  },
})
