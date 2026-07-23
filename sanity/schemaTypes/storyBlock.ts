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
      title: '관리용 ID',
      description: '이미지를 구분하기 위한 값입니다. 보통 수정하지 않아도 됩니다.',
      type: 'slug',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: '이미지',
      description: '브랜드 스토리 페이지 갤러리에 보이는 사진입니다.',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alt',
      title: '이미지 대체 텍스트',
      description: '사진 내용을 짧게 설명해주세요.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'size',
      title: '레이아웃 크기',
      description: '사진을 크게 보여줄지, 세로 카드처럼 보여줄지 선택합니다.',
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
      description: '숫자가 작을수록 먼저 보입니다.',
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
