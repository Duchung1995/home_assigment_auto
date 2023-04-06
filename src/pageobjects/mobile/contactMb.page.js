import BasePage from "../basePage.js";

export class ContactPageMb extends BasePage {
  constructor(browserInstance) {
    super(browserInstance);
  }

  // Element locator

  get searchTxt() {
    return this.browser.$(
      "//android.widget.EditText[@content-desc='contact_search']"
    );
  }

  get clearSearchBoxBtn() {
    return this.browser.$(
      "//android.view.ViewGroup[@content-desc='clearTextButton']"
    );
  }

  get searchSuggestionByUserNameMatchLbl() {
    return this.browser.$("//android.view.ViewGroup[@content-desc='name']");
  }

  get teamTab() {
    return this.browser.$("//android.widget.TextView[@content-desc='Team']");
  }

  contactInResultListLbl = "//android.widget.TextView[@content-desc='{0}']";

  // Page Action

  async selectTeamTab() {
    await this.teamTab.click();
  }

  async searchTeamContactByName(conctactName) {
    for (let i = 0; i < 10; i++) {
      await this.searchTxt.click();
      await this.searchTxt.setValue(conctactName);
      if (await this.searchSuggestionByUserNameMatchLbl.isDisplayed()) {
        await this.searchSuggestionByUserNameMatchLbl.click();
        await this.selectTeamTab();
        await this.searchTxt.click();
        await this.searchTxt.setValue(conctactName);
        await this.searchSuggestionByUserNameMatchLbl.click();
        break;
      } else {
        await this.clearSearchBoxBtn.click();
      }
    }
  }

  async selectContactInResultListByName(name) {
    const contactNameLocator = this.browser.$(
      this.contactInResultListLbl.replace("{0}", name)
    );
    await contactNameLocator.waitForExist();
    await contactNameLocator.click();
  }
}
