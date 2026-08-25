import { buildAuthorizeUrl } from './buildAuthorizeUrl'

describe('buildAuthorizeUrl', () => {
  it('joins the base URL and path and appends query params', () => {
    const url = buildAuthorizeUrl('https://common-auth.example.com', '/api/internal/google/authorize', {
      clientId: 'abc-123',
      redirectUri: 'https://ops.example.com/auth/callback',
    })

    expect(url).toBe(
      'https://common-auth.example.com/api/internal/google/authorize?clientId=abc-123&redirectUri=' +
        encodeURIComponent('https://ops.example.com/auth/callback'),
    )
  })

  it('omits undefined and empty-string params', () => {
    const url = buildAuthorizeUrl('https://common-auth.example.com', '/api/external/angeleno/authorize', {
      clientId: 'abc-123',
      redirectUri: 'https://resident.example.com/callback',
      state: undefined,
    })

    expect(url).not.toContain('state=')
  })

  it('includes a defined state param', () => {
    const url = buildAuthorizeUrl('https://common-auth.example.com', '/api/internal/google/authorize', {
      clientId: 'abc-123',
      redirectUri: 'https://ops.example.com/auth/callback',
      state: 'post-login-destination',
    })

    expect(url).toContain('state=post-login-destination')
  })
})
