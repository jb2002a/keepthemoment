import { defineField, defineType } from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: '홈 첫 화면 큰 이미지',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: '첫 화면 이미지',
      description: '홈 페이지를 열었을 때 가장 먼저 크게 보이는 이미지입니다.',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
  ],
})
