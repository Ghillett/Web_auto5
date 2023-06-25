const { findAvailableSeat, selectSeat, isButtonDisabled, gotoNewTab, bookSeat } = require("./custom-commands");

let page;

beforeAll(async () => {
  page = await browser.newPage();
  await page.goto('http://qamid.tmweb.ru/client/index.php');
  await bookSeat(page);
  await page.close()
}, 15000);

describe('Cinema tests', () => {

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('http://qamid.tmweb.ru/client/index.php');
  }, 10000);
  
  afterEach(() => {
    page.close();
  }, 50000);

  test('Book common seat', async() =>{
    await findAvailableSeat(page);
    await isButtonDisabled(page, false);
  }, 20000)

  test('Book vip seat', async() =>{
    await findAvailableSeat(page, 'vip');
    await isButtonDisabled(page, false);
  }, 30000), 

  test('Book taken seat', async() =>{
    await findAvailableSeat(page, 'taken');
    await isButtonDisabled(page, true);
  }, 20000)
}, 50000);
