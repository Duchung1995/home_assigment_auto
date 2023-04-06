import BasePage from "../basePage.js";

export class CommonPage extends BasePage {
  constructor(browserInstance) {
    super(browserInstance);
  }

  // Element locator

  get avatarDdl() {
    return this.browser.$(
      "//a[@id='NOTIFICATION']/following-sibling::div/button"
    );
  }

  get devicesTab() {
    return this.browser.$("//div[@data-testid='btn-devices']");
  }

  // Page Action

  async goToDevicesPage() {
    await this.avatarDdl.click();
    await this.devicesTab.click();
  }

  async verifyAvatarIsDisplayed() {
    await expect(this.avatarDdl).toBeExisting();
  }
}
