require('jest-preset-angular/global-setup');

module.exports = {
  "globalSetup": "jest-preset-angular/global-setup",
  "preset": "jest-preset-angular",
  "setupFilesAfterEnv": [
    "<rootDir>/jest.setup.js"
  ],
  "testPathIgnorePatterns": [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/"
  ],
  "globals": {
    "ts-jest": {
      "tsconfig": "<rootDir>/tsconfig.spec.json",
      "stringifyContentPathRegex": "\\.html$",
    }
  },
  moduleNameMapper: {
    "^lodash-es$": "lodash",
    "^uuid$": "uuid"
  },
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.svg$': '<rootDir>/testing/svg-transform.js'
  }
}
