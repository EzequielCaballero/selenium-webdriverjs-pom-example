"use strict";
//SELENIUM
import { By, Key, WebDriver, Locator } from "selenium-webdriver";
import PageObject from "./page-object";

class PageGoogle extends PageObject {
  //ATTRIBUTES
  private _input_search: Locator = By.xpath(
    "//input[(@name='q') and (@class = 'gLFyf gsfi')]"
  );
  private _box_results: Locator = By.id("rcnt");

  //GET
  public get Input_search() {
    return this._input_search;
  }

  public get Box_results() {
    return this._box_results;
  }

  //CONSTRUCTOR
  constructor(browser: WebDriver) {
    super(browser);
  }

  //METHODS
  public insert_value = async (value: string) => {
    await this.browser
      .findElement(this._input_search)
      .sendKeys(value, Key.RETURN);
  };
}

export default PageGoogle;
