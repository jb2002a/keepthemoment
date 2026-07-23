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
    defineField({
      name: 'alt',
      title: '이미지 대체 텍스트',
      description: '이미지가 보이지 않을 때 대신 읽히는 설명입니다. 사진 내용을 짧게 적어주세요.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})
