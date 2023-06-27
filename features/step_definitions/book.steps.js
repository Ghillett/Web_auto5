const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { findAvailableSeat, selectSeat, isButtonDisabled, gotoNewTab, bookSeat } = require("../../custom-commands");

Before(async function () {
    const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
    const page = await browser.newPage();
    this.browser = browser;
    this.page = page;
  });
  
After(async function () {
    if (this.browser) {
      await this.browser.close();
    }
});

  Given('there is a taken seat in the first available seance', {timeout: 15000}, async function(){
    bookSeat(this.page);
  })

  Given('user is on {string} page', {timeout: 15000}, async function(string){
    return await this.page.goto('http://qamid.tmweb.ru/client/index.php');
  });

  When('user selects {string} seat for available seance', {timeout: 15000}, async function(string){
    return await findAvailableSeat(this.page, string);
  });

  Then('book button should be {string}', {timeout: 15000}, async function(string){
    this.page.waitForSelector('.acceptin-button');
    let bookButtonDisabled = await this.page.$eval('.acceptin-button', el => el.disabled);
    if(string == 'active'){
        expect(bookButtonDisabled).to.equal(false);
    } else if(string == 'disabled'){
        expect(bookButtonDisabled).to.equal(true);
    }
  });