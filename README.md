# UberEats_HotZones
UberEats city hotzones(React native)

Using Puppeteer.js to scrape data from google maps and Express.js to collect and fetch data. The application displays information to a user about how busy the restaurants are around a specific US location.

the app will start with a map showing the user's current location, a search input fill, and a search button.

<img src="ReadmeImages/Startapp.png" width="300"> 
tapping on the search icon will reveal the input field.

<img src="ReadmeImages/searchtap.png" width="300"> <img src="ReadmeImages/locationset.png" width="300">

then hit search and wait. Meanwhile, the backend is collecting the information requested base on the location inserted.
<img src="ReadmeImages/serverdata.png">

after the server finished collecting the information the app will display the location with a color area representing the busyness percentage.

<img src="ReadmeImages/notbusyresult.png" width="300"> <img src="ReadmeImages/mediumbusyresult.png" width="300"> <img src="ReadmeImages/busyresult.png" width="300">

