const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir: '.',
  testMatch: [
    'tests/browser/**/*.spec.cjs',
    'src/courses/*/tests/browser/**/*.spec.cjs',
    'src/components/*/tests/browser/**/*.spec.cjs',
  ],
  testIgnore: ['**/node_modules/**'],
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
  use: { baseURL: 'http://127.0.0.1:5173', browserName: 'chromium' },
  webServer: {
    command: 'npm run preview',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: !process.env.CI,
  },
});
