const puppeteer = require('puppeteer');

let site = "https://www.google.com/maps/search/restaurants+near+springfield+va/@38.7836362,-77.1906504,15z/data=!3m1!4b1"


let scrape = (async () => {
let array = []

  const browser = await puppeteer.launch(
      {headless: false},
      {ignoreDefaultArgs: ['--disable-extensions'],}
      );
  const page = await browser.newPage();
  await page.goto(site, {waitUntil: 'load', timeout: 0});
  await page.waitFor(4000);

for (let i = 0; i < 
  5; i++) {
    console.log("first:"+ i)
  await page.evaluate((i) => { 
    document.getElementsByClassName("section-result")[i].click(); 
    
  },i);

  await page.screenshot({path: 'example.png'});
  await page.waitFor(4000);
  
  const result = await page.evaluate(() => {
    let check = document.getElementsByClassName("section-info-text")[4].innerText
    let closeRest = ""
    console.log(check)

    let busyStateNotLive = ""

    if (busyStateNotLive != null){
          busyStateNotLive = document.getElementsByClassName("section-popular-times-value section-popular-times-current-value")[0].parentElement.attributes[0].textContent.slice(0,3) 
          let restName = document.getElementsByClassName('GLOBAL__gm2-headline-5 section-hero-header-title-title')[0].innerText
  
          return {
            busyStateNotLive,
            restName 
          }
        
      }else{
      let percent = document.getElementsByClassName("section-popular-times-value section-popular-times-live-value")[0].attributes[0].textContent
      let restName = document.getElementsByClassName('GLOBAL__gm2-headline-5 section-hero-header-title-title')[0].innerText
       
      return {
        percent,
        restName
      }  
    }

  });    
    array.push(result)
    console.log(result)
      await page.evaluate(() => { 
        document.getElementsByClassName("section-back-to-list-button blue-link noprint")[0].click(); 
      }); 
      await page.waitFor(4000);
      
  }
  console.log(array)
  debugger
    browser.close();
    return result;
})();

// await page.evaluate(() => { 
//   document.getElementsByClassName("section-back-to-list-button blue-link noprint")[0].click(); 
// });  
// await page.waitFor(4000);
// await page.evaluate(() => { 
//   document.getElementsByClassName("section-result")[1].click(); 
// });
// await page.screenshot({path: 'example2.png'});
// await page.waitFor(4000);

// const result2 = await page.evaluate(() => {
//   let check = document.getElementsByClassName("section-info-text")[4].innerText
//   let closeRest = ""
//   console.log("second " + check)

//   let busyStateNotLive = null
//   if (check == "Closed." || check =="Cerrado."){
//     closeRest = "RESTAURANTs ARE CLOSE! IN THIS AREA"

//     console.log(closeRest)
    
//     return {
//       closeRest
//     }


//     }else if (busyStateNotLive == ""){
//         busyStateNotLive = document.getElementsByClassName("section-popular-times-value section-popular-times-current-value")[0].parentElement.attributes[0].textContent.slice(0,3) 
//         let restName = document.getElementsByClassName('GLOBAL__gm2-headline-5 section-hero-header-title-title')[0].innerText

//         return {
//           busyStateNotLive,
//           restName 
//         }
      
//     }else{
//     let percent = document.getElementsByClassName("section-popular-times-value section-popular-times-live-value")[0].attributes[0].textContent
//     let restName = document.getElementsByClassName('GLOBAL__gm2-headline-5 section-hero-header-title-title')[0].innerText
     
//     return {
//       percent,
//       restName
//     }  
//   }

// });    