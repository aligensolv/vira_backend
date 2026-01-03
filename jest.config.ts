import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest/presets/default-esm', // for ESM support
  testEnvironment: 'node',
  setupFiles: ["<rootDir>/tests/env.ts"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  roots: ['<rootDir>/src', '<rootDir>/tests'], // include both src and tests
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/?(*.)+(spec|test).ts',
  ],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
  ],
  coverageDirectory: 'coverage',
  verbose: true,transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      useESM: true,
      tsconfig: 'tsconfig.json',
    }],
  },
};

export default config;
