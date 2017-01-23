# Nomie Cloud App Documentation

Nomie Cloud Apps are external web services that can manually or automatically
collect specific data from Nomie for processing off the device. Cloud Apps can also
leverage the Nomie API to automatically track, write notes and more.

## Cloud App Examples

- [Big Spender (js)](https://github.com/happydata/cloudapp-bigspender) - track weekly spending
- [Weather Tracker (js)](https://github.com/happydata/cloudapp-weather) - automatically track the weather
- [PHP Sample Cloud App (php)](https://github.com/happydata/cloudapp-php-example) - a super simple example of an app with PHP 

## Highlevel Cloud App Overview.

![](http://snap.icorbin.com/add-3rd-party-nomie-cloud-app.png)

### How a Cloud App is installed.

Cloud Apps can be installed from within Nomie's App browser, or by manually entering the URL to a Cloud Apps Join JSON document.

Example JOIN json document

```
var join =
{
	"id": "io.nomie.apps.weather", // a Unique ID for your cloud app
	"name": "Weather Tracker", // Name of the cloud app
	"img": "http://snap.icorbin.com/weather-tracking.svg", // Keep it square
	"summary": "Automatically Track the Temp",
	"uses": ["last-location","api", "geo"],
	"color": "#4A90E2",
	"hostedBy": "Brandon Corbin",
	"join": "https://api.nomie.io/apps/weather",
	"more": "https://nomie.io",
	"collection": {
		"method": "automatic",
		"frequency": "1d",
		"url": "https://api.nomie.io/apps/weather",
		"amount": "1d"
	},
	"leave": "https://api.nomie.io/apps/weather/leave",
	"info": {
	   "units" : {
          "type" : "select",
          "value" : "fahrenheit",
          "options" : [
            { label: "Fahrenheit", value: "fahrenheit"},
            { label: "Celcius", value: "celcius"},
          ],
          label : "Unit of Measure"
        }
	},
	"slots": {
		"temp": {
			"label": "Temperature Tracker",
			"summary": null,
			"tracker": null,
			"required": true,
			"recommended" : {
			    "label" : "Temp",
			    "config" : {
			        "type" : "numeric",
			        "uom" : "celsius"
			    },
			    "color" : '#4A90E2',
			    "icon" : "flaticon-thermometer21"
			}
		}
	}
};
```

- **id** - A unique identifier for your cloud app. Note, if you'd like to allow your cloud app to be installed multiple times, add a random string to the end of the id. For example: ``id : "io.nomie.weather."+Math.random(),``
- **name** The name of your app, this is used throughout Nomie,
- **img** A full url to a square avatar no larger than 1000x1000 and no smaller than 500x500. Allowed types: SVG, PNG
- **summary** A summary about your cloud app. Markdown is supported
-	 **uses** [**last-location**,**api**, **geo**] - an Array of items needed for your experiment. Available options are: ``last-location`` users last known location, ``api`` the users api key (if available), `geo` geo location data included with events
-	**color** A hex color - avoid light colors,
-	**hostedBy**: Name of the person / company responsible for this cloud app,
-	**join**: **"https://myurl.com/join.json"** The url to this current document,
-	**more**: **"https://myurl.com"** A link to your marketing website
- **privacy** : **"https://myurl.com/privacy"** A link to your privacy policy
- **collection** - Defines how this app will be collecting data from the user.
 -	**method**  automatic or manual
 -	**frequency**: **1d** - every 1 day. Options 5h (hours), 22m (22 minutes), 1mm (1 month),
 -	**url**: **https://api.nomie.io/apps/weather**,
 -	**amount**: **1d** how far back should data be pulled -
- **info** - object to define the additional information this cloud app needs from the user. For example: an email and password, a toggle switch (boolean) or a list of options (select).
 -	**units**  - the key for this input
	 -	**type** : **select** - options (boolean, text, password, select),
	 -	**value** : **fahrenheit**, - pre-filled value
	 -	**options** - Array of label,value pairs
	 		-	{ label: **Fahrenheit**, value: **fahrenheit**},
	 		-	{ label: **Celcius**, value: **celcius**},
	 -	**label** : **Unit of Measure** - Label/Name of the input
- **slots**: Slots hold trackers you want to capture
	- **temp**: Key for the specific tracker slot
		- **label**: "**Temperature Tracker**",
		- **summary**: "Describe what this field if needed"
		- **tracker**: null - leave null
		- **required**: true
		- **recommended** - Optional - recommend a tracker to install if the user doesn't alreay have one installed for this type of app.
			- **label** : **"Temp"** - recommended label
			- **config** : Tracker configuration
				- **type** : **(numeric|timer|range|tick)**,
				- **uom** : **celsius** [(see all Nomie UOMs)](https://github.com/happydata/nomie-uom)
			- **color** : '#4A90E2'
			- **icon** : **flaticon-thermometer21**

## Responding to Nomie

The response from your Cloud App needs to be a simple JSON response (examples below). There are a few different ways to responde to the user.

1. **HTML** Display a block of HTML to the user within Nomie.
2. **Notification** Display a small toast notification
3. **Link** Take to a specific web page.

### Showing HTML
```
{
   title : "My response page title",
   html: "<div class='text-bold'>Hello World</div>"
}
```

## Notification
```
{
   notify: "Hello World"
}
```

## Open URL
```
{
   link: "https://nomie.io"
}
```
