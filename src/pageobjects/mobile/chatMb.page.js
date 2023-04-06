import BasePage from "../basePage.js";

export class ChatPageMb extends BasePage {
  constructor(browserInstance) {
    super(browserInstance);
  }
  // Element locator
  get chatInputTxt() {
    return this.browser.$("~chatDetail_input");
  }

  get sendChatBtn() {
    return this.browser.$("~chatDetail_sendMessage");
  }

  get replyMessageBtn() {
    return this.browser.$("~reply");
  }

  messageLbl = "(//android.view.ViewGroup[@resource-id='{0}'])[1]";

  // Page Action

  async verifyChatPageMbIsDisplayed() {
    await expect(this.chatInputTxt).toBeDisplayed();
  }

  async sendMessage(message) {
    await this.chatInputTxt.click();
    await this.chatInputTxt.addValue(message);
    await this.sendChatBtn.waitForEnabled();
    await this.sendChatBtn.click();
    await this.browser.pause(1000);
  }

  async repyMessage(message, replyMessage) {
    await this.chatInputTxt.click();
    await this.browser.hideKeyboard();
    await this.longPressOneMessage(message);
    await this.selectReplyOption();
    await this.sendMessage(replyMessage);
  }

  async longPressOneMessage(message) {
    let messageLocactor = await this.browser.$(
      this.messageLbl.replace("{0}", message)
    );
    await messageLocactor.click();
    await this.browser.touchAction({
      action: "longPress",
      element: messageLocactor,
      duration: 2000,
    });
  }

  async selectReplyOption() {
    for (let i = 0; i < 10; i++) {
      {
        await this.replyMessageBtn.touchAction({
          action: "tap",
          x: 10,
          y: 10,
        });
        let isDisplayed = await this.replyMessageBtn.isDisplayed();
        if (!isDisplayed) {
          break;
        }
      }
    }
  }
}
