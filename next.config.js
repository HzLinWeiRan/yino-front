/** @type {import('next').NextConfig} */
const { ProvidePlugin } = require('webpack')
const path = require('path')
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  webpack: (config) => {
    config.plugins.push(
      new ProvidePlugin({
        $utils: [path.resolve(__dirname, 'src/utils')],
      })
    )
    return config
  },
  i18n,
}

module.exports = nextConfig
