import BasePage from "../basePage.js";

export class ContactProfileMb extends BasePage {
  constructor(browserInstance) {
    super(browserInstance);
  }

  // Element locator

  get chatBtn() {
    return this.browser.$(
      "//android.view.ViewGroup[@resource-id='profile_chat']"
    );
  }

  // Page Action

  async clickOnChatBtn() {
    await this.chatBtn.waitForExist();
    await this.chatBtn.click();
  }
}
