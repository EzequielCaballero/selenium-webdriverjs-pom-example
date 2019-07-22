//DATA
import { data } from "./data/test-data";
//TEST
import TestCase from "./test-cases/test-google-search";
//Type of screenshot => desktop | browser | none
let screenshotMethod: string = "desktop";

/**
 * BROWSERS SUPPORTED
 * 'chrome'
 * 'firefox'
 * 'ie'
 */
let browser = "ie";

//START
let test: TestCase = new TestCase();
test.start(screenshotMethod, browser, data);
