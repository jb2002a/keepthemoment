import { defineField, defineType } from 'sanity'

export const collection = defineType({
  name: 'collection',
  title: '홈 카테고리 카드',
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
      description: '개발자가 구분할 때 쓰는 값입니다. 보통 수정하지 않아도 됩니다.',
      type: 'slug',
      options: { source: 'name', maxLength: 64 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'name',
      title: '카드 제목',
      description: '홈 페이지 카테고리 카드에 보이는 제목입니다.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: '한 줄 소개',
      description: '카드 제목 아래에 보이는 짧은 설명입니다.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: '카드 이미지',
      description: '홈 페이지 카테고리 카드에 들어가는 사진입니다.',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'aspectRatio',
      title: '비율',
      description: '사진 표시 비율입니다. 특별한 요청이 없으면 그대로 두세요.',
      type: 'string',
      initialValue: '3 / 4',
    }),
    defineField({
      name: 'href',
      title: '링크',
      description: '카드를 눌렀을 때 이동하는 주소입니다. 보통 수정하지 않아도 됩니다.',
      type: 'string',
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
      title: 'name',
      subtitle: 'tagline',
      media: 'image',
    },
  },
})
