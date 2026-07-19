import { defineField, defineType } from 'sanity'

export const hydroponic = defineType({
  name: 'hydroponic',
  title: '수경 관리 안내',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '제목',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: '설명',
      type: 'text',
      rows: 4,
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
  ],
})
