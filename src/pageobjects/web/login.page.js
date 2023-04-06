import BasePage from "../basePage.js";


export class LoginPage extends BasePage {
  constructor(browserInstance) {
    super(browserInstance);
  }

  get companyNameTxt() {
    return this.browser.$("//input[@placeholder='Company name']");
  }

  get nextBtn() {
    return this.browser.$("//span[@data-testid='btn-verify-company']");
  }

  get userNameTxt() {
    return this.browser.$("//input[@data-testid='usernameLogin']");
  }

  get passwordText() {
    return this.browser.$("//input[@data-testid='passwordLogin']");
  }

  get loginBtn() {
    return this.browser.$("//span[contains(@class, 'Login_button')]");
  }

  get otpText() {
    return this.browser.$("(//input[@type='tel'])[1]");
  }

  async goToLoginPage(path) {
    await this.open(path);
  }

  async inputCompanyName(companyName) {
    await this.companyNameTxt.addValue(companyName);
    await this.nextBtn.click();
  }

  async login(companyName, username, password, otp) {
    await this.inputCompanyName(companyName);
    await this.userNameTxt.setValue(username);
    await this.passwordText.setValue(password);
    await this.loginBtn.click();
    await this.inputOTP(otp);
  }

  async inputOTP(otp) {
    await this.otpText.setValue(otp);
  }
}
