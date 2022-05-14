module.exports = {
  moduleDirectories: ['node_modules', 'lib'],
  moduleNameMapper: {
    '^lib/(.*)$': '<rootDir>/lib/$1',
  },
  preset: 'ts-jest',
  setupFiles: ['dotenv/config'],
  testEnvironment: 'node',
};
