//CONFIG
import { config } from "./config-data";
//SELENIUM
import { Builder, WebDriver } from "selenium-webdriver";

class DriverLifeCycle {
  //ATRIBUTES
  protected static browser: WebDriver;
  static userProfilePath: string;
  static capabilities: any;
  static options: any;

  //METHODS
  static setUp = async (browserName: string) => {
    switch (browserName) {
      case "chrome":
        //Setting up chrome options
        const { Capabilities } = require("selenium-webdriver");
        DriverLifeCycle.capabilities = Capabilities.chrome();
        await DriverLifeCycle.capabilities.set("goog:chromeOptions", {
          args: [
            config.chrome.options.lang,
            config.chrome.options.windowSize,
            config.chrome.options.infobars,
            config.chrome.options.profile
          ]
        });
        break;
      case "firefox":
        //Setting up firefox options
        const OptionsFirefox = require("selenium-webdriver/firefox").Options;
        DriverLifeCycle.options = await new OptionsFirefox();
        DriverLifeCycle.options.setBinary(config.firefox.options.binary);
        DriverLifeCycle.options.setProfile(config.firefox.options.profile);
        DriverLifeCycle.options.setLoggingPrefs(config.firefox.options.lang);
        break;
      case "ie":
        //Internet Explorer options are better to be handled manually
        const OptionsIE = require("selenium-webdriver/ie").Options;
        DriverLifeCycle.options = await new OptionsIE();
        break;
      default:
        // console.log("Browser name not allowed");
        throw new Error("Browser name not allowed - please validate");
    }
  };

  static buildUp = async (browserName: string) => {
    DriverLifeCycle.browser = new Builder()
      .forBrowser(browserName)
      .withCapabilities(
        browserName === "chrome"
          ? DriverLifeCycle.capabilities
          : DriverLifeCycle.options
      )
      .build();
  };

  static openURL = async (url: string) => {
    await DriverLifeCycle.browser.get(url);
    await DriverLifeCycle.browser
      .manage()
      .window()
      .maximize();
  };

  static cleanUp = async () => {
    await DriverLifeCycle.browser.manage().deleteAllCookies();
    // await DriverLifeCycle.browser.get("about:blank");
  };

  static closeActiveWindow = async () => {
    await DriverLifeCycle.browser.close();
  };

  static closeAllWindows = async () => {
    //.quit() method calls dispose() method
    await DriverLifeCycle.browser.quit();
  };
}

export default DriverLifeCycle;
