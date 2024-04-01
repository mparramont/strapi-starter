/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  testEnvironment: "node",
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: -20,
    },
  },
  moduleNameMapper: {
    "^axios$": require.resolve("axios"),
  },
  globalSetup: "<rootDir>/tests/setup/global-setup.ts",
  globalTeardown: "<rootDir>/tests/setup/global-teardown.ts",
  setupFilesAfterEnv: ["<rootDir>/tests/setup/test-setup.ts"],
};
