module.exports = {
  verbose: true,
  roots: ['<rootDir>/src/', '<rootDir>/tests/'],
  moduleFileExtensions: ['js'],
  transformIgnorePatterns: [`/node_modules`],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
