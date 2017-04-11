# Nomie API Tutorial

Nomie the app is, and will always be, free... The API, on the other hand, is not. The API is currently $9.99 a year. Sign up at https://connect.nomie.io

The Nomie API accepts a push command. This command is a loosely URI based string that contains an action followed by specific parameters to support that action.

Commands can be sent via a GET request or a POST request.

**GET Example**
```
https://api.nomie.io/v2/push/{apikey}/action=track/label=Peed
```
**POST Example**
A Post is better when working with create-note or start-note, since it's easier to transport Markdown and text via a POST param instead of a GET parameter. Use whichever you like.

```
curl -k  -L -X POST -H 'Content-Type: application/json' -d '{
    apikey : {apikey}',
    action : "track",
    label : "Peed"
}' 'https://api.nomie.io/v2/push'
```
## [See all Available Nomie API Commands here →](nomie-commands.md)

## Track Action
The track action allows you to virtually track any of your installed trackers. If you request a tracked event from a tracker that you do not have installed, it will simply be ignored and erased.
```
https://api.nomie.io/v2/push/{apikey}/action=track/label=Peed
https://api.nomie.io/v2/push/{apikey}/action=track/label=Ate%20Food
https://api.nomie.io/v2/push/{apikey}/action=track/label=Ate%20Food/geo=33.36,-117.08
https://api.nomie.io/v2/push/{apikey}/action=track/label=Temp/value=123
```
**Track Parameters**

- **label** -  Label of tracker you're targeting (URL encoded). e.g. ``label=Ate%20Dinner``
- **charge** - Positivity of this event. e.g. ``/charge=-2``
- **geo** - Geo location of the event. e.g. ``/geo=33.36,-117.08``
- **time** - Time from the epoch of the event. **Note** time is automatically recorded, use this only for putting things in the future or the past. e.g. ``/time=1482888391633``
- **value** - Value of the event (if supported by tracker). e.g. ``/value=34.54``

## Working with Notes

Notes can be created in two ways, with a POST request or a GET request. Note that if you're requesting to create a note with a GET request
the note must be encoded, otherwise it will fail.

### Create Note Action

**Create Note Parameters**

- **note** -  Body of your note. Markdown supported. e.g. ``/note=hi%20there``
- **charge** - Positivity of this event. e.g. ``/charge=-2``
- **geo** - Geo location of the event. e.g. ``/geo=33.36,-117.08``

## Example Ideas

### Track the Temperature with IFTTT

Have IFTTT post the temp each day to a "Temp" tracker that's Numeric and uses Averages for the calculation. You'll now be able to see how the temp, or whatever you track weather wise, affects you.

### Create a Single Tap widget with IFTTT (Android, iOS)

Create a new Applet with the trigger as "DO Button" and action service as "Maker". Use any API-URL as the URL. Now you can add a IFTTT widget to the home screen (or notification center on iOS), and select the new Applet!

### Send ticks from any Pebble smartwatch

Use the [HTTP app for pebble](https://apps.getpebble.com/en_US/application/567af43af66b129c7200002b?query=http&section=watchapps), and add API URLs, named after their tracker. Add the app to pebble favourites, and quickly make ticks, straight from the watch!

### Create a Widget with Workflow (iOS)

Create a new workflow and add a "Text" element. Fill this with any API URL, and then add the action "Get Contents of URL" below the "Text" element. For a simple "Tap" tracker, these two elements are the only requirements, but to do more calculations use variables inside the "Text" element.

### Create a Widget with Tasker (Android)
Coming soon

### Create an Amazon Alexa Skill
Setup instructions at [github.com/huberf/nomiealexa](https://github.com/huberf/nomiealexa).

## How it Works:

1. Your device registered an Anonyous ID, a Cloud App ID, and API Key and your Device ID (for push Notifications) `See below for how each are used`.
2. Your API Key is validated
3. If valid, your command string (/action=track/label=Peed) is added to a message queue waiting to be picked up.
4. Nomie on your device will periodically check for any new command
5. When new commands are found, they are validated, executed, and then removed from the message queue.

## Nomie Ids

- **Anonymous Id** - This is a unique string that is generated when you first start using Nomie. It is used to generate and validate the API Key and Cloud App Id.
- **API Key** - This is a unique key that is needed to send PUSH commands to the Nomie API.
- **Cloud App Id** - This unique ID is generated for each Cloud App you install and provides an ID for Cloud Apps to leverage, while not giving up your API key or Anonymous ID.

Reseting your identity within the app, resets all ID's - effectively making your a new User according to cloud apps and Nomie's anonymous services.
