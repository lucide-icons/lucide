module.exports = {
  verbose: true,
  // preset: 'solid-jest/preset/browser',
  roots: ['<rootDir>/src/', '<rootDir>/tests/'],
  moduleFileExtensions: ['js'],
  transformIgnorePatterns: [`/node_modules`],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
