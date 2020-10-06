const esModules = ['lodash-es'].join('|');

module.exports = {
  verbose: true,
  roots: ['<rootDir>/src/', '<rootDir>/tests/'],
  moduleFileExtensions: ['js'],
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
