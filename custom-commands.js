module.exports = {
    findAvailableSeance: async function (page, number){
        await page.waitForSelector('.movie-seances__time');
        let buttons = await page.$$('.movie-seances__time:not(.acceptin-button-disabled)');
        await buttons[number].click();
    },

    selectSeat: async function(page, number, value = 'common'){
        await page.waitForSelector('.buying-scheme__row');
        let rows = await page.$$('.buying-scheme__row');
        let seat;
        if(value === 'common'){
            seat = await rows[number].$('.buying-scheme__chair_standart:not(.buying-scheme__chair_taken)');
        }else if(value === 'vip'){
            seat = await rows[number].$('.buying-scheme__chair_vip:not(.buying-scheme__chair_taken)');
        } else if(value === 'taken'){
            seat = await rows[number].$('.buying-scheme__chair_taken');
        }
        await seat.click();
    },

    isButtonDisabled: async function(page, value){
        let bookButtonDisabled = await page.$eval('.acceptin-button', el => el.disabled);
        expect(bookButtonDisabled).toEqual(value);
    }
}