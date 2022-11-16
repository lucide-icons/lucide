/* eslint-disable */
module.exports = {
  async redirects() {
    return [
      {
        source: '/icon/:iconName*',
        destination: '/icons/:iconName*',
        permanent: true,
      },
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
};
