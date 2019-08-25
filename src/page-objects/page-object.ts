"use strict";
//NODE MODULES
import fs from "fs";
import desktopScreenshot from "screenshot-desktop";
//SELENIUM
import { WebDriver, until, Locator } from "selenium-webdriver";

class PageObject {
  //ATRIBUTES
  protected browser: WebDriver;
  private screenshot_counter: number;

  //CONSTRUCTOR
  constructor(driver: WebDriver) {
    this.browser = driver;
    this.screenshot_counter = 0;
  }

  //STATIC WAIT
  public staticWait = async (timer: number) => {
    try {
      await this.browser.sleep(timer);
    } catch (error) {
      console.log(`Error in static wait - ${error}`);
    }
  };

  //DYNAMIC WAIT
  public dynamicWait = async (element: Locator) => {
    try {
      await this.browser.wait(until.elementLocated(element), 10000);
    } catch (error) {
      console.log(`Error in dynamic wait- OBJECT ${element} - ${error}`);
    }
  };

  //TAKE SCREENSHOT
  public takeEvidence = async (
    screenshotMethod: string,
    browserName: string,
    page: string,
    nameFile: string
  ) => {
    try {
      await this.staticWait(1000);
      //(1) Get the screenshot (if is active)
      let img64;
      if (screenshotMethod !== "none") {
        if (screenshotMethod === "browser")
          img64 = await this.takeBrowserScreenshot();
        else img64 = await this.takeDesktopScreenshot();

        //(2) Increase the counter
        this.screenshot_counter += 1;
        //(3) Get today's date
        let fullDate: any = await this.getDateTime();
        //(4) Validate folder path
        if (
          !(await this.validateFolderPath(page, fullDate.today, browserName))
        ) {
          throw new Error();
        }
        //(5) Define the full path
        let path: string = `evidence/${page}/${fullDate.today}/${browserName}/${this.screenshot_counter}-${nameFile}_(${fullDate.time}).png`;
        //(6) Create the file
        fs.writeFileSync(path, img64, "base64");
      } else return;
    } catch (error) {
      console.log(`Error taking screenshot - Message: ${error}`);
    }
  };

  /* INTERNAL METHODS */

  private validateFolderPath(
    page: string,
    day: string,
    browser: string
  ): boolean {
    try {
      if (!fs.existsSync(`evidence/${page}`)) {
        fs.mkdirSync(`evidence/${page}`);
      }
      if (!fs.existsSync(`evidence/${page}/${day}`)) {
        fs.mkdirSync(`evidence/${page}/${day}`);
      }
      if (!fs.existsSync(`evidence/${page}/${day}/${browser}`)) {
        fs.mkdirSync(`evidence/${page}/${day}/${browser}`);
      }
      return true;
    } catch (error) {
      console.log(`Error generating folder path - Message: ${error}`);
      return false;
    }
  }

  private getDateTime(): any {
    let fullDate: string = new Date().toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
    let today: string = fullDate.split(",")[0].replace(/\//g, "-");
    let time: string = fullDate
      .split(",")[1]
      .replace(/\:/g, ".")
      .trim();

    return { today, time }; //Local values
  }

  private async takeBrowserScreenshot() {
    /**
     * Pro: evidence is capture despite browser is not visible (at first plane)
     * Cons: the url and start bar are not part of the screenshot
     */
    try {
      return await this.browser.takeScreenshot();
    } catch (error) {
      console.log(`Error taking screenshot from browser - Message: ${error}`);
      return false;
    }
  }
  private async takeDesktopScreenshot() {
    /**
     * Pro: evidence captures all the elements -> browser + url + start bar
     * Cons: the browser must be at first plane
     */
    try {
      return await desktopScreenshot({ format: "png" });
    } catch (error) {
      console.log(`Error taking screenshot from desktop - Message: ${error}`);
      return false;
    }
  }
}

export default PageObject;
