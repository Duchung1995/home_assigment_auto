/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
export default class BasePage {
  browser;
  constructor(browserInstance) {
    this.browser = browserInstance;
  }

  open(path) {
    return this.browser.url(`https://web.qa.leapxpert.app/${path}`);
  }

  async typeTextDelay(element, text, delay) {
    for (let i = 0; i < text.length; i++) {
      await element.addValue(text.charAt(i));
      await this.browser.pause(delay);
    }
  }

  async waitForPageLoad() {
    this.browser.waitUntil(() =>
      this.browser.execute(() => document.readyState === "complete")
    );
  }
}
