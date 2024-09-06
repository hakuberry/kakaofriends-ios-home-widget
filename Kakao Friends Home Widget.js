// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: magic;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: magic;
// Create your ID on openweathermap.org
// Get your api from there and set that in API_WEATHER
// Add your API KEY and the run the scritp in the scriptable app
// The City ID for your current location will appear in the log section of the app. 

//API_KEY
let API_WEATHER = "391387b5519159a34415416892d4eb66";//Load Your api here


Location.setAccuracyToBest();  
var base_path = "/var/mobile/Library/Mobile Documents/iCloud~dk~simonbs~Scriptable/Documents/weather/";

const fm = FileManager.iCloud();

try {
  var curLocation = await Location.current();
  console.log(curLocation);
  fm.writeString(base_path+"lat.txt", String(curLocation.latitude));
  fm.writeString(base_path+"long.txt", String(curLocation.longitude));
} catch (error) {
  let lat = parseFloat(fm.readString(base_path+"lat.txt"));
  let long = parseFloat(fm.readString(base_path+"long.txt"));
  var curLocation = {
    latitude: lat,
    longitude:long
  }
}
console.log(curLocation.latitude);  
console.log(curLocation.longitude);
let url = "http://api.openweathermap.org/data/2.5/weather?lat=" + curLocation.latitude + "&lon=" + curLocation.longitude + "&appid=" + API_WEATHER + "&units=metric";  

const data = await fetchWeatherData(url);
console.log("City Name: " + data.name);
console.log("City ID: " + data.id);

//get Json weather
async function fetchWeatherData(url) {
    const request = new Request(url);
    const res = await request.loadJSON();
    return res;
  }
  
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: magic;
// Create your ID on openweathermap.org
// Get your api from there and set that in API_WEATHER
// To get CITY_WEATHER means city ID get the longitude and latitute from google maps for your location
// Replace the longitude, latitute and YOUR_API_KEY in the given link http://api.openweathermap.org/data/2.5/weather?lat=Latitude&lon=Longitude&appid=YOUR_API_KEY&units=metric and look for your city ID in the resultant text.
// Set that ID to CITY_WEATHER

//API_KEY// 
// let API_WEATHER = "YOUR_API_HERE";//Load Your api here// 
// let CITY_WEATHER = "YOUR_CITY_ID_HERE";//add your city ID
let CITY_WEATHER = data.id;
let UNIT_TYPE = "F";//C for Celius and F for fernite

//create Data 
var today = new Date();

//Initlize Widget
let widget = new ListWidget(); 

//color
async function setTextColor(){   
    this.darkMode = !(Color.dynamic(Color.white(), Color.black()).red);
    var textColor;
    if (darkMode)
      textcolor = new Color("#ffffff");
    else
      textcolor = new Color("#000000");
    console.log(textColor);
    return textColor;
}
// 
// var textColor = await setTextColor();

let textcolor = new Color("#ffffff");

// Fetch Image from Url
async function fetchimageurl(url) {
	const request = new Request(url)
	var res = await request.loadImage();
	return res;
}

// Get formatted Date
function getformatteddate(){
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return months[today.getMonth()] + " " + today.getDate()
}

// Load image from local drive
async function fetchimagelocal(path){
  var finalPath = base_path + path + ".png";
  if(fm.fileExists(finalPath)==true){
    console.log("file exists: " + finalPath);
    return finalPath;
  }else{
    //throw new Error("Error file not found: " + path);
    if(fm.fileExists(base_path)==false){
      console.log("Directory not exist creating one.");
      fm.createDirectory(base_path);
    }
    console.log("Downloading file: " + finalPath);
    await downloadimg(path);
    if(fm.fileExists(finalPath)==true){
      console.log("file exists after download: " + finalPath);
      return finalPath;
    }else{
      throw new Error("Error file not found: " + path);
    }
  }
}

var imgBrokenClouds = null;
var imgClear = null;
var imgFewClouds = null;
var imgMist = null;
var imgRain = null;
var imgScatteredClouds = null;
var imgShowerRain = null;
var imgSnow = null;
var imgThunderstorm = null;


