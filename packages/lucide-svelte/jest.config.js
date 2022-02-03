module.exports = {
  verbose: true,
  roots: ['<rootDir>/src/', '<rootDir>/tests/'],
  transformIgnorePatterns: [`/node_modules`],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.svelte$': 'svelte-jester',
  },
  moduleFileExtensions: ['js', 'svelte'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
