import { defineField, defineType } from 'sanity'

export const plantItem = defineType({
  name: 'plantItem',
  title: '식물 카드',
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
      description: '개발자가 식물을 구분할 때 쓰는 값입니다. 보통 수정하지 않아도 됩니다.',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'name',
      title: '영문명',
      description: '식물 카드에 보이는 영문 이름입니다.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'koreanName',
      title: '한글명',
      description: '식물 카드에 보이는 한글 이름입니다.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: '카테고리',
      description: '식물 페이지에서 희귀 식물 영역에 둘지, 일상 식물 영역에 둘지 선택합니다.',
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
      title: '식물 이미지',
      description: '식물 카드에 보이는 사진입니다.',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: '한 줄 설명',
      description: '식물 이름 아래에 보이는 소개 문장입니다.',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'features',
      title: '특징',
      description: '식물 카드에 bullet로 보이는 특징입니다. 1~2개 정도가 보기 좋습니다.',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'care',
      title: '관리법',
      description: '빛, 물, 온도 안내 문구입니다.',
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
      description: '숫자가 작을수록 먼저 보입니다.',
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
