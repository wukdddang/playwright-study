import { defineConfig, devices } from "@playwright/test";

import * as dotenv from "dotenv";
import * as path from "path";
import type { TestOptions } from "./test-options";
dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig<TestOptions>({
  use: {
    baseURL: "http://localhost:4200",
    globalsQaURL: "https://www.globalsqa.com/demo-site/draganddrop/",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
    },
  ],
});
