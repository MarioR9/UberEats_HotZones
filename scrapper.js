const puppeteer = require('puppeteer');

let site = "https://www.google.com/maps/search/restaurants+near+springfield+va/@38.7836362,-77.1906504,15z/data=!3m1!4b1"


let scrape = (async () => {

let sectionsArray = []
let pageCounter = 1
let sectionResultCollection = []
  const browser = await puppeteer.launch(
      {headless: false},
      {ignoreDefaultArgs: ['--disable-extensions'],}
      );
  const page = await browser.newPage();
  await page.goto(site, {waitUntil: 'load', timeout: 0});
  await page.waitFor(2000);

  let section = await page.evaluate(() => { 
    let Divs = document.getElementsByClassName("section-result").length;

    return {
        Divs
    }
  },);

  sectionResultCollection.push(section)

  if(sectionResultCollection[0].Divs == 21){
    console.log("Ads present")
  }else{
    console.table(sectionResultCollection)
  }
  await page.waitFor(2000);

for (let i = 0; i < 
  sectionResultCollection[0].Divs + 1; i++) {
  await page.evaluate((i) => { 
    document.getElementsByClassName("section-result")[i].click(); 
  },i);

  await page.screenshot({path: 'example.png'});

  await page.waitForSelector('.section-info-text', {
    visible: true,
  });
  
  const result = await page.evaluate(() => {
    let check = document.getElementsByClassName("section-info-text")[4].innerText
    let check2 = document.getElementsByClassName("section-info-text")[3].innerText
    let check3 = document.getElementsByClassName('GLOBAL__gm2-subtitle-alt-1')[0].innerText
    let check4 = document.getElementsByClassName("section-popular-times-value section-popular-times-live-value").length
    let check5 = document.getElementsByClassName("section-popular-times-value section-popular-times-current-value")

    let bussynessPercentage = ""
    
    if((check == "Cerrado." || check2 == "Cerrado.") || (check3 != "Horarios populares" && check5.length == 0)){
      bussynessPercentage = "0%"
      let restaurantName = document.getElementsByClassName('GLOBAL__gm2-headline-5 section-hero-header-title-title')[0].innerText

      return {
        bussynessPercentage,
        restaurantName 
      }
    }else if (check4 == 0){
          bussynessPercentage = document.getElementsByClassName("section-popular-times-value section-popular-times-current-value")[1].parentElement.attributes[0].textContent.slice(0,3) 
          let restaurantName = document.getElementsByClassName('GLOBAL__gm2-headline-5 section-hero-header-title-title')[0].innerText
  
          return {
            bussynessPercentage,
            restaurantName 
          }
        
      }else if(check4 == 1){
        bussynessPercentage = document.getElementsByClassName("section-popular-times-value section-popular-times-live-value")[0].attributes[0].textContent
      let restaurantName = document.getElementsByClassName('GLOBAL__gm2-headline-5 section-hero-header-title-title')[0].innerText
       
      return {
        bussynessPercentage,
        restaurantName
      }  

    }

  });
    sectionsArray.push(result)
    
    
      await page.evaluate(() => { 
        document.getElementsByClassName("section-back-to-list-button blue-link noprint")[0].click(); 
      }); 
      await page.waitFor(2000);
    if(i == sectionResultCollection[0].Divs - 1){
      i = 0
      await page.evaluate(() => { 
        document.getElementsByClassName("n7lv7yjyC35__button-next-icon")[0].click(); 
      });
      await page.waitFor(2000); 
      console.log("page: " + pageCounter)
      pageCounter++

      if(pageCounter == 4){
        console.log(sectionsArray)
        browser.close();
        return sectionsArray;
      }
    }
    
  }
  
})();

