import type { Field } from 'payload'

export const objectPositionFields: Field[] = [
  {
    name: 'objectPositionDesktop',
    type: 'number',
    min: 0,
    max: 100,
    label: '이미지 세로 위치 (PC)',
    admin: {
      description: '0=위쪽, 50=가운데, 100=아래쪽. 비우면 기본값.',
      step: 1,
    },
  },
  {
    name: 'objectPositionMobile',
    type: 'number',
    min: 0,
    max: 100,
    label: '이미지 세로 위치 (모바일)',
    admin: {
      description: '0=위쪽, 50=가운데, 100=아래쪽. 비우면 기본값.',
      step: 1,
    },
  },
]
