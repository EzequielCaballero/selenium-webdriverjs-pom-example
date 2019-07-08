//DRIVER-CONFIG
import DriverLifeCycle from "../config/driver-life-cycle";
//PAGES
import PageGoogle from "../page-objects/page-google";
//CHAI
import { expect } from "chai";

class TestGoogleSearch extends DriverLifeCycle {
  //CONSTRUCTOR
  constructor() {
    super();
  }

  //MAIN STRUCTURE
  public start = async (
    screenshotMethod: string,
    browserName: string,
    data: any
  ) => {
    //TEST SCENARIO
    describe("Checkout browser title after search in google", function() {
      let page_Google: PageGoogle;
      //PRECONDITION
      before(async function() {
        await DriverLifeCycle.setUp(browserName);
        await DriverLifeCycle.buildUp(browserName);
        page_Google = await new PageGoogle(DriverLifeCycle.browser);
        await DriverLifeCycle.cleanUp();
      });
      //CONDITION 1
      it("Go to google main page", async function() {
        await DriverLifeCycle.openURL(data.url);
        await page_Google.takeEvidence(
          screenshotMethod,
          data.page,
          "page-displayed"
        );
        //VALIDATION(!)
        expect(await DriverLifeCycle.browser.getCurrentUrl()).to.equal(
          data.url
        );
      });
      //CONDITION 2
      it("Search a value and check browser title", async function() {
        await page_Google.insert_value(data.valueToSearch);
        await page_Google.dynamicWait(page_Google.Box_results); // (!)
        let result: string = await DriverLifeCycle.browser.getTitle();
        await page_Google.takeEvidence(
          screenshotMethod,
          data.page,
          "page-results"
        );
        //VALIDATION (!)
        expect(result).to.equal(`${data.valueToSearch} - Google Search`);
      });
      //FINALLY
      after(async () => {
        await DriverLifeCycle.closeAllWindows();
      });
    });
  };
}

export default TestGoogleSearch;
