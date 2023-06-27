async function findAvailableSeat (page, value = 'common', number = 0){
    await page.waitForSelector('.movie-seances__time');
    let buttons = await page.$$('.movie-seances__time:not(.acceptin-button-disabled)');
    await page.waitForSelector('.movie-seances__time');
    await buttons[number].click();

    try{
        await selectSeat(page, value);
    }catch{
        await page.goBack();
        try{
            await findAvailableSeat(page, value, ++number);
        }catch{
            await gotoNewTab(page);
            await findAvailableSeat(page, value, 0);
        }
    }
}

async function selectSeat(page, value = 'common'){
    await page.waitForSelector('.buying-scheme__row');
    let seat;

    if(value === 'common'){
        seat = await page.$('.buying-scheme__chair_standart:not(.buying-scheme__chair_taken)', {timeout: 1000});
    }else if(value === 'vip'){
        seat = await page.$('.buying-scheme__row .buying-scheme__chair_vip:not(.buying-scheme__chair_taken)', {timeout: 1000});
    }else if(value === 'taken'){
        seat = await page.$('.buying-scheme__chair_taken', {timeout: 1000});
    }
    await seat.click();
}

async function isButtonDisabled(page, value){
    page.waitForSelector('.acceptin-button');
    let bookButtonDisabled = await page.$eval('.acceptin-button', el => el.disabled);
    expect(bookButtonDisabled).toEqual(value);
}

async function gotoNewTab(page){
    await page.waitForSelector('.page-nav__day');
    await page.$('.page-nav__day_chosen + .page-nav__day').click();
}

async function bookSeat(page){
    await page.waitForSelector('.movie-seances__time');
    let buttons = await page.$$('.movie-seances__time:not(.acceptin-button-disabled)');
    await buttons[0].click();
    await page.waitForSelector('.buying-scheme__row');
    let seat = await page.$('.buying-scheme__chair_standart:not(.buying-scheme__chair_taken)');
    await seat.click();
    let button = await page.$('.acceptin-button');
    await button.click();
    await page.waitForSelector('.ticket__check-title');
    let secondButton = await page.$('.acceptin-button');
    await secondButton.click();
    await page.goBack();
}

module.exports = {
    findAvailableSeat,
    selectSeat,
    isButtonDisabled,
    gotoNewTab,
    bookSeat
}