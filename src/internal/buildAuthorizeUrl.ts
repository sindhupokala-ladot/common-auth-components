export function buildAuthorizeUrl(
  apiBaseUrl: string,
  path: string,
  params: Record<string, string | undefined>,
): string {
  const url = new URL(path, apiBaseUrl)

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') {
      url.searchParams.set(key, value)
    }
  }

  return url.toString()
}
