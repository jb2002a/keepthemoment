import { defineField, defineType } from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: '히어로',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: '히어로 이미지',
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
