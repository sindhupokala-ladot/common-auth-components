import { useState, type AnchorHTMLAttributes, type ReactNode } from 'react'

export interface SignInButtonBaseProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'children'
> {
  href: string
  label: string
  icon: ReactNode
  variant: 'light' | 'dark'
}

const PALETTE = {
  light: {
    background: '#ffffff',
    hoverBackground: '#f7f8f8',
    border: '#dadce0',
    text: '#3c4043',
  },
  dark: {
    background: '#1f2a44',
    hoverBackground: '#29365a',
    border: '#1f2a44',
    text: '#ffffff',
  },
} as const

/**
 * Rendered as a plain anchor, not a <button onClick>: signing in is a top-level
 * navigation to Common Auth Backend's authorize endpoint, not a fetch/XHR call, so an
 * <a href> works without JavaScript, supports "open in new tab", and needs no CORS
 * entry on the backend (see docs/common-auth-spec.md §2).
 */
export function SignInButtonBase({
  href,
  label,
  icon,
  variant,
  style,
  ...anchorProps
}: SignInButtonBaseProps) {
  const [isHovered, setIsHovered] = useState(false)
  const colors = PALETTE[variant]

  return (
    <a
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.6rem',
        padding: '0.55rem 1rem',
        borderRadius: '6px',
        border: `1px solid ${colors.border}`,
        background: isHovered ? colors.hoverBackground : colors.background,
        color: colors.text,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        fontSize: '0.9rem',
        fontWeight: 500,
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.15s ease',
        ...style,
      }}
      {...anchorProps}
    >
      {icon}
      <span>{label}</span>
    </a>
  )
}
