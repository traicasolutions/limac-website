const rawBasePath =
  process.env.NEXT_PUBLIC_BASE_PATH ||
  (() => {
    const siteURL = process.env.NEXT_PUBLIC_SITE_URL
    if (!siteURL) return ''
    try {
      const pathname = new URL(siteURL).pathname.replace(/\/$/, '')
      return pathname === '/' ? '' : pathname
    } catch {
      return ''
    }
  })()

export const PUBLIC_BASE_PATH = rawBasePath
  ? rawBasePath.startsWith('/')
    ? rawBasePath
    : `/${rawBasePath}`
  : ''

export const withBasePath = (assetPath: string) => {
  if (!assetPath) return assetPath
  const normalized = assetPath.startsWith('/') ? assetPath : `/${assetPath}`
  return PUBLIC_BASE_PATH ? `${PUBLIC_BASE_PATH}${normalized}` : normalized
}
