/** @type {import('next').NextConfig} */
const { ProvidePlugin } = require('webpack')
const path = require('path')

const nextConfig = {
  webpack: (config) => {
    config.plugins.push(
      new ProvidePlugin({
        $utils: [path.resolve(__dirname, 'utils')],
      })
    )
    return config
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh', 'es', 'ko'],
    localeDetection: false
  },
  sassOptions: {
    includePaths: [path.resolve(__dirname, 'src/styles'), path.resolve(__dirname, 'public')],
  },
  env: {
    BASE_URL: process.env.BASE_URL
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: '/api/:path*',
          destination: `https://qc.test.pandabuy.com/:path*`,
        }
      ]
    }
  }
}

module.exports = nextConfig   
