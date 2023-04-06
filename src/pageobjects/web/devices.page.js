import BasePage from "../basePage.js";

export class DevicesPage extends BasePage {
  constructor(browserInstance) {
    super(browserInstance);
  }

  get linkDeviceBtn() {
    return this.browser.$("//button[contains(@class,'DeviceTab_link-button')]");
  }

  get activationCodeLbl() {
    return this.browser.$(
      "//div[contains(@class,'LinkDeviceModal_code-name')]"
    );
  }

  async getActivationCode() {
    await this.linkDeviceBtn.click();
    await this.verifyActivationCodeIsDisplayed();
    return await this.activationCodeLbl.getText();
  }

  async verifyActivationCodeIsDisplayed() {
    await expect(this.activationCodeLbl).toBeDisplayed();
  }

  async verifyDevicesPageIsDisplayed() {
    await expect(this.linkDeviceBtn).toBeDisplayed();
  }
}
