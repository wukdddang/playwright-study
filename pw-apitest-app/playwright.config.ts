import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    extraHTTPHeaders: {
      Authorization: `Token ${process.env["ACCESS_TOKEN"]}`,
    },
  },
  globalSetup: "./global-setup.ts",
  globalTeardown: "./global-teardown.ts",
  /* Configure projects for major browsers */
  projects: [
    {
      name: "setup",
      testMatch: "auth.setup.ts",
    },
    {
      name: "article-setup",
      testMatch: "new-article.setup.ts",
      dependencies: ["setup"],
      teardown: "article-cleanup",
    },
    {
      name: "article-cleanup",
      testMatch: "article-clean-up.setup.ts",
    },
    {
      name: "like-counter",
      testMatch: "likes-counter.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        storageState: ".auth/user.json",
      },
      dependencies: ["article-setup"],
    },
    {
      name: "like-counter-global",
      testMatch: "likes-counter-global.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        storageState: ".auth/user.json",
      },
      dependencies: ["article-setup"],
    },
    {
      name: "regression",
      testIgnore: ["likes-counter.spec.ts", "likes-counter-global.spec.ts"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: ".auth/user.json",
      },
      dependencies: ["setup"],
    },
  ],
});
