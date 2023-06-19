const { findAvailableSeance, selectSeat, isButtonDisabled } = require("./custom-commands");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto('http://qamid.tmweb.ru/client/index.php');
});

afterEach(() => {
  page.close();
});

describe('Cinema tests', () => {

  test('Book common seat', async() =>{
    await findAvailableSeance(page, 0);
    await page.waitForNavigation();
    await selectSeat(page, 0);
    await isButtonDisabled(page, false);
  }, 10000)

  test('Book vip seat', async() =>{
    await findAvailableSeance(page, 0);
    await page.waitForNavigation();
    await selectSeat(page, 0, 'vip');
    await isButtonDisabled(page, false);
  }, 10000), 

  test('Book taken seat', async() =>{
    await findAvailableSeance(page, 0);
    await page.waitForNavigation();
    await selectSeat(page, 6, 'taken');
    await isButtonDisabled(page, true);
  }, 10000)
});
