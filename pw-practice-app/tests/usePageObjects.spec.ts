import { test, expect } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage";
import { FormLayoutsPage } from "../page-objects/formLayoutsPage";
import { DatepickerPage } from "../page-objects/datepickerPage";
import { PageManager } from "../page-objects/pageManager";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200");
});

test("navigate to form page", async ({ page }) => {
  const pageManager = new PageManager(page);
  await pageManager.navigateTo().formLayoutsPage();
  await pageManager.navigateTo().datepickerPage();
  await pageManager.navigateTo().smartTablePage();
  await pageManager.navigateTo().tooltipPage();
  await pageManager.navigateTo().toastrPage();
});

test("parameterized methods", async ({ page }) => {
  const pageManager = new PageManager(page);

  await pageManager.navigateTo().formLayoutsPage();

  await pageManager
    .onFormLayoutsPage()
    .submitUsingTheGridFormWithCredentialsAndSelectOption(
      "test@test.com",
      "Welcome1",
      "Option 2"
    );

  await pageManager
    .onFormLayoutsPage()
    .submitInlineFormWithNameEmailAndCheckbox(
      "John Smith",
      "john@test.com",
      false
    );

  await pageManager.navigateTo().datepickerPage();

  await pageManager.onDatepickerPage().selectCommonDatePickerDateFromToday(5);
  await pageManager
    .onDatepickerPage()
    .selectDatepickerWithRangeFromToday(5, 10);
});
