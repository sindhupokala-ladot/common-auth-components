import type { AnchorHTMLAttributes } from 'react'
import { useCommonAuthConfig } from './CommonAuthProvider'
import { buildAuthorizeUrl } from './internal/buildAuthorizeUrl'
import { GoogleIcon } from './internal/icons'
import { SignInButtonBase } from './internal/SignInButtonBase'

export interface GoogleSignInButtonProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'children'
> {
  /** This application's Google client ID, from Common Auth Portal's application detail page. */
  clientId: string
  /** Must exactly match one of this application's registered redirect URIs. */
  redirectUri: string
  /** Opaque value round-tripped back to `redirectUri` unchanged - e.g. a post-login destination. */
  state?: string
  /** Defaults to "Sign in with Google". */
  label?: string
}

/**
 * Drop this anywhere on your own page - Internal applications authenticate with their
 * own Google OAuth client through Common Auth Backend. Clicking it is a full-page
 * redirect to Google, not a fetch call, so it needs no CommonAuthProvider CORS setup
 * beyond `apiBaseUrl`.
 */
export function GoogleSignInButton({
  clientId,
  redirectUri,
  state,
  label,
  ...anchorProps
}: GoogleSignInButtonProps) {
  const { apiBaseUrl } = useCommonAuthConfig()

  const href = buildAuthorizeUrl(apiBaseUrl, '/api/internal/google/authorize', {
    clientId,
    redirectUri,
    state,
  })

  return (
    <SignInButtonBase
      href={href}
      label={label ?? 'Sign in with Google'}
      icon={<GoogleIcon />}
      variant="light"
      {...anchorProps}
    />
  )
}
