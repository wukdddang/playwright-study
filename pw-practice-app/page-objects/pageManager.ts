import { Page } from "@playwright/test";
import { NavigationPage } from "./navigationPage";
import { FormLayoutsPage } from "./formLayoutsPage";
import { DatepickerPage } from "./datepickerPage";

export class PageManager {
  private navigationPage: NavigationPage;
  private formLayoutsPage: FormLayoutsPage;
  private datepickerPage: DatepickerPage;

  constructor(private page: Page) {
    this.navigationPage = new NavigationPage(this.page);
    this.formLayoutsPage = new FormLayoutsPage(this.page);
    this.datepickerPage = new DatepickerPage(this.page);
  }

  navigateTo() {
    return this.navigationPage;
  }

  onFormLayoutsPage() {
    return this.formLayoutsPage;
  }

  onDatepickerPage() {
    return this.datepickerPage;
  }
}
