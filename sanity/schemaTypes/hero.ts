import { defineArrayMember, defineField, defineType } from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: '홈 첫 화면 큰 이미지',
  type: 'document',
  fields: [
    defineField({
      name: 'slides',
      title: '슬라이드 목록',
      description:
        '홈 페이지 맨 위에 순서대로 보여줄 이미지들입니다. 카드를 드래그해서 순서를 바꿀 수 있습니다.',
      type: 'array',
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'heroSlide',
          title: '슬라이드',
          fields: [
            defineField({
              name: 'desktopImage',
              title: 'PC용 이미지',
              description: '데스크톱(넓은 화면)에서 보여줄 이미지입니다.',
              type: 'image',
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'mobileImage',
              title: '모바일용 이미지 (선택)',
              description:
                '휴대폰 화면에서만 다르게 보여주고 싶을 때 올려주세요. 비워두면 PC용 이미지가 모바일에서도 그대로 사용됩니다.',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'alt',
              title: '이미지 설명(대체 텍스트)',
              description: '화면에 보이지 않는 설명 문구입니다. 검색/접근성을 위해 입력해주세요.',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'mobileOnly',
              title: '모바일에서만 보이기',
              description: '켜두면 이 슬라이드는 휴대폰 화면에서만 보이고, PC에서는 보이지 않습니다.',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'objectPosition',
              title: '이미지 위치 조정 (선택, 개발자용)',
              description:
                '이미지가 잘리는 위치를 세밀하게 조정할 때만 사용합니다. 예: "center 40%". 잘 모르면 비워두세요.',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'alt',
              media: 'desktopImage',
              mobileOnly: 'mobileOnly',
            },
            prepare({ title, media, mobileOnly }) {
              return {
                title: title || '(설명 없음)',
                subtitle: mobileOnly ? '모바일 전용' : 'PC + 모바일',
                media,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'image',
      title: '이전 버전 이미지',
      description:
        '이전 CMS 구조에서 사용하던 필드입니다. 새 수정은 위 슬라이드 목록에서 해주세요.',
      type: 'image',
      options: { hotspot: true },
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: 'alt',
      title: '이전 버전 이미지 설명',
      description:
        '이전 CMS 구조에서 사용하던 필드입니다. 새 수정은 위 슬라이드 목록에서 해주세요.',
      type: 'string',
      hidden: true,
      readOnly: true,
    }),
  ],
})
