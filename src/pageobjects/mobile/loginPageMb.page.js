import BasePage from "../basePage.js";

export class LoginPageMb extends BasePage {
  constructor(browserInstance) {
    super(browserInstance);
  }

  // Element locator

  get activationCodeTab() {
    return this.browser.$(
      "//android.widget.TextView[@content-desc='Activation Code']"
    );
  }

  get activationCodeTxt() {
    return this.browser.$(
      "//android.widget.EditText[@content-desc='activation_0']"
    );
  }

  get passowordTxt() {
    return this.browser.$("~login_password");
  }

  get signInBtn() {
    return this.browser.$("~login_signIn");
  }

  get otpTxt() {
    return this.browser.$("~otp_0");
  }

  // Page Action

  async inputActivationCode(activationCode) {
    await this.activationCodeTab.click();
    await this.activationCodeTxt.setValue(activationCode);
  }

  async inputOtp(otp) {
    await this.otpTxt.setValue(otp);
  }

  async login(password) {
    await this.passowordTxt.click();
    await this.passowordTxt.setValue(password);
    await this.signInBtn.click();
  }
}
