import { Given, When, Then } from "@wdio/cucumber-framework";
import { LoginPage } from "../pageobjects/web/login.page.js";
import { CommonPage } from "../pageobjects/web/common.page.js";
import { DevicesPage } from "../pageobjects/web/devices.page.js";
import { CommonPageMb } from "../pageobjects/mobile/commonMb.page.js";
import { LoginPageMb } from "../pageobjects/mobile/loginPageMb.page.js";
import { ContactPageMb } from "../pageobjects/mobile/contactMb.page.js";
import { ContactProfileMb } from "../pageobjects/mobile/contactProfileMb.page.js";
import { ChatPageMb } from "../pageobjects/mobile/chatMb.page.js";
import { ChatPage } from "../pageobjects/web/chat.page.js";

let activationCode = "";

Given(
  /^"([^"]*)" and "([^"]*)" on the Leapxpert login page web$/,
  async (user1, user2) => {
    const browserInstance1 = browser.getInstance(user1);
    const loginPageWeb1 = new LoginPage(browserInstance1);
    await loginPageWeb1.goToLoginPage("login");
    const browserInstance2 = browser.getInstance(user2);
    const loginPageWeb2 = new LoginPage(browserInstance2);
    await loginPageWeb2.goToLoginPage("login");
  }
);

When(
  /^"([^"]*)" logs in the Web Application with (.*) (.*) (.*) (.*)$/,
  async (user, companyName, userName, password, otp) => {
    const browserInstance = browser.getInstance(user);
    const loginPageWeb = new LoginPage(browserInstance);
    const commonPageWeb = new CommonPage(browserInstance);
    await loginPageWeb.login(companyName, userName, password, otp);
    await commonPageWeb.verifyAvatarIsDisplayed();
  }
);

When(
  /^"([^"]*)" requests activation code from the Web Application to allow to log in the Mobile App$/,
  async (user) => {
    const browserInstance = browser.getInstance(user);
    const commonPageWeb = new CommonPage(browserInstance);
    const devicesPage = new DevicesPage(browserInstance);
    await commonPageWeb.goToDevicesPage();
    await devicesPage.verifyDevicesPageIsDisplayed();
    activationCode = await devicesPage.getActivationCode();
    console.log(activationCode);
  }
);

When(
  /^On the mobile app, "([^"]*)" starts the mobile app then activation code$/,
  async (user) => {
    const browserInstance = browser.getInstance(user);
    const commonPageMb = new CommonPageMb(browserInstance);
    const loginPageMb = new LoginPageMb(browserInstance);
    await commonPageMb.bypassWelcomePage();
    await commonPageMb.denyCameraPermission();
    await loginPageMb.inputActivationCode(activationCode);
  }
);

When(
  /^"([^"]*)" types the (.*) on Mobile application$/,
  async (user, password) => {
    const browserInstance = browser.getInstance(user);
    const loginPageMb = new LoginPageMb(browserInstance);
    await loginPageMb.login(password);
  }
);

When(/^"([^"]*)" inputs (.*)$/, async (user, otp) => {
  const browserInstance = browser.getInstance(user);
  const loginPageMb = new LoginPageMb(browserInstance);
  const commonPageMb = new CommonPageMb(browserInstance);
  await loginPageMb.inputOtp(otp);
  await commonPageMb.closePermissionRequirePopup();
});

When(/^"([^"]*)" goes to Contact tab$/, async (user) => {
  const browserInstance = browser.getInstance(user);
  const commonPageMb = new CommonPageMb(browserInstance);
  await commonPageMb.goToContactPage();
});

When(
  /^"([^"]*)" searches for (.*) by "([^"]*)"$/,
  async (user, userName, contactName) => {
    const browserInstance = browser.getInstance(user);
    const contactPageMb = new ContactPageMb(browserInstance);
    await contactPageMb.searchTeamContactByName(userName);
    await contactPageMb.selectContactInResultListByName(contactName);
  }
);

When(
  /^"([^"]*)" sends (.*) & (.*) to User2$/,
  async (user, sendMess, replyMess) => {
    const browserInstance = browser.getInstance(user);
    const contactProfileMb = new ContactProfileMb(browserInstance);
    const chatMb = new ChatPageMb(browserInstance);
    await contactProfileMb.clickOnChatBtn();
    await chatMb.verifyChatPageMbIsDisplayed();
    await chatMb.sendMessage(sendMess);
    await chatMb.repyMessage(sendMess, replyMess);
  }
);

Then(
  /^"([^"]*)" verifies that he has received (.*) and (.*) from "([^"]*)"$/,
  async (user, message, replyMessage, user1Name) => {
    const browserInstance = browser.getInstance(user);
    const chatPage = new ChatPage(browserInstance);
    await chatPage.selectChatRoomByName(user1Name);
    await chatPage.verifyTheMessageIsDisplayed(message);
    await chatPage.verifyTheMessageIsDisplayed(replyMessage);
  }
);
