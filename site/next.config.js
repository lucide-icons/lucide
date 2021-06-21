module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.md/,
      use: ['babel-loader', '@mdx-js/loader'],
    });

    return config;
  },
};
