import type { Config } from "jest";

const config: Config = {
  collectCoverageFrom: [
    "src/app/api/**/route.ts",
    "src/app/api/**/route.tsx",
    "src/lib/**/*.ts",
    "!src/**/*.d.ts",
  ],
  coverageThreshold: {
    global: { branches: 35, functions: 30, lines: 45, statements: 45 },
  },
  projects: [
    {
      displayName: "api",
      testEnvironment: "node",
      testMatch: ["<rootDir>/src/__tests__/api/**/*.test.ts"],
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
      },
      transform: {
        "^.+\\.(ts|tsx)$": [
          "ts-jest",
          {
            tsconfig: {
              jsx: "react-jsx",
              esModuleInterop: true,
              module: "commonjs",
              moduleResolution: "node",
            },
          },
        ],
      },
      transformIgnorePatterns: ["/node_modules/"],
    },
    {
      displayName: "lib",
      testEnvironment: "jest-environment-jsdom",
      setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
      testMatch: [
        "<rootDir>/src/__tests__/lib/**/*.test.ts",
        "<rootDir>/src/__tests__/components/**/*.test.tsx",
      ],
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
      },
      transform: {
        "^.+\\.(ts|tsx)$": [
          "ts-jest",
          {
            tsconfig: {
              jsx: "react-jsx",
              esModuleInterop: true,
              module: "commonjs",
              moduleResolution: "node",
            },
          },
        ],
      },
      transformIgnorePatterns: ["/node_modules/"],
    },
  ],
};

export default config;