async function dayOrNight(){
    let lightColor = Color.blue();
    let darkColor = Color.black();
    this.darkMode = !(Color.dynamic(Color.white(), Color.black()).red);
    if(darkMode){
        imgBrokenClouds = "Night Broken Clouds.png";  
        imgClear = "01n_bg.png";  
        imgFewClouds = "Night Few Clouds.png";  
        imgMist = "Night Mist.png";  
        imgRain = "Night Rain.png";  
        imgScatteredClouds = "Night Scattered Clouds.png";  
        imgShowerRain = "Night Shower Rain.png";  
        imgSnow = "Night Snow.png";  
        imgThunderstorm = "Night Thunderstorm.png";
    }
    else{
        imgBrokenClouds = "Day Broken Clouds.png";  
        imgClear = "Day Clear.png";  
        imgFewClouds = "Day Few Clouds.png";  
        imgMist = "Day Mist.png";  
        imgRain = "Day Rain.png";  
        imgScatteredClouds = "Day Scattered Clouds.png";  
        imgShowerRain = "Day Shower Rain.png";  
        imgSnow = "Day Snow.png";  
        imgThunderstorm = "Day Thunderstorm.png";
    }
}

await dayOrNight();

async function downloadimg(path){    
    const url = "/var/mobile/Library/Mobile Documents/iCloud~dk~simonbs~Scriptable/Documents/";  
//     const url = "http://a.animedlweb.ga/weather/weathers25_2.json";
    const data = await fetchWeatherData(url);
    var dataimg = null;
    var name = null;
    if(path.includes("bg")){
      dataimg = data.background;
      name = path.replace("_bg","");
    }
    /*else{
      dataimg = data.icon;
      name = path.replace("_ico","");
    }*/
    var imgurl=null;
    switch (name){
      case "01d":
        imgurl = dataimg._01d;
      break;
      case "01n":
        imgurl = dataimg._01n;
      break;
      case "02d":
        imgurl = dataimg._02d;
      break;
      case "02n":
        imgurl = dataimg._02n;
      break;
      case "03d":
        imgurl = dataimg._03d;
      break;
      case "03n":
        imgurl = dataimg._03n;
      break;
      case "04d":
        imgurl = dataimg._04d;
      break;
      case "04n":
        imgurl = dataimg._04n;
      break;
      case "09d":
        imgurl = dataimg._09d;
      break;
      case "09n":
        imgurl = dataimg._09n;
      break;
      case "10d":
        imgurl = dataimg._10d;
      break;
      case "10n":
        imgurl = dataimg._10n;
      break;
      case "11d":
        imgurl = dataimg._11d;
      break;
      case "11n":
        imgurl = dataimg._11n;
      break;
      case "13d":
        imgurl = dataimg._13d;
      break;
      case "13n":
        imgurl = dataimg._13n;
      break;
      case "50d":
        imgurl = dataimg._50d;
      break;
      case "50n":
        imgurl = dataimg._50n;
      break;
    }
//     const image = await fetchimageurl(imgurl);  
    const image = fm.readImage(imgurl);
    console.log("Downloaded Image");
    fm.writeImage(base_path+path+".png",image);
}

//get Json weather
async function fetchWeatherData(url) {
  console.log(url);
  const request = new Request(url);
  const res = await request.loadJSON();
  return res;
}

// Long-form days and months
var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

// Greetings arrays per time period. 
var greetingsMorning = [
'Good morning'
];
var greetingsAfternoon = [
'Good afternoon'
];
var greetingsEvening = [
'Good evening'
];
var greetingsNight = [
'Bedtime'
];
var greetingsLateNight = [
'Go to sleep!'
];

// Holiday customization
var holidaysByKey = {
	// month,week,day: datetext
	"11,4,4": "Happy Thanksgiving!"
}

var holidaysByDate = {
	// month,date: greeting
	"1,1": "Happy " + (today.getFullYear()).toString() + "!",
	"10,31": "Happy Halloween!",
	"12,25": "Merry Christmas!"
}

var holidayKey = (today.getMonth() + 1).toString() + "," +  (Math.ceil(today.getDate() / 7)).toString() + "," + (today.getDay()).toString();

var holidayKeyDate = (today.getMonth() + 1).toString() + "," + (today.getDate()).toString();

// Date Calculations
var weekday = days[ today.getDay() ];
var month = months[ today.getMonth() ];
var date = today.getDate();
var hour = today.getHours();

// Append ordinal suffix to date
function ordinalSuffix(input) {
	if (input % 10 == 1 && date != 11) {
		return input.toString() + "st";
	} else if (input % 10 == 2 && date != 12) {
		return input.toString() + "nd";
	} else if (input % 10 == 3 && date != 13) {
		return input.toString() + "rd";
	} else {
		return input.toString() + "th";
	}
}

