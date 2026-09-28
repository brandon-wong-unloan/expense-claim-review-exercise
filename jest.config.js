/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  passWithNoTests: true,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};
