import type { GlobalConfig } from 'payload'

export const Hero: GlobalConfig = {
  slug: 'hero',
  label: '홈 첫 화면 큰 이미지',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'slides',
      type: 'array',
      required: true,
      minRows: 1,
      label: '슬라이드 목록',
      labels: {
        singular: '슬라이드',
        plural: '슬라이드',
      },
      admin: {
        description:
          'PC+모바일 공통 슬라이드는 PC용/모바일용을 나눠 넣고, 모바일 전용 슬라이드는 "모바일에서만 보이기"를 켠 뒤 모바일용 이미지에만 넣으세요.',
      },
      fields: [
        {
          name: 'mobileOnly',
          type: 'checkbox',
          defaultValue: false,
          label: '모바일에서만 보이기',
          admin: {
            description: '켜면 PC에서는 숨기고, 아래 모바일용 이미지만 사용합니다.',
          },
        },
        {
          name: 'desktopImage',
          type: 'upload',
          relationTo: 'media',
          label: 'PC용 이미지',
          admin: {
            condition: (_, siblingData) => !siblingData?.mobileOnly,
            description: '데스크톱(넓은 화면)에서 보이는 이미지입니다.',
          },
          validate: (value: unknown, options: { siblingData?: { mobileOnly?: boolean } }) => {
            if (!options.siblingData?.mobileOnly && !value) {
              return 'Please upload a desktop image.'
            }
            return true
          },
        },
        {
          name: 'mobileImage',
          type: 'upload',
          relationTo: 'media',
          label: '모바일용 이미지',
          admin: {
            description:
              '휴대폰 화면용 이미지입니다. 모바일 전용 슬라이드면 여기에 넣고, 공통 슬라이드면 선택 사항입니다.',
          },
          validate: (value: unknown, options: { siblingData?: { mobileOnly?: boolean } }) => {
            if (options.siblingData?.mobileOnly && !value) {
              return 'Mobile-only slides require a mobile image.'
            }
            return true
          },
        },
        {
          name: 'alt',
          type: 'text',
          required: true,
          label: '이미지 설명(대체 텍스트)',
        },
        {
          name: 'objectPosition',
          type: 'text',
          label: '이미지 위치 조정 (선택)',
        },
      ],
    },
  ],
}
