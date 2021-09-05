module.exports = {
  verbose: true,
  roots: ['<rootDir>/src/', '<rootDir>/tests/'],
  moduleFileExtensions: ['js'],
  transformIgnorePatterns: [`/node_modules`],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
