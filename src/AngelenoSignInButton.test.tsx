import { render, screen } from '@testing-library/react'
import { CommonAuthProvider } from './CommonAuthProvider'
import { AngelenoSignInButton } from './AngelenoSignInButton'

describe('AngelenoSignInButton', () => {
  it('renders an anchor pointing at the external Angeleno authorize endpoint', () => {
    render(
      <CommonAuthProvider apiBaseUrl="https://common-auth.example.com">
        <AngelenoSignInButton
          clientId="client-def"
          redirectUri="https://resident-portal.example.com/auth/callback"
        />
      </CommonAuthProvider>,
    )

    const link = screen.getByRole('link', { name: 'Sign in with Angeleno Account' })
    expect(link).toHaveAttribute(
      'href',
      'https://common-auth.example.com/api/external/angeleno/authorize?clientId=client-def&redirectUri=' +
        encodeURIComponent('https://resident-portal.example.com/auth/callback'),
    )
  })

  it('supports overriding the label', () => {
    render(
      <CommonAuthProvider apiBaseUrl="https://common-auth.example.com">
        <AngelenoSignInButton
          clientId="client-def"
          redirectUri="https://resident-portal.example.com/auth/callback"
          label="Continue with Angeleno"
        />
      </CommonAuthProvider>,
    )

    expect(screen.getByRole('link', { name: 'Continue with Angeleno' })).toBeInTheDocument()
  })
})
