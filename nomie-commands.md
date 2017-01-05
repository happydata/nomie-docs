# Nomie Commands

Nomie Commands are, well, commands you can give Nomie to execute. For example, a command exists to create a tracker, and to track an event. These commands are represented as a URI like resource. For example ``action=track/label=pee``.

Every command starts off with an action, these actions are followed by parameters said action might need. 

# Available Actions

## Track

Track an existing tracker. 

- ``action=track/label=Drank%20Water``
- ``action=track/label=Weight/value=123``

**Params**

- **label** - REQUIRED - label of the tracker to use
- **geo** - optional - location of the event. ``action=track/label=Peed/geo=-14.43,43.43``
- **time** - optional - time the event took place. ``action=track/label=Peed/time=1483577384644``
- **value** - optional - value of an event. ``action=track/label=Temp/value=23.43``

## Create Tracker

Creates a New Tracker! 

- ``action=create-tracker/label=Ate%20Apple/icon=foodIcon-apple/charge=2``

**Params**

- **label** - REQUIRED - label of the tracker to create
- **charge** - optional - Positivity of event (-2,-1,0,1,2)
- **uom** - optional - A specific unit of measurement [see Nomie UOM for available options](https://github.com/happydata/nomie-uom/blob/master/nomie-uom.js)
- **math** - optional - **sum** or **mean** - defaults to sum
- **type** - optional - **tick**, **numeric**, **range**, **timer**  - defaults to tick (single tap)
- **notePrompt** - optional - true / false - defaults to false
- **interactive** - optional - true / false - defaults to false - if the user should be taken to the Tracker Editor screen after creating this tracker.

