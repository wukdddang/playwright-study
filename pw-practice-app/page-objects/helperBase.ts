import { Locator, Page } from "@playwright/test";

export class HelperBase {
  constructor(readonly page: Page) {
    this.page = page;
  }

  async waitForNumberOfSeconds(timeInSeconds: number) {
    await this.page.waitForTimeout(timeInSeconds * 1000);
  }
}
