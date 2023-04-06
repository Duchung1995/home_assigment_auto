import BasePage from "../basePage.js";

export class ChatPage extends BasePage {
  constructor(browserInstance) {
    super(browserInstance);
  }

  roomNameLbl = "//div[@data-testid='room-name']//span[contains(.,'{0}')]";

  messageItemBodylLbl =
    "(//span[@data-testid='message-item-body']/span[contains(.,'{0}')])[last()]";

  async selectChatRoomByName(name) {
    let roomNameLocator = await this.browser.$(
      this.roomNameLbl.replace("{0}", name)
    );
    await roomNameLocator.waitForDisplayed();
    await roomNameLocator.click();
  }

  async verifyTheMessageIsDisplayed(ContentMessage) {
    let messageItemBodyLocator = await this.browser.$(
      this.messageItemBodylLbl.replace("{0}", ContentMessage)
    );
    await expect(messageItemBodyLocator).toBeDisplayed();
  }
}
