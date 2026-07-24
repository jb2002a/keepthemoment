import type { CSSProperties } from 'react'

export type MediaFocus = {
  objectPositionDesktop?: number | null
  objectPositionMobile?: number | null
}

function toFocusValue(y: number | null | undefined): string | undefined {
  if (y == null || Number.isNaN(y)) return undefined
  const clamped = Math.min(100, Math.max(0, y))
  return `center ${clamped}%`
}

/** Inline CSS vars + class for responsive object-position. */
export function mediaFocusProps(
  focus?: MediaFocus | null,
  options?: { className?: string; style?: CSSProperties },
): {
  className?: string
  style?: CSSProperties
} {
  const desktop = toFocusValue(focus?.objectPositionDesktop)
  const mobile = toFocusValue(focus?.objectPositionMobile)
  const hasFocus = Boolean(desktop || mobile)

  const className = [hasFocus ? 'media-focus' : null, options?.className]
    .filter(Boolean)
    .join(' ')

  const style = {
    ...options?.style,
    ...(desktop ? { '--media-focus-desktop': desktop } : {}),
    ...(mobile ? { '--media-focus-mobile': mobile } : {}),
  } as CSSProperties

  return {
    ...(className ? { className } : {}),
    ...(Object.keys(style).length ? { style } : {}),
  }
}

export function resolveObjectPosition(
  value: number | null | undefined,
  fallback?: number | null,
): number | undefined {
  if (value != null && !Number.isNaN(value)) return value
  if (fallback != null && !Number.isNaN(fallback)) return fallback
  return undefined
}