// Generate date string
var datefull = weekday + ", " + month + " " + ordinalSuffix(date);

// Support for multiple greetings per time period
function randomGreeting(greetingArray) {
	return Math.floor(Math.random() * greetingArray.length);
}

var greeting = new String("Howdy.")
if (hour < 5 && hour >= 1) { // 1am - 5am
	greeting = greetingsLateNight[randomGreeting(greetingsLateNight)];
} else if (hour >= 23 || hour < 1) { // 11pm - 1am
	greeting = greetingsNight[randomGreeting(greetingsNight)];
} else if (hour < 12) { // Before noon (5am - 12pm)
	greeting = greetingsMorning[randomGreeting(greetingsMorning)];
} else if (hour >= 12 && hour <= 17) { // 12pm - 5pm
	greeting = greetingsAfternoon[randomGreeting(greetingsAfternoon)];
} else if (hour > 17 && hour < 23) { // 5pm - 11pm
	greeting = greetingsEvening[randomGreeting(greetingsEvening)];
} 

// Overwrite greeting if calculated holiday
if (holidaysByKey[holidayKey]) {
	greeting = holidaysByKey[holidayKey];
}

// Overwrite all greetings if specific holiday
if (holidaysByDate[holidayKeyDate]) {
	greeting = holidaysByDate[holidayKeyDate];
}

//start Programming

// Get Location 
/*Location.setAccuracyToBest();
let curLocation = await Location.current();
console.log(curLocation.latitude);
console.log(curLocation.longitude);*/
let unit_id = "";
let unit_s = "";
if(UNIT_TYPE=="F"){
  unit_id = "imperial";
  unit_s = "\u2109";
}else{
  unit_id = "metric";
  unit_s = "\u2103";
}
let wetherurl = "http://api.openweathermap.org/data/2.5/weather?id=" + CITY_WEATHER + "&APPID=" + API_WEATHER + "&units=" + unit_id;
//"http://api.openweathermap.org/data/2.5/weather?lat=" + curLocation.latitude + "&lon=" + curLocation.longitude + "&appid=" + API_WEATHER + "&units=metric";
//"http://api.openweathermap.org/data/2.5/weather?id=" + CITY_WEATHER + "&APPID=" + API_WEATHER + "&units=metric"

const weatherJSON = await fetchWeatherData(wetherurl);
const cityName = weatherJSON.name;
const weatherarry = weatherJSON.weather;
const iconData = weatherarry[0].icon;
console.log(weatherarry[0].icon);
const weathername = weatherarry[0].main;
const curTempObj = weatherJSON.main;
const curTemp = curTempObj.temp;
const highTemp = curTempObj.temp_max;
const lowTemp = curTempObj.temp_min;
const feel_like = curTempObj.feels_like;
//Completed loading weather data

// Widget Background Image
widget.backgroundImage = Image.fromFile(await fetchimagelocal(iconData+"_bg"));

//Start Spacing
widget.addSpacer(0);

/*
//Widget weather Image
var img = Image.fromFile(await fetchimagelocal(iconData+"_ico"));
var widgetimg = widget.addImage(img);
widgetimg.imageSize = new Size(74,74);
widgetimg.rightAlignImage();
*/

// Greeting label
let hello = widget.addText(greeting);
hello.textColor = textcolor;
hello.font = Font.boldSystemFont(25);

// Widget Date
// var dateText = widget.addText(getformatteddate() + ", " + weathername);
var dateText = widget.addText(datefull);
dateText.textColor = textcolor;
dateText.font = Font.regularSystemFont(15);

widget.addSpacer(5);

// Widget Weather Temp
var tempText = widget.addText(Math.round(curTemp)+unit_s);
tempText.textColor = textcolor;
tempText.font = Font.regularSystemFont(30);

/*
// Widget feel temp
let feel = "Feels like " + Math.round(feel_like) + unit_s;//"H:"+highTemp+"\u2103"+" L:"+lowTemp+"\u2103"
var hltempText = widget.addText(feel);
hltempText.textColor = textcolor;
hltempText.font = Font.regularSystemFont(15);
*/

widget.addSpacer(-5);

// Widget city Name
var citynameText = widget.addText(cityName);
citynameText.textColor = textcolor;
citynameText.font = Font.regularSystemFont(12);


// Bottom Spacer
widget.addSpacer();
//widget.setPadding(5, 15, 0, 15)

Script.setWidget(widget);