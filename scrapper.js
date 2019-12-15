// scraper Code using puppeteer.js

const puppeteer = require('puppeteer');

let scrape = (async () => {
  const browser = await puppeteer.launch(
      {headless: false});
  const page = await browser.newPage();
  await page.goto('https://www.google.com/maps/search/restaurants+near+springfield+va/@38.7836362,-77.1906504,15z/data=!3m1!4b1');
  
  await page.evaluate(() => { 
    document.getElementsByClassName("section-result")[0].click(); 
  debugger
  });
  await page.screenshot({path: 'example.png'});
  await page.waitFor(4000);

  const result = await page.evaluate(() => {
    
    let check = document.getElementsByClassName("section-info-text section-info-red")[0].innerText
    
    console.log(check)
    // debugger
    
    if (check == "Closed." || check =="Cerrado."){
    let closeRest = "RESTAURANTs ARE CLOSE! IN THIS AREA"

    return {
      closeRest
    }
    // debugger
    }else{
    let busyState = document.getElementsByClassName("section-popular-times-live-description")[0].innerText
    let percent = document.getElementsByClassName("section-popular-times-value section-popular-times-live-value")[0].attributes[0].textContent
    }

    return {
      busyState,
      percent,
      closeRest
    }
    

});
console.log(result)
debugger
await browser.close();
    return result;
  
})();

