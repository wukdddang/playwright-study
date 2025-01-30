import { defineConfig, devices } from "@playwright/test";

import * as dotenv from "dotenv";
import * as path from "path";
import type { TestOptions } from "./test-options";
dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig<TestOptions>({
  timeout: 40000,
  globalTimeout: 60000,

  expect: {
    timeout: 2000,
  },
  retries: 1,
  reporter: [
    ["json", { outputFile: "test-results/jsonReport.json" }],
    ["junit", { outputFile: "test-results/junitReport.xml" }],
    ["html"],
  ],
  use: {
    baseURL:
      process.env.DEV === "1"
        ? "http://localhost:4200"
        : process.env.STAGING === "1"
        ? "http://localhost:4200"
        : "http://localhost:4200",
    globalsQaURL: "https://www.globalsqa.com/demo-site/draganddrop/",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    actionTimeout: 20000,
    navigationTimeout: 25000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "dev",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "http://localhost:4200",
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: "staging",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "http://localhost:4200",
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: "chromium",
      timeout: 60000,
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1080 },
      },
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        video: { mode: "on" },
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: "pageObjectFullScreen",
      testMatch: "usePageObjects.spec.ts",
      use: {
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: "mobile",
      testMatch: "test-mobile.spec.ts",
      use: {
        ...devices["iPhone 14 Pro Max"],
        deviceScaleFactor: 1,
      },
    },
  ],
});
