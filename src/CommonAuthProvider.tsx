import { createContext, useContext, useMemo, type ReactNode } from 'react'

export interface CommonAuthConfig {
  /** Common Auth Backend's base URL, e.g. "https://common-auth.example.com". */
  apiBaseUrl: string
}

const CommonAuthContext = createContext<CommonAuthConfig | null>(null)

export interface CommonAuthProviderProps extends CommonAuthConfig {
  children: ReactNode
}

/**
 * Wrap your application (or just the part of it that renders sign-in buttons) in this
 * once, so every `GoogleSignInButton` / `AngelenoSignInButton` below it knows which
 * Common Auth Backend to redirect to without repeating `apiBaseUrl` on every button.
 */
export function CommonAuthProvider({ apiBaseUrl, children }: CommonAuthProviderProps) {
  const value = useMemo<CommonAuthConfig>(() => ({ apiBaseUrl }), [apiBaseUrl])
  return <CommonAuthContext.Provider value={value}>{children}</CommonAuthContext.Provider>
}

export function useCommonAuthConfig(): CommonAuthConfig {
  const context = useContext(CommonAuthContext)
  if (!context) {
    throw new Error('Common Auth components must be rendered inside a <CommonAuthProvider apiBaseUrl="...">.')
  }
  return context
}
