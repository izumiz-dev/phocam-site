import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    // The default Next.js Image Optimization API is not available with `output: 'export'`.
    // This setting is required for `next/image` to work in a static-only environment.
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
