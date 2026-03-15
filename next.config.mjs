import { withPayload } from '@payloadcms/next/withPayload'

const isStaticExport = process.env.STATIC_EXPORT === 'true'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  ...(isStaticExport
    ? {
        output: 'export',
        basePath: '/limac-website',
        trailingSlash: true,
      }
    : {}),
}

// Skip withPayload during static export — Payload's REST API routes are
// incompatible with output:'export' and are not needed on GitHub Pages.
export default isStaticExport ? nextConfig : withPayload(nextConfig)
