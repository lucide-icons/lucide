const esModules = ['lodash-es'].join('|');

module.exports = {
  verbose: true,
  roots: ['<rootDir>/src/', '<rootDir>/tests/'],
  moduleFileExtensions: ['js'],
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
