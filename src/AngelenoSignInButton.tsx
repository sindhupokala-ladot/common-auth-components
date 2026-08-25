import type { AnchorHTMLAttributes } from 'react'
import { useCommonAuthConfig } from './CommonAuthProvider'
import { buildAuthorizeUrl } from './internal/buildAuthorizeUrl'
import { AngelenoIcon } from './internal/icons'
import { SignInButtonBase } from './internal/SignInButtonBase'

export interface AngelenoSignInButtonProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'children'
> {
  /** This application's Angeleno Account client ID, from Common Auth Portal's application detail page. */
  clientId: string
  /** Must exactly match one of this application's registered redirect URIs. */
  redirectUri: string
  /** Opaque value round-tripped back to `redirectUri` unchanged - e.g. a post-login destination. */
  state?: string
  /** Defaults to "Sign in with Angeleno Account". */
  label?: string
}

/**
 * Angeleno Account is the City of Los Angeles's public identity platform - see
 * docs/backend-onboarding-guide.md and the City's own onboarding materials for what
 * "External application" integration actually requires. This button icon is a generic
 * placeholder, not the City's approved Angeleno Account mark; swap in the official
 * asset once your team has it (see ANGELENO_ACCOUNT_TAGLINE below for the accompanying
 * approved copy).
 *
 * Drop this anywhere on your own page - External applications authenticate with their
 * own Angeleno Account client through Common Auth Backend. Clicking it is a full-page
 * redirect to Angeleno Account, not a fetch call, so it needs no CommonAuthProvider
 * CORS setup beyond `apiBaseUrl`.
 */
export function AngelenoSignInButton({
  clientId,
  redirectUri,
  state,
  label,
  ...anchorProps
}: AngelenoSignInButtonProps) {
  const { apiBaseUrl } = useCommonAuthConfig()

  const href = buildAuthorizeUrl(apiBaseUrl, '/api/external/angeleno/authorize', {
    clientId,
    redirectUri,
    state,
  })

  return (
    <SignInButtonBase
      href={href}
      label={label ?? 'Sign in with Angeleno Account'}
      icon={<AngelenoIcon />}
      variant="dark"
      {...anchorProps}
    />
  )
}

/**
 * The City's approved tagline to display near the button (not baked into the button
 * itself, since where/how to place accompanying copy is a page layout decision).
 */
export const ANGELENO_ACCOUNT_TAGLINE = 'Your one account to access City of Los Angeles services.'
