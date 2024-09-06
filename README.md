# kakaofriends-ios-weather-widget
This widget uses the iOS Scriptable app for a Kakao Friends home widget that includes greetings and basic weather information based on location.

<img src="https://user-images.githubusercontent.com/26236571/206777127-3a27475b-0143-49f1-a11b-add1ccbee6bd.png" width="300" />


## Setup
- Go to OpenWeatherMap for a free API key: https://openweathermap.org/api
- Copy the API key to line 13
- If using Celcius, change line 45 from "F" to "C"
- The Scriptable app should create a folder in iCloud. Copy both JS file and "weather" folder into the "Scriptable" folder in iCloud
- Add a Scriptable widget to the homescreen and select the script

- What're these lat.txt and long.txt files? 
-- The script uses the current location to retrieve the latest weather info but sometimes may fail and cause an error to appear on the Scriptable widget.  The script saves the last latitude and longitude to the files and uses them if the current location fails
