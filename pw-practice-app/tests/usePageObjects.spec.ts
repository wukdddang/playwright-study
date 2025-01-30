import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";
import { faker } from "@faker-js/faker";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("navigate to form page @smoke", async ({ page }) => {
  const pageManager = new PageManager(page);
  await pageManager.navigateTo().formLayoutsPage();
  await pageManager.navigateTo().datepickerPage();
  await pageManager.navigateTo().smartTablePage();
  await pageManager.navigateTo().tooltipPage();
  await pageManager.navigateTo().toastrPage();
});

test("parameterized methods @smoke", async ({ page }) => {
  const pageManager = new PageManager(page);
  const randomFullName = faker.person.fullName();
  const randomEmail = `${randomFullName.replace(" ", "")}${faker.number.int(
    1000
  )}@test.com`;

  await pageManager.navigateTo().formLayoutsPage();

  await pageManager
    .onFormLayoutsPage()
    .submitUsingTheGridFormWithCredentialsAndSelectOption(
      randomEmail,
      "Welcome1",
      "Option 2"
    );
  // await page.screenshot({ path: "screenshots/formLayoutsPage.png" });

  await pageManager
    .onFormLayoutsPage()
    .submitInlineFormWithNameEmailAndCheckbox(
      randomFullName,
      randomEmail,
      false
    );
  // await page
  //   .locator("nb-card", {
  //     hasText: "Inline Form",
  //   })
  //   .screenshot({ path: "screenshots/inlineForm.png" });

  // await pageManager.navigateTo().datepickerPage();

  // await pageManager.onDatepickerPage().selectCommonDatePickerDateFromToday(5);
  // await pageManager
  //   .onDatepickerPage()
  //   .selectDatepickerWithRangeFromToday(5, 10);
});
