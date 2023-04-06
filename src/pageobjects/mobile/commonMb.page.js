import BasePage from "../basePage.js";

export class CommonPageMb extends BasePage {
  constructor(browserInstance) {
    super(browserInstance);
  }

  // Element locator

  get skipWelcomePageBtn() {
    return this.browser.$("~Skip");
  }

  get denyPermissionBtn() {
    return this.browser.$(
      "//android.widget.LinearLayout[2]/android.widget.Button[3]"
    );
  }

  get closePermissionRequirePopupBtn() {
    return this.browser.$(
      "//android.view.ViewGroup[@content-desc='cancel-send-voice']/android.widget.TextView"
    );
  }

  get contactTab() {
    return this.browser.$("~bottomTab_contact");
  }

  get searchTab() {
    return this.browser.$("~bottomTab_search");
  }

  // Page Action

  async bypassWelcomePage() {
    await this.skipWelcomePageBtn.click();
  }

  async denyCameraPermission() {
    await this.denyPermissionBtn.click();
  }

  async closePermissionRequirePopup() {
    await this.closePermissionRequirePopupBtn.waitForDisplayed();
    await this.closePermissionRequirePopupBtn.touchAction("tap");
  }

  async goToContactPage() {
    await this.searchTab.waitForDisplayed();
    await this.contactTab.waitForDisplayed();
    await this.contactTab.click();
  }
}
