import { renderHook } from '@testing-library/react'
import { CommonAuthProvider, useCommonAuthConfig } from './CommonAuthProvider'

describe('CommonAuthProvider / useCommonAuthConfig', () => {
  it('exposes the configured apiBaseUrl to descendants', () => {
    const { result } = renderHook(() => useCommonAuthConfig(), {
      wrapper: ({ children }) => (
        <CommonAuthProvider apiBaseUrl="https://common-auth.example.com">{children}</CommonAuthProvider>
      ),
    })

    expect(result.current.apiBaseUrl).toBe('https://common-auth.example.com')
  })

  it('throws when used outside a CommonAuthProvider', () => {
    expect(() => renderHook(() => useCommonAuthConfig())).toThrow(/CommonAuthProvider/)
  })
})
