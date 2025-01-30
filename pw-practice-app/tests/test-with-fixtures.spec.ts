import { test } from "../test-options";
import { faker } from "@faker-js/faker";

// test.beforeEach(async ({ page }) => {
//   await page.goto("/");
// });

test("parameterized methods", async ({ pageManager }) => {
  const randomFullName = faker.person.fullName();
  const randomEmail = `${randomFullName.replace(" ", "")}${faker.number.int(
    1000
  )}@test.com`;

  // await pageManager.navigateTo().formLayoutsPage();
  await pageManager
    .onFormLayoutsPage()
    .submitUsingTheGridFormWithCredentialsAndSelectOption(
      randomEmail,
      "Welcome1",
      "Option 2"
    );

  await pageManager
    .onFormLayoutsPage()
    .submitInlineFormWithNameEmailAndCheckbox(
      randomFullName,
      randomEmail,
      false
    );
});
