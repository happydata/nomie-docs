# Nomie Cloud App Documentation 

Nomie Cloud Apps are external web services that can manually or automatically 
collect specific data from Nomie for processing off the device. Cloud Apps can also
leverage the Nomie API to automatically track, write notes and more. 

## Highlevel Cloud App Overview.

![](http://snap.icorbin.com/add-3rd-party-nomie-cloud-app.png)

### How a Cloud App is installed.

Cloud Apps can be installed from within Nomie's App browser, or by manually entering the URL to a Cloud Apps Join JSON document. 

Example JOIN json document 

```
var join = 
{
	**id**: **io.nomie.apps.weather**, // a Unique ID for your cloud app
	**name**: **Weather Tracker**, // Name of the cloud app
	**img**: **http://snap.icorbin.com/weather-tracking.svg**, // Keep it square
	**summary**: **Automatically Track the Temp**,
	**uses**: [**last-location**,**api**, **geo**], 
	**color**: **#4A90E2**,
	**hostedBy**: **Brandon Corbin**,
	**join**: **https://api.nomie.io/apps/weather**,
	**more**: **https://nomie.io**,
	**collection**: {
		**method**: **automatic**,
		**frequency**: **1d**,
		**url**: **https://api.nomie.io/apps/weather**,
		**amount**: **1d**
	},
	**leave**: **https://api.nomie.io/apps/weather/leave**,
	**info**: {
	   **units** : {
          **type** : **select**,
          **value** : **fahrenheit**,
          **options** : [
            { label: **Fahrenheit**, value: **fahrenheit**},
            { label: **Celcius**, value: **celcius**},
          ],
          label : **Unit of Measure**
        }
	},
	**slots**: {
		**temp**: {
			**label**: **Temperature Tracker**,
			**summary**: null,
			**tracker**: null,
			**required**: true,
			**recommended** : {
			    **label** : **Temp**,
			    **config** : {
			        **type** : **numeric**,
			        **uom** : **celsius**
			    },
			    **color** : '#4A90E2',
			    **icon** : **flaticon-thermometer21**
			}
		}
	}
};
```

- **id** - A unique identifier for your cloud app. Note, if you'd like to allow your cloud app to be installed multiple times, add a random string to the end of the id. For example: ``id : **io.nomie.weather.**+Math.random(),``
- **name** The name of your app, this is used throughout Nomie,
- **img** A full url to a square avatar no larger than 1000x1000 and no smaller than 500x500. Allowed types: SVG, PNG
- **summary** A summary about your cloud app. Markdown is supported 
-	 **uses** [**last-location**,**api**, **geo**] - an Array of items needed for your experiment. Available options are: ``last-location`` users last known location, ``api`` the users api key (if available), `geo` geo location data included with events 
-	**color** A hex color - avoid light colors,
-	**hostedBy**: Name of the person / company responsible for this cloud app,
-	**join**: The url to this current document,
-	**more**: A link to your marketing website
- **privacy** : A link to your privacy policy
- **collection** 
 -	**method**  automatic or manual
 -	**frequency**: **1d**,
 -	**url**: **https://api.nomie.io/apps/weather**,
 -	**amount**: **1d**
- **leave**: **https://api.nomie.io/apps/weather/leave**,
- **info**: {
 -	**units** : {
	 -	**type** : **select**,
	 -	**value** : **fahrenheit**,
	 -	**options** Array of label,value pairs
	 	-	{ label: **Fahrenheit**, value: **fahrenheit**},
	 	-	{ label: **Celcius**, value: **celcius**},
	 -	label : **Unit of Measure**
        }
	},
	**slots**: {
		**temp**: {
			**label**: **Temperature Tracker**,
			**summary**: null,
			**tracker**: null,
			**required**: true,
			**recommended** : {
			    **label** : **Temp**,
			    **config** : {
			        **type** : **numeric**,
			        **uom** : **celsius**
			    },
			    **color** : '#4A90E2',
			    **icon** : **flaticon-thermometer21**

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
