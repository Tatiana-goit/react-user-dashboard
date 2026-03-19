import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  moduleNameMapper: {
    '\\.scss$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: { jsx: 'react-jsx', verbatimModuleSyntax: false },
        // Type checking is handled by tsc during build — skip it in tests for speed
        diagnostics: false,
      },
    ],
  },
}

export default config
