import { defineField, defineType } from 'sanity'

export const hydroponic = defineType({
  name: 'hydroponic',
  title: '관리법 페이지 문구',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '제목',
      description: '관리법 페이지의 큰 제목입니다.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: '설명',
      description: '제목 아래에 보이는 관리 안내 문장입니다.',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: '이미지',
      description: '관리법 페이지에 보이는 대표 사진입니다.',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
  ],
})
