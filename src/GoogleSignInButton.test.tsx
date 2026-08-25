import { render, screen } from '@testing-library/react'
import { CommonAuthProvider } from './CommonAuthProvider'
import { GoogleSignInButton } from './GoogleSignInButton'

describe('GoogleSignInButton', () => {
  it('renders an anchor pointing at the internal Google authorize endpoint', () => {
    render(
      <CommonAuthProvider apiBaseUrl="https://common-auth.example.com">
        <GoogleSignInButton clientId="client-abc" redirectUri="https://ops.example.com/auth/callback" />
      </CommonAuthProvider>,
    )

    const link = screen.getByRole('link', { name: 'Sign in with Google' })
    expect(link).toHaveAttribute(
      'href',
      'https://common-auth.example.com/api/internal/google/authorize?clientId=client-abc&redirectUri=' +
        encodeURIComponent('https://ops.example.com/auth/callback'),
    )
  })

  it('round-trips an optional state param', () => {
    render(
      <CommonAuthProvider apiBaseUrl="https://common-auth.example.com">
        <GoogleSignInButton
          clientId="client-abc"
          redirectUri="https://ops.example.com/auth/callback"
          state="post-login"
        />
      </CommonAuthProvider>,
    )

    expect(screen.getByRole('link', { name: 'Sign in with Google' })).toHaveAttribute(
      'href',
      expect.stringContaining('state=post-login'),
    )
  })

  it('supports overriding the label', () => {
    render(
      <CommonAuthProvider apiBaseUrl="https://common-auth.example.com">
        <GoogleSignInButton
          clientId="client-abc"
          redirectUri="https://ops.example.com/auth/callback"
          label="Continue with Google"
        />
      </CommonAuthProvider>,
    )

    expect(screen.getByRole('link', { name: 'Continue with Google' })).toBeInTheDocument()
  })

  it('throws a clear error when rendered without a CommonAuthProvider', () => {
    expect(() =>
      render(
        <GoogleSignInButton clientId="client-abc" redirectUri="https://ops.example.com/auth/callback" />,
      ),
    ).toThrow(/CommonAuthProvider/)
  })
})
