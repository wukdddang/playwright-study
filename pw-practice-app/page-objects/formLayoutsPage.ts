import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class FormLayoutsPage extends HelperBase {
  constructor(readonly page: Page) {
    super(page);
  }

  async submitUsingTheGridFormWithCredentialsAndSelectOption(
    email: string,
    password: string,
    optionText: string
  ) {
    const usingTheGridForm = this.page.locator("nb-card", {
      hasText: "Using the Grid",
    });

    await usingTheGridForm.getByRole("textbox", { name: "Email" }).fill(email);
    await usingTheGridForm
      .getByRole("textbox", { name: "Password" })
      .fill(password);
    await usingTheGridForm
      .getByRole("radio", { name: optionText })
      .check({ force: true });

    await usingTheGridForm.getByRole("button").click();
  }

  /**
   * This method will out the Inline form with user details
   * @param name - should be first and last name
   * @param email - should be a valid email address
   * @param rememberMe - should be a boolean
   */
  async submitInlineFormWithNameEmailAndCheckbox(
    name: string,
    email: string,
    rememberMe: boolean
  ) {
    const usingTheInlineForm = this.page.locator("nb-card", {
      hasText: "Inline Form",
    });

    await usingTheInlineForm
      .getByRole("textbox", { name: "Jane Doe" })
      .fill(email);
    await usingTheInlineForm
      .getByRole("textbox", { name: "Email" })
      .fill(email);

    if (rememberMe) {
      await usingTheInlineForm
        .getByRole("checkbox", { name: "Remember me" })
        .check({ force: true });
    }

    await usingTheInlineForm.getByRole("button").click();
  }
}
