import { defineField, defineType } from 'sanity'

export const brand = defineType({
  name: 'brand',
  title: '브랜드',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '브랜드명',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: '태그라인',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: '짧은 소개',
      type: 'text',
      rows: 3,
    }),
  ],
})
