'use client'

import type { CSSProperties } from 'react'

type ImagePlaceholderProps = {
  label: string
  alt: string
  aspectRatio?: string
  className?: string
  priority?: boolean
}

/**
 * 실제 이미지 교체 위치.
 * src를 추가하거나 <img>로 바꾸면 됩니다. aspect-ratio가 레이아웃 시프트를 방지합니다.
 */
export function ImagePlaceholder({
  label,
  alt,
  aspectRatio = '4 / 5',
  className = '',
  priority = false,
}: ImagePlaceholderProps) {
  const style = {
    '--placeholder-ratio': aspectRatio,
  } as CSSProperties

  return (
    <figure
      className={`image-placeholder ${className}`.trim()}
      style={style}
      data-replace-hint={label}
    >
      <div
        className="image-placeholder__surface"
        role="img"
        aria-label={alt}
        {...(priority ? {} : { 'data-lazy': 'true' })}
      >
        <span className="image-placeholder__label" aria-hidden="true">
          {label}
        </span>
      </div>
    </figure>
  )
}
