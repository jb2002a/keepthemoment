import { defineField, defineType } from 'sanity'

export const brand = defineType({
  name: 'brand',
  title: '브랜드 기본 문구',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '브랜드명',
      description: '사이트 상단, 푸터, 검색 결과 등에 쓰이는 공식 이름입니다.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: '태그라인',
      description: '브랜드를 짧게 보여주는 영문 또는 한 줄 문구입니다.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: '짧은 소개',
      description: '브랜드를 간단히 설명하는 문장입니다.',
      type: 'text',
      rows: 3,
    }),
  ],
})
