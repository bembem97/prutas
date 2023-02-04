// @ts-check

const withTwin = require("./withTwin.js")

/**
 * @type {import('next').NextConfig}
 */
module.exports = withTwin({
  async rewrites() {
    return [
      {
        source: "/home",
        destination: "/",
      },
    ]
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "**.pexels.com",
      },
    ],
  },
})
