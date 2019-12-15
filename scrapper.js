const puppeteer = require('puppeteer');

let site = "https://www.google.com/maps/search/restaurants+near+springfield+va/@38.7836362,-77.1906504,15z/data=!3m1!4b1"

// var i;
// for (i = 0; i < cars.length; i++) {
//   text += cars[i] + "<br>";
// }


let scrape = (async () => {
  
  const browser = await puppeteer.launch(
      {headless: false});
  const page = await browser.newPage();
  await page.goto(site, {waitUntil: 'load', timeout: 0});

  const text = await page.evaluate(() => { 
    document.getElementsByClassName("section-result"); 
  });
  debugger;
  console.log(text)


 

  await page.evaluate(() => { 
    document.getElementsByClassName("section-result")[0].click(); 
  });
  await page.screenshot({path: 'example.png'});
  await page.waitFor(4000);
  const result = await page.evaluate(() => {
    let check = document.getElementsByClassName("section-info-text")[4].innerText
    let closeRest = ""
    console.log(check)
    // debugger;
    if (check == "Closed." || check =="Cerrado."){
    closeRest = "RESTAURANTs ARE CLOSE! IN THIS AREA"
    console.log(closeRest)
    debugger;
    return {
      closeRest
    }
    // debugger
    }else{
      
    let busyState = document.getElementsByClassName("section-popular-times-live-description")[0].innerText
    let percent = document.getElementsByClassName("section-popular-times-value section-popular-times-live-value")[0].attributes[0].textContent
    let restName = document.getElementsByClassName('GLOBAL__gm2-headline-5 section-hero-header-title-title')[0].innerText
    return {
      busyState,
      percent,
      restName
    }  
  }

  });    
    console.log(result)
    await page.waitFor(400000);
    browser.close();
    return result;


})();

